import { analyzeWord, analyzeWordsBatch, extractWordsFromText, extractWordsFromImage } from '../services/claude.service.js';
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

export async function extractFromFile(req, res) {
  if (!req.file) return res.status(400).json({ success: false, message: 'Dosya gerekli' });

  const text = await extractTextFromFile(req.file.buffer, req.file.mimetype);
  const words = await extractWordsFromText(text);
  res.json({ success: true, data: { words, raw_text: text.slice(0, 500) } });
}
