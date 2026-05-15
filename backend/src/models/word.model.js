import mongoose from 'mongoose';

const meaningSchema = new mongoose.Schema({
  turkish: { type: String, required: true },
  example_de: String,
  example_tr: String,
});

const conjugationSchema = new mongoose.Schema({
  präsens: { ich: String, du: String, er: String, wir: String, ihr: String, sie: String },
  präteritum: { ich: String, du: String, er: String, wir: String, ihr: String, sie: String },
  perfekt: String,
  konjunktiv2: String,
  imperativ: { du: String, ihr: String, sie: String },
});

const wordSchema = new mongoose.Schema(
  {
    german: { type: String, required: true, trim: true },
    article: { type: String, enum: ['der', 'die', 'das', null] },
    plural: String,
    type: {
      type: String,
      enum: ['noun', 'verb', 'adjective', 'adverb', 'preposition', 'conjunction', 'other'],
      required: true,
    },
    level: { type: String, enum: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'], required: true },
    meanings: [meaningSchema],
    conjugation: conjugationSchema,
    praepositionen: [
      {
        preposition: String,
        case: { type: String, enum: ['Akkusativ', 'Dativ'] },
        meaning_tr: String,
        example_de: String,
        example_tr: String,
      },
    ],
    tags: [String],
    // SM-2 spaced repetition
    sm2_repetitions: { type: Number, default: 0 },
    sm2_interval: { type: Number, default: 1 },
    sm2_easiness: { type: Number, default: 2.5 },
    sm2_next_review: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

wordSchema.index({ german: 1 });
wordSchema.index({ level: 1 });
wordSchema.index({ sm2_next_review: 1 });

export default mongoose.model('Word', wordSchema);
