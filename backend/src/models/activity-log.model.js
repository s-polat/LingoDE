import mongoose from 'mongoose';

const activityLogSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  date: { type: String, required: true }, // "YYYY-MM-DD"
  reviewed: { type: Number, default: 0 },
  correct: { type: Number, default: 0 },
});

activityLogSchema.index({ userId: 1, date: 1 }, { unique: true });

export default mongoose.model('ActivityLog', activityLogSchema);
