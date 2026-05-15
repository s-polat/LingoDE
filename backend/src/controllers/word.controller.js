import Word from '../models/word.model.js';
import { calculateSM2 } from '../services/sm2.service.js';

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

  res.json({ success: true, data: word });
}

export async function getStats(req, res) {
  const [total, byLevel, dueToday] = await Promise.all([
    Word.countDocuments(),
    Word.aggregate([{ $group: { _id: '$level', count: { $sum: 1 } } }]),
    Word.countDocuments({ sm2_next_review: { $lte: new Date() } }),
  ]);

  res.json({ success: true, data: { total, byLevel, dueToday } });
}
