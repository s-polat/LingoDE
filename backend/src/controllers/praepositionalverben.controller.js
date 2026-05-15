import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const allVerbs = JSON.parse(
  readFileSync(join(__dirname, '../data/praepositionalverben.json'), 'utf-8')
);

export function getAll(req, res) {
  const { level, search } = req.query;
  let result = allVerbs;
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
  const verb = req.params.verb.toLowerCase();
  const matches = allVerbs.filter((v) => v.verb.toLowerCase() === verb);
  res.json({ success: true, data: matches });
}

export function getExercises(req, res) {
  const { level, page = 1 } = req.query;
  const pageSize = 20;
  let pool = allVerbs;
  if (level) pool = pool.filter((v) => v.level === level);

  // shuffle deterministically enough for pagination
  const shuffled = [...pool].sort((a, b) => (a.verb + a.preposition).localeCompare(b.verb + b.preposition));
  const start = (page - 1) * pageSize;
  const batch = shuffled.slice(start, start + pageSize);

  const exercises = batch.map((v) => ({
    id: `${v.verb}-${v.preposition}`,
    verb: v.verb,
    sentence_with_gap: buildGap(v),
    options: buildOptions(v, pool),
    answer: v.preposition,
    meaning_tr: v.meaning_tr,
    example_tr: v.example_tr,
    case: v.case,
    level: v.level,
  }));

  res.json({
    success: true,
    data: exercises,
    total: shuffled.length,
    page: Number(page),
    pages: Math.ceil(shuffled.length / pageSize),
  });
}

// Almanın'da edatlar çoğu zaman belirli artikelle birleşik yazılır (zum, zur, am, beim, vom, …)
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
  const prep = entry.preposition.toLowerCase();

  // Önce edatın kendisini ara
  const directRegex = new RegExp(`(?<![\\w])${prep}(?![\\w])`, 'i');
  if (directRegex.test(sentence)) {
    return sentence.replace(directRegex, '___');
  }

  // Bulunamazsa birleşik formları dene (zum, zur, am, …)
  for (const contraction of (CONTRACTIONS[prep] || [])) {
    const cRegex = new RegExp(`(?<![\\w])${contraction}(?![\\w])`, 'i');
    if (cRegex.test(sentence)) {
      return sentence.replace(cRegex, '___');
    }
  }

  // Yedek: cümle olduğu gibi döner (JSON'da hata varsa)
  return sentence;
}

function buildOptions(entry, pool) {
  const correct = entry.preposition;
  const distractors = [...new Set(pool.map((v) => v.preposition))]
    .filter((p) => p !== correct)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);
  return shuffle([correct, ...distractors]);
}

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}
