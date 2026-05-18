import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname  = dirname(fileURLToPath(import.meta.url));
const PV_PATH       = join(__dirname, '../data/praepositionalverben.json');
const PV_SAVED_PATH = join(__dirname, '../data/pv-saved.json');

let allVerbs   = JSON.parse(readFileSync(PV_PATH,       'utf-8'));
let savedVerbs = JSON.parse(readFileSync(PV_SAVED_PATH, 'utf-8'));

function pool() { return [...allVerbs, ...savedVerbs]; }

export function getAll(req, res) {
  const { level, search } = req.query;
  let result = pool();
  if (level) result = result.filter((v) => v.level === level);
  if (search) {
    const q = search.toLowerCase();
    result = result.filter(
      (v) => v.verb.toLowerCase().includes(q) || v.preposition.includes(q)
    );
  }
  res.json({ success: true, data: result });
}

export function lookupVerb(req, res) {
  const verb    = req.params.verb.toLowerCase();
  const matches = pool().filter((v) => v.verb.toLowerCase() === verb);
  res.json({ success: true, data: matches });
}

export function getExercises(req, res) {
  const { level, page = 1 } = req.query;
  const pageSize = 20;
  let p = pool();
  if (level) p = p.filter((v) => v.level === level);

  const shuffled = [...p].sort((a, b) => (a.verb + a.preposition).localeCompare(b.verb + b.preposition));
  const start    = (page - 1) * pageSize;
  const batch    = shuffled.slice(start, start + pageSize);

  const exercises = batch.map((v) => ({
    id:               `${v.verb}-${v.preposition}`,
    verb:             v.verb,
    sentence_with_gap: buildGap(v),
    options:          buildOptions(v, p),
    answer:           v.preposition,
    meaning_tr:       v.meaning_tr,
    example_tr:       v.example_tr,
    case:             v.case,
    level:            v.level,
  }));

  res.json({
    success: true,
    data:    exercises,
    total:   shuffled.length,
    page:    Number(page),
    pages:   Math.ceil(shuffled.length / pageSize),
  });
}

export function addVerb(req, res) {
  const entry = req.body;
  if (!entry || !entry.verb || !entry.preposition) {
    return res.status(400).json({ success: false, message: 'verb ve preposition gerekli' });
  }

  const p      = pool();
  const exists = p.some(
    (v) =>
      v.verb.toLowerCase()        === entry.verb.toLowerCase() &&
      v.preposition.toLowerCase() === entry.preposition.toLowerCase()
  );
  if (exists) {
    return res.status(409).json({ success: false, message: 'Zaten listende var' });
  }

  const newEntry = { ...entry, saved: true };
  savedVerbs.push(newEntry);
  writeFileSync(PV_SAVED_PATH, JSON.stringify(savedVerbs, null, 2), 'utf-8');

  res.status(201).json({ success: true, data: newEntry });
}

const CONTRACTIONS = {
  zu:    ['zum', 'zur'],
  an:    ['am', 'ans'],
  in:    ['im', 'ins'],
  bei:   ['beim'],
  von:   ['vom'],
  durch: ['durchs'],
  für:   ['fürs'],
  um:    ['ums'],
  auf:   ['aufs'],
  über:  ['übers'],
  unter: ['unters'],
  vor:   ['vors'],
  hinter:['hinters'],
};

function buildGap(entry) {
  const sentence = entry.example_de;
  const prep     = entry.preposition.toLowerCase();

  const directRegex = new RegExp(`(?<![\\w])${prep}(?![\\w])`, 'i');
  if (directRegex.test(sentence)) {
    return sentence.replace(directRegex, '___');
  }

  for (const contraction of (CONTRACTIONS[prep] || [])) {
    const cRegex = new RegExp(`(?<![\\w])${contraction}(?![\\w])`, 'i');
    if (cRegex.test(sentence)) {
      return sentence.replace(cRegex, '___');
    }
  }

  return sentence;
}

function buildOptions(entry, p) {
  const correct     = entry.preposition;
  const distractors = [...new Set(p.map((v) => v.preposition))]
    .filter((pr) => pr !== correct)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);
  return shuffle([correct, ...distractors]);
}

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}
