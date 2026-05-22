import ExerciseSession from '../models/session.model.js';

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

export async function createSession(req, res) {
  const { type, subtype, score, rawScore, maxScore, note } = req.body;
  const session = await ExerciseSession.create({
    userId: req.user.uid,
    type,
    subtype,
    score,
    rawScore,
    maxScore,
    note,
    date: todayStr(),
  });
  res.status(201).json({ success: true, data: session });
}

export async function getSessionStats(req, res) {
  const [recent, byType] = await Promise.all([
    ExerciseSession.find({ userId: req.user.uid }).sort({ createdAt: -1 }).limit(20),
    ExerciseSession.aggregate([
      { $match: { userId: req.user.uid } },
      {
        $group: {
          _id: { type: '$type', subtype: '$subtype' },
          avgScore: { $avg: '$score' },
          count: { $sum: 1 },
          lastScore: { $last: '$score' },
          lastNote: { $last: '$note' },
        },
      },
      { $sort: { '_id.type': 1, '_id.subtype': 1 } },
    ]),
  ]);

  res.json({ success: true, data: { recent, byType } });
}
