import { Router } from 'express';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const allNvv = JSON.parse(readFileSync(join(__dirname, '../data/nvv.json'), 'utf-8'));

const router = Router();

router.get('/', (req, res) => {
  const { category, search } = req.query;
  let result = allNvv;
  if (category) result = result.filter((e) => e.category === category);
  if (search) {
    const q = search.toLowerCase();
    result = result.filter(
      (e) =>
        e.phrase.toLowerCase().includes(q) ||
        e.meaning_tr.toLowerCase().includes(q) ||
        e.equivalent_verb.toLowerCase().includes(q)
    );
  }
  res.json({ success: true, data: result });
});

router.get('/exercises', (req, res) => {
  const { category, page = 1 } = req.query;
  const pageSize = 15;
  let pool = allNvv;
  if (category) pool = pool.filter((e) => e.category === category);

  const shuffled = [...pool].sort((a, b) => a.phrase.localeCompare(b.phrase));
  const start = (Number(page) - 1) * pageSize;
  const batch = shuffled.slice(start, start + pageSize);

  const exercises = batch.map((e) => ({
    id: e.id,
    phrase: e.phrase,
    sentence_with_gap: buildGap(e),
    options: buildOptions(e, pool),
    answer: e.noun,
    hint: e.equivalent_verb,
    meaning_tr: e.meaning_tr,
    example_tr: e.example_tr,
    category: e.category,
  }));

  res.json({
    success: true,
    data: exercises,
    total: shuffled.length,
    page: Number(page),
    pages: Math.ceil(shuffled.length / pageSize),
  });
});

function buildGap(entry) {
  const regex = new RegExp(`\\b${entry.noun}\\b`, 'i');
  return entry.example_de.replace(regex, '___');
}

function buildOptions(entry, pool) {
  const correct = entry.noun;
  const sameCategory = pool.filter((e) => e.noun !== correct);
  const distractors = shuffle(sameCategory)
    .map((e) => e.noun)
    .filter((n, i, arr) => arr.indexOf(n) === i)
    .slice(0, 3);
  return shuffle([correct, ...distractors]);
}

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default router;
