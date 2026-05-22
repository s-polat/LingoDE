import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    type: {
      type: String,
      enum: ['schreibtrainer', 'muendlich', 'hochschul', 'tagesschreiben', 'leseverstehen', 'grammar'],
      required: true,
    },
    subtype: String,
    score: { type: Number, required: true }, // 0–100 percentage
    rawScore: Number,
    maxScore: Number,
    note: String,
    date: { type: String, required: true }, // YYYY-MM-DD
  },
  { timestamps: true }
);

sessionSchema.index({ userId: 1, createdAt: -1 });
sessionSchema.index({ userId: 1, type: 1 });

export default mongoose.model('ExerciseSession', sessionSchema);
