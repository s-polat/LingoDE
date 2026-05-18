import { analyzeWord, analyzeWordsBatch, extractWordsFromText, extractWordsFromImage, analyzeWriting, generateWritingPrompt, generateHochschulePrompt, analyzeHochschuleWriting, generateLeseverstehen, analyzeMuendlich, generateTagesSchreiben, analyzeTagesSchreiben } from '../services/claude.service.js';
import { extractTextFromFile } from '../services/file.service.js';

export async function analyzeWordHandler(req, res) {
  const { word } = req.body;
  if (!word) return res.status(400).json({ success: false, message: 'Kelime gerekli' });

  const analysis = await analyzeWord(word);
  res.json({ success: true, data: analysis });
}

export async function extractFromImage(req, res) {
  const { image, mediaType } = req.body;
  if (!image) return res.status(400).json({ success: false, message: 'Görsel verisi gerekli' });

  const result = await extractWordsFromImage(image, mediaType || 'image/jpeg');
  res.json({ success: true, data: result });
}

export async function analyzeWordsBatchHandler(req, res) {
  const { words } = req.body;
  if (!words?.length) return res.status(400).json({ success: false, message: 'Kelime listesi gerekli' });
  if (words.length > 30) return res.status(400).json({ success: false, message: 'En fazla 30 kelime gönderilebilir' });

  const analyses = await analyzeWordsBatch(words);
  res.json({ success: true, data: analyses });
}

export async function generateWritingPromptHandler(req, res) {
  const { type } = req.query;
  if (type !== 'brief' && type !== 'essay') return res.status(400).json({ success: false, message: 'type: brief veya essay olmalı' });
  const result = await generateWritingPrompt(type);
  res.json({ success: true, data: result });
}

export async function analyzeWritingHandler(req, res) {
  const { type, prompt, text } = req.body;
  if (!type || !prompt || !text) return res.status(400).json({ success: false, message: 'type, prompt ve text gerekli' });
  if (text.length < 50) return res.status(400).json({ success: false, message: 'Metin çok kısa' });

  const result = await analyzeWriting(type, prompt, text);
  res.json({ success: true, data: result });
}

export async function leseverstehenHandler(req, res) {
  const { examType } = req.query;
  if (!['goethe', 'telc', 'testdaf', 'dsh'].includes(examType)) {
    return res.status(400).json({ success: false, message: 'examType: goethe, testdaf veya dsh olmalı' });
  }
  const result = await generateLeseverstehen(examType);
  res.json({ success: true, data: result });
}

export async function generateHochschulePromptHandler(req, res) {
  const { type } = req.query;
  if (type !== 'testdaf' && type !== 'dsh') return res.status(400).json({ success: false, message: 'type: testdaf veya dsh olmalı' });
  const result = await generateHochschulePrompt(type);
  res.json({ success: true, data: result });
}

export async function analyzeHochschuleWritingHandler(req, res) {
  const { type, prompt, text } = req.body;
  if (!type || !prompt || !text) return res.status(400).json({ success: false, message: 'type, prompt ve text gerekli' });
  if (text.length < 50) return res.status(400).json({ success: false, message: 'Metin çok kısa' });
  const result = await analyzeHochschuleWriting(type, prompt, text);
  res.json({ success: true, data: result });
}

export async function generateTagesSchreibenHandler(req, res) {
  const { modus } = req.query;
  if (modus !== 'argumantasyon' && modus !== 'zusammenfassung') {
    return res.status(400).json({ success: false, message: 'modus: argumantasyon veya zusammenfassung olmalı' });
  }
  const result = await generateTagesSchreiben(modus);
  res.json({ success: true, data: result });
}

export async function analyzeTagesSchreibenHandler(req, res) {
  const { modus, aufgabe, text } = req.body;
  if (!modus || !aufgabe || !text) {
    return res.status(400).json({ success: false, message: 'modus, aufgabe ve text gerekli' });
  }
  if (text.length < 30) return res.status(400).json({ success: false, message: 'Metin çok kısa' });
  const result = await analyzeTagesSchreiben(modus, aufgabe, text);
  res.json({ success: true, data: result });
}

export async function analyzeMuendlichHandler(req, res) {
  const { leitfrage, impulskarten, text } = req.body;
  if (!leitfrage || !impulskarten?.length || !text) {
    return res.status(400).json({ success: false, message: 'leitfrage, impulskarten ve text gerekli' });
  }
  if (text.length < 50) return res.status(400).json({ success: false, message: 'Metin çok kısa' });
  const result = await analyzeMuendlich(leitfrage, impulskarten, text);
  res.json({ success: true, data: result });
}

export async function extractFromFile(req, res) {
  if (!req.file) return res.status(400).json({ success: false, message: 'Dosya gerekli' });

  const text = await extractTextFromFile(req.file.buffer, req.file.mimetype);
  const words = await extractWordsFromText(text);
  res.json({ success: true, data: { words, raw_text: text.slice(0, 500) } });
}
