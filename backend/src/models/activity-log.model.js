import mongoose from 'mongoose';

const activityLogSchema = new mongoose.Schema({
  date: { type: String, required: true, unique: true }, // "YYYY-MM-DD"
  reviewed: { type: Number, default: 0 },
  correct: { type: Number, default: 0 },
});

export default mongoose.model('ActivityLog', activityLogSchema);
