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
  const pageSize = 16; // 8 pairs: 8× type1 + 8× type2, interleaved
  let pool = allNvv;
  if (category) pool = pool.filter((e) => e.category === category);

  const sorted = [...pool].sort((a, b) => a.phrase.localeCompare(b.phrase));
  const start = (Number(page) - 1) * (pageSize / 2);
  const batch = sorted.slice(start, start + pageSize / 2);

  // Her entry için 1× tip1 + 1× tip2 üret, sonra karıştır
  const type1 = batch.map((e) => buildType1(e, pool));
  const type2 = batch.map((e) => buildType2(e, pool));
  const exercises = shuffle([...type1, ...type2]);

  res.json({
    success: true,
    data: exercises,
    total: sorted.length,
    page: Number(page),
    pages: Math.ceil(sorted.length / (pageSize / 2)),
  });
});

// Tip 1: Türkçe anlam → doğru NVV ifadesini seç
function buildType1(entry, pool) {
  const correct = entry.phrase;
  const distractors = shuffle(pool.filter((e) => e.phrase !== correct))
    .slice(0, 3)
    .map((e) => e.phrase);
  return {
    id: `${entry.id}-t1`,
    type: 'tr_to_de',
    question: entry.meaning_tr,
    hint: `= ${entry.equivalent_verb}`,
    options: shuffle([correct, ...distractors]),
    answer: correct,
    example_tr: entry.example_tr,
    category: entry.category,
  };
}

// Tip 2: "eine Entscheidung ___" → doğru fiili seç
function buildType2(entry, pool) {
  const correct = entry.verb;
  const distractors = shuffle(pool.filter((e) => e.verb !== correct))
    .map((e) => e.verb)
    .filter((v, i, arr) => arr.indexOf(v) === i)
    .slice(0, 3);
  const stem = entry.article ? `${entry.article} ${entry.noun}` : entry.noun;
  return {
    id: `${entry.id}-t2`,
    type: 'verb_completion',
    question: `${stem} ___`,
    hint: entry.meaning_tr,
    options: shuffle([correct, ...distractors]),
    answer: correct,
    example_tr: entry.example_tr,
    category: entry.category,
  };
}

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default router;
