import Anthropic from '@anthropic-ai/sdk';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const _staticPreps = JSON.parse(
  readFileSync(join(__dirname, '../data/praepositionalverben.json'), 'utf-8')
);

function lookupStaticPreps(verb) {
  const lower = verb.toLowerCase();
  const matches = _staticPreps.filter((e) => e.verb.toLowerCase() === lower);
  if (!matches.length) return null;
  return matches.map(({ preposition, case: c, meaning_tr, example_de, example_tr }) => ({
    preposition, case: c, meaning_tr, example_de, example_tr,
  }));
}

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `Sen bir Almanca dil uzmanısın. Verilen Almanca kelimeleri analiz edip JSON formatında yanıt veriyorsun.
Yanıtın her zaman geçerli bir JSON objesi olmalı. Markdown code block (\`\`\`json) kullanma, sadece düz JSON yaz.

ÖNEMLİ KURALLAR:
1. Gelen kelime çekimli bir fiil ise (läuft, ging, gemacht, arbeitete, ist vb.) onu infinitive çevir (laufen, gehen, machen, arbeiten, sein) ve infinitive formunu kaydet.
2. Gelen kelime çekimli bir isim ise (des Hauses, dem Kind, den Kindern vb.) temel nominatif formunu kaydet.
3. "german" alanına HER ZAMAN temel/infinitif formu yaz, çekimli formu değil.
4. Fiil çekimlerinde tüm kişiler için değerleri mutlaka doldur, boş bırakma.`;

function parseJson(text) {
  const cleaned = text.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '');
  return JSON.parse(cleaned);
}

export async function analyzeWord(germanWord) {
  const prompt = `Şu Almanca kelimeyi analiz et: "${germanWord}"

JSON formatında şunları ver:
{
  "german": "kelime",
  "article": "der/die/das veya null (fiil/sıfat/zarf ise)",
  "plural": "çoğul form veya null",
  "type": "noun|verb|adjective|adverb|preposition|conjunction|other",
  "level": "A1|A2|B1|B2|C1|C2",
  "meanings": [
    {
      "turkish": "Türkçe anlam 1",
      "example_de": "Almanca örnek cümle 1",
      "example_tr": "Türkçe çeviri 1"
    },
    {
      "turkish": "Türkçe anlam 2 (varsa)",
      "example_de": "Almanca örnek cümle 2",
      "example_tr": "Türkçe çeviri 2"
    }
  ],
  "conjugation": ${buildConjugationNote()}
}`;

  const response = await client.messages.create({
    model: 'claude-opus-4-5',
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: prompt }],
  });

  const result = parseJson(response.content[0].text);
  if (result.type === 'verb') {
    result.praepositionen = lookupStaticPreps(result.german) ?? result.praepositionen ?? null;
  }
  return result;
}

export async function extractWordsFromText(text) {
  const response = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 2048,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: 'user',
        content: `Bu metinden Almanca kelimeleri çıkar (tekrar edenleri bir kez yaz, yalnızca kelime kökleri):
"${text.slice(0, 3000)}"

JSON formatında yanıt ver: {"words": ["kelime1", "kelime2", ...]}`,
      },
    ],
  });

  const parsed = parseJson(response.content[0].text);
  return parsed.words;
}

export async function analyzeWordsBatch(words) {
  const prompt = `Şu Almanca kelimelerin her birini analiz et: ${JSON.stringify(words)}

Her kelime için JSON array döndür. Her eleman şu yapıda olmalı:
{
  "german": "kelime",
  "article": "der/die/das veya null",
  "plural": "çoğul veya null",
  "type": "noun|verb|adjective|adverb|preposition|conjunction|other",
  "level": "A1|A2|B1|B2|C1|C2",
  "meanings": [
    {"turkish": "Türkçe anlam", "example_de": "Almanca cümle", "example_tr": "Türkçe çeviri"}
  ],
  "conjugation": ${buildConjugationNote()}
}

Yanıt: [ {...}, {...}, ... ]`;

  const response = await client.messages.create({
    model: 'claude-opus-4-5',
    max_tokens: 4096,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: prompt }],
  });

  const results = parseJson(response.content[0].text);
  return results.map((r) => {
    if (r.type === 'verb') {
      r.praepositionen = lookupStaticPreps(r.german) ?? r.praepositionen ?? null;
    }
    return r;
  });
}

export async function generateWritingPrompt(type) {
  const topics = [
    'Arbeit und Beruf', 'Gesellschaft und Politik', 'Umwelt und Natur',
    'Wissenschaft und Technik', 'Bildung und Erziehung', 'Gesundheit',
    'Kultur und Medien', 'Wirtschaft und Konsum', 'Digitalisierung', 'Migration und Integration',
  ];
  const topic = topics[Math.floor(Math.random() * topics.length)];

  const typeInstruction = type === 'brief'
    ? `Erstelle eine telc C1 Allgemein Schreibaufgabe: formeller Brief oder E-Mail.
Format:
- 2-3 Sätze Situationsbeschreibung (auf Deutsch)
- "Schreiben Sie einen formellen Brief / eine E-Mail an [Empfänger]."
- 3–4 Aufgabenpunkte als Stichpunkte (was soll der Schreiber tun: sich vorstellen, Kritik äußern, Informationen erfragen, Vorschlag machen, etc.)
- Am Ende: "Schreiben Sie 200–250 Wörter."
Themenbereich: ${topic}`
    : `Erstelle eine telc C1 Allgemein Schreibaufgabe: Erörterung / argumentativer Text.
Format:
- 1 provokante These oder ein kurzes Zitat (2-3 Sätze) zum Thema
- "Nehmen Sie in einem zusammenhängenden Text Stellung."
- 3 Leitfragen oder Aspekte als Stichpunkte (Pro/Kontra, eigene Meinung, Zukunftsperspektive etc.)
- Am Ende: "Schreiben Sie 200–250 Wörter."
Themenbereich: ${topic}`;

  const response = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 512,
    messages: [{
      role: 'user',
      content: `${typeInstruction}

Antworte NUR mit dem Aufgabentext auf Deutsch. Kein JSON, kein Markdown, kein Kommentar.`,
    }],
  });

  return { prompt: response.content[0].text.trim(), topic };
}

export async function analyzeWriting(type, prompt, text) {
  const typeLabel = type === 'brief' ? 'formeller Brief' : 'Erörterung/Essay';
  const response = await client.messages.create({
    model: 'claude-opus-4-5',
    max_tokens: 2048,
    messages: [{
      role: 'user',
      content: `Du bist ein Deutschlehrer und bewertest die folgende C1-Schreibaufgabe.

Aufgabentyp: ${typeLabel}
Aufgabenstellung: "${prompt}"

Schülertext:
"""
${text}
"""

Bewerte den Text nach diesen 4 Kategorien (je 0-25 Punkte) und gib konkretes Feedback auf Türkisch.
Antworte NUR mit diesem JSON-Format (kein Markdown):
{
  "gesamtnote": "B2" | "C1" | "C2" (oder darunter falls nötig),
  "gesamtpunkte": <Zahl 0-100>,
  "kategorien": {
    "grammatik": { "punkte": <0-25>, "feedback": "..." },
    "wortschatz": { "punkte": <0-25>, "feedback": "..." },
    "kohaerenz": { "punkte": <0-25>, "feedback": "..." },
    "register": { "punkte": <0-25>, "feedback": "..." }
  },
  "korrekturen": [
    { "original": "...", "korrektur": "...", "erklaerung": "..." }
  ],
  "staerken": ["...", "..."],
  "verbesserungen": ["...", "..."]
}
Maximal 4 Korrekturen, 2 Stärken, 3 Verbesserungsvorschläge.`,
    }],
  });

  return parseJson(response.content[0].text);
}

export async function extractWordsFromImage(base64Image, mediaType = 'image/jpeg') {
  const response = await client.messages.create({
    model: 'claude-opus-4-5',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'image',
            source: { type: 'base64', media_type: mediaType, data: base64Image },
          },
          {
            type: 'text',
            text: 'Bu görseldeki Almanca kelimeleri listele. Sadece kelime köklerini ver, tekrar edenleri bir kez yaz. JSON formatında yanıt ver: {"words": ["kelime1", "kelime2", ...]}',
          },
        ],
      },
    ],
  });

  return parseJson(response.content[0].text);
}

function buildConjugationNote() {
  return `eğer type "verb" ise (tüm alanları doldur, boş bırakma):
{
  "präsens": {"ich": "laufe", "du": "läufst", "er": "läuft", "wir": "laufen", "ihr": "lauft", "sie": "laufen"},
  "präteritum": {"ich": "lief", "du": "liefst", "er": "lief", "wir": "liefen", "ihr": "lieft", "sie": "liefen"},
  "perfekt": "ich bin gelaufen",
  "konjunktiv2": "ich liefe",
  "imperativ": {"du": "lauf", "ihr": "lauft", "sie": "laufen Sie"}
}
type "verb" DEĞİLSE: null`;
}
