import { Router } from 'express';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const NVV_PATH       = join(__dirname, '../data/nvv.json');
const NVV_SAVED_PATH = join(__dirname, '../data/nvv-saved.json');

let allNvv   = JSON.parse(readFileSync(NVV_PATH,       'utf-8'));
let savedNvv = JSON.parse(readFileSync(NVV_SAVED_PATH, 'utf-8'));

function pool() { return [...allNvv, ...savedNvv]; }

const router = Router();

router.get('/', (req, res) => {
  const { category, search } = req.query;
  let result = pool();
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
  const pageSize = 16;
  let p = pool();
  if (category) p = p.filter((e) => e.category === category);

  const sorted = [...p].sort((a, b) => a.phrase.localeCompare(b.phrase));
  const start  = (Number(page) - 1) * (pageSize / 2);
  const batch  = sorted.slice(start, start + pageSize / 2);

  const type1    = batch.map((e) => buildType1(e, p));
  const type2    = batch.map((e) => buildType2(e, p));
  const exercises = shuffle([...type1, ...type2]);

  res.json({
    success: true,
    data:    exercises,
    total:   sorted.length,
    page:    Number(page),
    pages:   Math.ceil(sorted.length / (pageSize / 2)),
  });
});

router.post('/', (req, res) => {
  const entry = req.body;
  if (!entry || !entry.phrase) {
    return res.status(400).json({ success: false, message: 'phrase gerekli' });
  }

  const p      = pool();
  const exists = p.some((e) => e.phrase.toLowerCase() === entry.phrase.toLowerCase());
  if (exists) {
    return res.status(409).json({ success: false, message: 'Zaten listende var' });
  }

  const maxId    = p.reduce((m, e) => Math.max(m, e.id || 0), 0);
  const newEntry = { ...entry, id: maxId + 1, saved: true };
  savedNvv.push(newEntry);
  writeFileSync(NVV_SAVED_PATH, JSON.stringify(savedNvv, null, 2), 'utf-8');

  res.status(201).json({ success: true, data: newEntry });
});

function buildType1(entry, p) {
  const correct     = entry.phrase;
  const distractors = shuffle(p.filter((e) => e.phrase !== correct))
    .slice(0, 3)
    .map((e) => e.phrase);
  return {
    id:         `${entry.id}-t1`,
    type:       'tr_to_de',
    question:   entry.meaning_tr,
    hint:       `= ${entry.equivalent_verb}`,
    options:    shuffle([correct, ...distractors]),
    answer:     correct,
    example_tr: entry.example_tr,
    category:   entry.category,
  };
}

function buildType2(entry, p) {
  const correct  = entry.verb;
  const question = entry.phrase.replace(new RegExp(`\\b${entry.verb}\\b`), '___');
  const distractors = shuffle(p.filter((e) => e.verb !== correct))
    .map((e) => e.verb)
    .filter((v, i, arr) => arr.indexOf(v) === i)
    .slice(0, 3);
  return {
    id:         `${entry.id}-t2`,
    type:       'verb_completion',
    question,
    hint:       entry.meaning_tr,
    options:    shuffle([correct, ...distractors]),
    answer:     correct,
    example_tr: entry.example_tr,
    category:   entry.category,
  };
}

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default router;
