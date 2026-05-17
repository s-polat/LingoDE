import Word from '../models/word.model.js';
import ActivityLog from '../models/activity-log.model.js';
import { calculateSM2 } from '../services/sm2.service.js';

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

export async function getWords(req, res) {
  const { level, type, search, page = 1, limit = 20 } = req.query;
  const filter = {};
  if (level) filter.level = level;
  if (type) filter.type = type;
  if (search) filter.german = { $regex: search, $options: 'i' };

  const [data, total] = await Promise.all([
    Word.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit)),
    Word.countDocuments(filter),
  ]);

  res.json({ success: true, data, total, page: Number(page), limit: Number(limit) });
}

export async function getWord(req, res) {
  const word = await Word.findById(req.params.id);
  if (!word) return res.status(404).json({ success: false, message: 'Kelime bulunamadı' });
  res.json({ success: true, data: word });
}

export async function createWord(req, res) {
  const word = await Word.create(req.body);
  res.status(201).json({ success: true, data: word });
}

export async function updateWord(req, res) {
  const word = await Word.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!word) return res.status(404).json({ success: false, message: 'Kelime bulunamadı' });
  res.json({ success: true, data: word });
}

export async function deleteWord(req, res) {
  await Word.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: 'Kelime silindi' });
}

export async function getReviewWords(req, res) {
  const { level, limit = 10 } = req.query;
  const filter = { sm2_next_review: { $lte: new Date() } };
  if (level) filter.level = level;

  const words = await Word.find(filter).limit(Number(limit));
  res.json({ success: true, data: words });
}

export async function reviewWord(req, res) {
  const { quality } = req.body; // 0-5
  const word = await Word.findById(req.params.id);
  if (!word) return res.status(404).json({ success: false, message: 'Kelime bulunamadı' });

  const updated = calculateSM2(word, quality);
  Object.assign(word, updated);
  await word.save();

  const inc = { $inc: { reviewed: 1, ...(quality >= 3 ? { correct: 1 } : {}) } };
  await ActivityLog.findOneAndUpdate({ date: todayStr() }, inc, { upsert: true });

  res.json({ success: true, data: word });
}

export async function getActivity(req, res) {
  const days = 30;
  const logs = await ActivityLog.find().sort({ date: -1 }).limit(days);
  const map = Object.fromEntries(logs.map((l) => [l.date, { reviewed: l.reviewed, correct: l.correct }]));

  const result = [];
  for (let i = 0; i < days; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    result.push({ date: key, ...(map[key] ?? { reviewed: 0, correct: 0 }) });
  }

  // streak: bugünden geriye kaç ardışık gün çalışılmış
  let streak = 0;
  for (const entry of result) {
    if (entry.reviewed > 0) streak++;
    else break;
  }

  res.json({ success: true, data: { activity: result.reverse(), streak } });
}

export async function getStats(req, res) {
  const [total, byLevel, dueToday] = await Promise.all([
    Word.countDocuments(),
    Word.aggregate([{ $group: { _id: '$level', count: { $sum: 1 } } }]),
    Word.countDocuments({ sm2_next_review: { $lte: new Date() } }),
  ]);

  res.json({ success: true, data: { total, byLevel, dueToday } });
}
