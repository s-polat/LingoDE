import { Router } from 'express';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataPath = join(__dirname, '../data/grammar.json');

let grammarData = null;

function loadGrammar() {
  if (!grammarData) {
    grammarData = JSON.parse(readFileSync(dataPath, 'utf-8'));
  }
  return grammarData;
}

const router = Router();

router.get('/', (_, res) => {
  const data = loadGrammar();
  res.json({ success: true, data });
});

router.get('/:level', (req, res) => {
  const data = loadGrammar();
  const level = req.params.level.toUpperCase();
  const lessons = data.filter((l) => l.level === level);
  res.json({ success: true, data: lessons });
});

router.get('/:level/:id', (req, res) => {
  const data = loadGrammar();
  const level = req.params.level.toUpperCase();
  const lesson = data.find((l) => l.level === level && l.id === req.params.id);
  if (!lesson) return res.status(404).json({ success: false, message: 'Ders bulunamadı' });
  res.json({ success: true, data: lesson });
});

export default router;
