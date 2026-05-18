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

const LESE_TOPICS = {
  allgemein: [
    'Arbeit und Digitalisierung', 'Kunst und Kultur in der Gesellschaft',
    'Medien und Meinungsbildung', 'Bildung und soziale Gerechtigkeit',
    'Umweltbewusstsein und Konsum', 'Gesundheit im Alltag',
    'Migration und gesellschaftlicher Wandel', 'Technologie und Privatsphäre',
  ],
  testdaf: [
    'Klimawandel und gesellschaftliche Verantwortung', 'Wissenschaft und Forschungsethik',
    'Digitalisierung in der Arbeitswelt', 'Demographischer Wandel in Europa',
    'Nachhaltigkeit und Wirtschaft', 'Bildungssystem im Wandel',
    'Migration und Integration', 'Gesundheitsversorgung der Zukunft',
  ],
  dsh: [
    'Globalisierung und kulturelle Identität', 'Umweltpolitik und internationale Abkommen',
    'Digitalisierung und sozialer Wandel', 'Wissenschaftsethik und KI',
    'Bildungsgerechtigkeit', 'Urbanisierung und Stadtentwicklung',
    'Sprachenpolitik in mehrsprachigen Gesellschaften', 'Nachhaltige Entwicklung',
  ],
};

export async function generateLeseverstehen(examType) {
  const topicKey = (examType === 'goethe' || examType === 'telc') ? 'allgemein' : examType;
  const topicPool = LESE_TOPICS[topicKey] ?? LESE_TOPICS.allgemein;
  const topic = topicPool[Math.floor(Math.random() * topicPool.length)];

  // Goethe C1: Aufgabe 3 Stil — Wortschatz im Kontext (4-Option MC) + R/F/NiT
  if (examType === 'goethe') {
    const response = await client.messages.create({
      model: 'claude-opus-4-5',
      max_tokens: 3500,
      messages: [{
        role: 'user',
        content: `Erstelle eine Goethe-Zertifikat C1 Allgemein Leseverstehen-Übung (Aufgabe 3 Stil).

Thema: ${topic}
Textstil: Journalistisch/feuilletonistisch (Zeitungsartikel oder Magazinbeitrag)
Textlänge: 420–480 Wörter

Fragenformat (10 Fragen):
- 6 Wortschatz-im-Kontext-Fragen (Typ "mc", je 4 Optionen A/B/C/D):
  Zitiere einen Satz aus dem Text mit einem [_____] für das fehlende Wort als "frage"-Feld.
  Die 4 Optionen sind einzelne Wörter oder kurze Ausdrücke.
  Teste: Kollokationen, Synonyme, Register, Wortbedeutung im Kontext.
- 4 Richtig/Falsch/Nicht-im-Text-Aussagen (Typ "rfn")

Regeln:
- Text C1-Niveau, authentisch
- Erklärungen auf Türkisch
- Fragen in Textreihenfolge

Antworte NUR mit diesem JSON (kein Markdown):
{
  "examType": "goethe",
  "topic": "${topic}",
  "text": "...",
  "fragen": [
    { "nr": 1, "type": "mc", "frage": "Im Text heißt es: '...das [_____] der Bevölkerung...' Welches Wort passt?", "optionen": ["A) ...", "B) ...", "C) ...", "D) ..."], "antwort": "A", "erklaerung": "..." },
    { "nr": 2, "type": "rfn", "aussage": "...", "antwort": "richtig", "erklaerung": "..." }
  ]
}`,
      }],
    });
    return parseJson(response.content[0].text);
  }

  // telc C1: Aufgabe 1 (Satz-Einfügen) + Aufgabe 3 (R/F/NiT)
  if (examType === 'telc') {
    const response = await client.messages.create({
      model: 'claude-opus-4-5',
      max_tokens: 4000,
      messages: [{
        role: 'user',
        content: `Erstelle eine telc Deutsch C1 Leseverstehen-Übung (Aufgabe 1 + 3 Stil).

Thema: ${topic}
Textstil: Journalistisch/essayistisch, strukturiert mit mehreren Abschnitten
Textlänge: 480–550 Wörter
WICHTIG: Baue 3 natürliche Lücken in den Text ein, markiert mit [LÜCKE_1], [LÜCKE_2], [LÜCKE_3].
Die Lücken stehen zwischen Absätzen oder am Ende eines Absatzes — nicht mitten im Satz.

Fragenformat (9 Fragen):
- 3 Satz-Einfüge-Fragen (Typ "satz_insert"):
  "kontext": Der Textausschnitt rund um die Lücke (2-3 Sätze vor + nach [LÜCKE]).
  "optionen": 4 vollständige Sätze (A-D). Nur einer passt inhaltlich und kohäsiv.
  Die 3 Ablenkungssätze sind grammatisch korrekt aber thematisch oder stilistisch unpassend.
- 6 Richtig/Falsch/Nicht-im-Text-Aussagen (Typ "rfn") — decken alle Textabschnitte ab

Regeln:
- Erklärungen auf Türkisch, lehrreich
- rfn-Aussagen: eindeutig prüfbar, nicht im Text = weder bestätigt noch widerlegt

Antworte NUR mit diesem JSON (kein Markdown):
{
  "examType": "telc",
  "topic": "${topic}",
  "text": "...Text mit [LÜCKE_1], [LÜCKE_2], [LÜCKE_3]...",
  "fragen": [
    { "nr": 1, "type": "satz_insert", "luecke": "LÜCKE_1", "kontext": "...Satz davor. [LÜCKE_1] Satz danach...", "optionen": ["A) ...", "B) ...", "C) ...", "D) ..."], "antwort": "B", "erklaerung": "..." },
    { "nr": 4, "type": "rfn", "aussage": "...", "antwort": "falsch", "erklaerung": "..." }
  ]
}`,
      }],
    });
    return parseJson(response.content[0].text);
  }

  // TestDaF + DSH (bestehende Logik)
  const configs = {
    testdaf: {
      label: 'TestDaF — Lesetext 2',
      textStyle: 'journalistisch zu einem wissenschaftlichen oder gesellschaftspolitischen Thema',
      textLength: '450–530 Wörter',
      mix: '5 Multiple-Choice-Fragen (je 3 Optionen A/B/C) + 3 Richtig/Falsch/Nicht-im-Text-Aussagen',
    },
    dsh: {
      label: 'DSH — Leseverständnis',
      textStyle: 'akademisch/wissenschaftlich',
      textLength: '500–580 Wörter',
      mix: '4 Richtig/Falsch/Nicht-im-Text-Aussagen + 4 Multiple-Choice-Fragen (je 3 Optionen A/B/C)',
    },
  };

  const cfg = configs[examType] ?? configs.testdaf;

  const response = await client.messages.create({
    model: 'claude-opus-4-5',
    max_tokens: 3500,
    messages: [{
      role: 'user',
      content: `Erstelle eine Leseverstehen-Übung im Stil von "${cfg.label}".

Thema: ${topic}
Textstil: ${cfg.textStyle}
Textlänge: ${cfg.textLength}
Fragenformat: ${cfg.mix}

Regeln:
- Text C1-Niveau, authentisch
- MC prüfen: Hauptaussagen, Details, Implikationen
- R/F/NiT: eindeutig prüfbar, "nicht_im_text" = weder bestätigt noch widerlegt
- Erklärungen auf Türkisch
- Fragen in Textreihenfolge

Antworte NUR mit diesem JSON (kein Markdown):
{
  "examType": "${examType}",
  "topic": "${topic}",
  "text": "...",
  "fragen": [
    { "nr": 1, "type": "mc", "frage": "...", "optionen": ["A) ...", "B) ...", "C) ..."], "antwort": "A", "erklaerung": "..." },
    { "nr": 2, "type": "rfn", "aussage": "...", "antwort": "richtig", "erklaerung": "..." }
  ]
}
"antwort"-Werte: MC: "A","B","C" — R/F/NiT: "richtig","falsch","nicht_im_text"`,
    }],
  });

  return parseJson(response.content[0].text);
}

const HOCHSCHULE_TOPICS = [
  'Digitalisierung und Gesellschaft', 'Nachhaltigkeit und Umweltschutz',
  'Bildungssystem und Chancengleichheit', 'Migration und Integration',
  'Demographischer Wandel', 'Arbeit der Zukunft',
  'Gesundheitswesen und Prävention', 'Globalisierung und Wirtschaft',
  'Wissenschaft und Forschungsethik', 'Mobilität und Verkehrswende',
];

export async function generateHochschulePrompt(type) {
  const topic = HOCHSCHULE_TOPICS[Math.floor(Math.random() * HOCHSCHULE_TOPICS.length)];

  const instruction = type === 'testdaf'
    ? `Erstelle eine TestDaF Schriftlicher-Ausdruck-Aufgabe zum Thema "${topic}".
Format:
- 2-3 Sätze: Beschreibe eine fiktive Statistik oder Grafik (konkrete Zahlen, Trends, Vergleiche)
- Aufgabe: "Beschreiben Sie die Grafik und nehmen Sie anschließend Stellung."
- 2 Leitfragen zur Stellungnahme (Ursachen, Konsequenzen oder eigene Meinung)
- Am Ende: "Schreiben Sie mindestens 250 Wörter."
Nur Aufgabentext auf Deutsch, kein Markdown.`
    : `Erstelle eine DSH Textproduktions-Aufgabe zum Thema "${topic}".
Format:
- 3-4 Sätze Einleitungstext mit konkreten Daten oder einer provokativen These
- "Verfassen Sie eine Erörterung/Stellungnahme:"
- 3 Leitfragen (Analyse, Ursachen, Lösungsansätze/eigene Position)
- Am Ende: "Schreiben Sie 250–300 Wörter."
Nur Aufgabentext auf Deutsch, kein Markdown.`;

  const response = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 600,
    messages: [{ role: 'user', content: instruction }],
  });

  return { prompt: response.content[0].text.trim(), topic };
}

export async function analyzeHochschuleWriting(type, prompt, text) {
  const isTestDaf = type === 'testdaf';

  const rubrik = isTestDaf
    ? `TestDaF Schriftlicher Ausdruck — 3 Kategorien (je 0–25 Punkte, max 75):
- inhalt: Aufgabenerfüllung, Grafikbeschreibung, inhaltliche Vollständigkeit
- kommunikativeGestaltung: Struktur, Kohärenz, Textaufbau, Lesbarkeit
- sprachlicheMittel: Grammatik, Wortschatz, Sprachvariabilität
Notenskala: TDN 3 (≤44/75), TDN 4 (45–59/75), TDN 5 (60–75/75)`
    : `DSH Textproduktion — 3 Kategorien (max 100 Punkte):
- gesamteindruck: max 30 Punkte — Lesbarkeit, Inhalt, Struktur
- aufgabenbearbeitung: max 30 Punkte — Umfang, Logik, Argumentation
- sprachlicheRealisierung: max 40 Punkte — Kohäsion, Syntax, Wortschatz, Grammatik
Notenskala: DSH-1 (57–66%), DSH-2 (67–81%), DSH-3 (82–100%)`;

  const kategorienFormat = isTestDaf
    ? `"inhalt": { "punkte": <0-25>, "maxpunkte": 25, "feedback": "..." },
    "kommunikativeGestaltung": { "punkte": <0-25>, "maxpunkte": 25, "feedback": "..." },
    "sprachlicheMittel": { "punkte": <0-25>, "maxpunkte": 25, "feedback": "..." }`
    : `"gesamteindruck": { "punkte": <0-30>, "maxpunkte": 30, "feedback": "..." },
    "aufgabenbearbeitung": { "punkte": <0-30>, "maxpunkte": 30, "feedback": "..." },
    "sprachlicheRealisierung": { "punkte": <0-40>, "maxpunkte": 40, "feedback": "..." }`;

  const response = await client.messages.create({
    model: 'claude-opus-4-5',
    max_tokens: 2048,
    messages: [{
      role: 'user',
      content: `Du bist ein ${isTestDaf ? 'TestDaF' : 'DSH'}-Prüfer. Bewerte folgende Schreibaufgabe.

${rubrik}

Aufgabenstellung:
"${prompt}"

Text des Prüflings:
"""
${text}
"""

Antworte NUR mit diesem JSON (kein Markdown):
{
  "pruefung": "${isTestDaf ? 'TestDaF' : 'DSH'}",
  "note": ${isTestDaf ? '"TDN 3" | "TDN 4" | "TDN 5"' : '"DSH-1" | "DSH-2" | "DSH-3"'},
  "gesamtpunkte": <Zahl>,
  "maxpunkte": ${isTestDaf ? 75 : 100},
  "kategorien": { ${kategorienFormat} },
  "korrekturen": [{ "original": "...", "korrektur": "...", "erklaerung": "..." }],
  "staerken": ["...", "..."],
  "verbesserungen": ["...", "..."]
}
Maximal 4 Korrekturen, 2 Stärken, 3 Verbesserungsvorschläge. Feedback auf Türkisch.`,
    }],
  });

  return parseJson(response.content[0].text);
}

export async function generateTagesSchreiben(modus) {
  if (modus === 'argumantasyon') {
    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 512,
      messages: [{
        role: 'user',
        content: `Erstelle eine kurze TELC C1 Schreibaufgabe (Erörterung/Argümantasyon).
Antworte NUR mit diesem JSON (kein Markdown):
{
  "modus": "argumantasyon",
  "thema": "Thema in 2–3 Wörtern",
  "leitfrage": "Eine konkrete Pro/Kontra-Frage",
  "aufgabe": "Schreiben Sie einen kurzen Text (100–150 Wörter) ...",
  "hinweis": "Struktur: Einleitungssatz + 2 Argumente mit Beispiel + Schlusssatz"
}
Themen-Pool (zufällig wählen): Homeoffice, soziale Medien, vegetarische Ernährung, lebenslanges Lernen, Stadtleben vs. Landleben, KI im Bildungssystem, Elternzeit für Väter, Digitale Detox, Studiengebühren, ehrenamtliche Arbeit, Reisen vs. Sesshaftigkeit, Mehrsprachigkeit.`,
      }],
    });
    return parseJson(response.content[0].text);
  } else {
    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 2048,
      messages: [{
        role: 'user',
        content: `Erstelle einen deutschen Lesetext (400–450 Wörter, ca. 1 Seite) auf C1-Niveau zu einem gesellschaftlichen oder wissenschaftlichen Thema (journalistischer oder sachlicher Stil), plus eine Zusammenfassungsaufgabe.
Der Text soll mehrere Absätze haben, verschiedene Aspekte des Themas beleuchten und C1-typische Strukturen enthalten (Nominalisierungen, Passiv, Konnektoren, Fachwortschatz).
Antworte NUR mit diesem JSON (kein Markdown, kein Zeilenumbruch innerhalb von Strings):
{
  "modus": "zusammenfassung",
  "thema": "Thema in 2–3 Wörtern",
  "text": "Lesetext 400–450 Wörter, C1-Niveau, mehrere Absätze mit \\n\\n getrennt",
  "aufgabe": "Fassen Sie den Text in 6–8 Sätzen zusammen. Gehen Sie auf die wichtigsten Aspekte ein. Verwenden Sie eigene Formulierungen.",
  "wortanzahl_ziel": 100
}`,
      }],
    });
    return parseJson(response.content[0].text);
  }
}

export async function analyzeTagesSchreiben(modus, aufgabe, text) {
  const isZusammenfassung = modus === 'zusammenfassung';

  const kategorienPrompt = isZusammenfassung
    ? `- vollstaendigkeit (0-34): Wurden alle Kernpunkte erfasst?
- formulierung (0-33): Eigene Formulierungen (kein Copy-Paste)?
- sprachlicheKorrektheit (0-33): Grammatik, Wortschatz, Satzstruktur.`
    : `- wortschatz (0-34): C1-Vokabular, Kollokationen, themenspezifische Ausdrücke.
- grammatik (0-33): Korrektheit komplexer Strukturen (Nebensätze, Passiv, Konjunktiv).
- kohaerenz (0-33): Logischer Aufbau, Konnektoren, Argumentation.`;

  const kategorienFormat = isZusammenfassung
    ? `"vollstaendigkeit": { "punkte": <0-34>, "feedback": "Türkçe" },
    "formulierung": { "punkte": <0-33>, "feedback": "Türkçe" },
    "sprachlicheKorrektheit": { "punkte": <0-33>, "feedback": "Türkçe" }`
    : `"wortschatz": { "punkte": <0-34>, "feedback": "Türkçe" },
    "grammatik": { "punkte": <0-33>, "feedback": "Türkçe" },
    "kohaerenz": { "punkte": <0-33>, "feedback": "Türkçe" }`;

  const response = await client.messages.create({
    model: 'claude-opus-4-5',
    max_tokens: 1500,
    messages: [{
      role: 'user',
      content: `Du bist ein TELC C1 Deutschlehrer. Bewerte diesen kurzen Text.

Aufgabentyp: ${isZusammenfassung ? 'Zusammenfassung' : 'Kurze Erörterung (100–150 Wörter)'}
Aufgabe: "${aufgabe}"

Text:
"""
${text}
"""

Bewertungskriterien:
${kategorienPrompt}

Antworte NUR mit diesem JSON (kein Markdown):
{
  "gesamtpunkte": <0-100>,
  "niveau": "B1" | "B2" | "C1" | "C2",
  "kategorien": { ${kategorienFormat} },
  "korrekturen": [{ "original": "...", "korrektur": "...", "erklaerung": "..." }],
  "verbesserungen": ["...", "..."]
}
Max 3 Korrekturen, 2 Verbesserungsvorschläge. Alles auf Türkisch außer deutschen Beispielen.`,
    }],
  });
  return parseJson(response.content[0].text);
}

export async function analyzeMuendlich(leitfrage, impulskarten, text) {
  const response = await client.messages.create({
    model: 'claude-opus-4-5',
    max_tokens: 2048,
    messages: [{
      role: 'user',
      content: `Du bist ein TELC-Prüfer und bewertest einen Vortragstext für die TELC C1 Mündlicher Ausdruck Prüfung (Teil 1: Kurzreferat).

Leitfrage: "${leitfrage}"
Impulskarten: ${impulskarten.join(' | ')}

Text des Kandidaten:
"""
${text}
"""

Bewerte nach TELC C1 Kriterien (je 0–25 Punkte). Antworte NUR mit diesem JSON (kein Markdown):
{
  "niveau": "B2" | "C1" | "C2",
  "gesamtpunkte": <0-100>,
  "kategorien": {
    "aufgabenerfuellung": { "punkte": <0-25>, "feedback": "Türkçe feedback" },
    "kohaerenz": { "punkte": <0-25>, "feedback": "Türkçe feedback" },
    "wortschatz": { "punkte": <0-25>, "feedback": "Türkçe feedback" },
    "grammatik": { "punkte": <0-25>, "feedback": "Türkçe feedback" }
  },
  "impulskarten_behandelt": ["hangi impuls karten işlendi"],
  "impulskarten_fehlend": ["hangi impuls karten eksik"],
  "verbesserungen": ["öneri 1", "öneri 2", "öneri 3"],
  "musterformulierungen": ["C1 düzeyinde örnek cümle 1", "örnek cümle 2"]
}
Kriteriendetails:
- aufgabenerfuellung: Wurde die Leitfrage beantwortet? Alle 3 Impulskarten angesprochen? Klare Struktur (Einleitung/Hauptteil/Schluss)?
- kohaerenz: Logischer Aufbau, Kohäsionsmittel (Konnektoren), Argumentationskette.
- wortschatz: C1-Niveau Vokabular, fachsprachliche Ausdrücke, Redemittel.
- grammatik: Komplexe Strukturen, Nebensätze, Passiv, Konjunktiv II, korrekte Flexion.
Alle Feedback-Texte auf Türkisch. Musterformulierungen auf Deutsch.`,
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
