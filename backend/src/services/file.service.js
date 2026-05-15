import { createRequire } from 'module';
import mammoth from 'mammoth';

const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');

export async function extractTextFromPDF(buffer) {
  const data = await pdfParse(buffer);
  return data.text;
}

export async function extractTextFromDOCX(buffer) {
  const result = await mammoth.extractRawText({ buffer });
  return result.value;
}

export async function extractTextFromFile(buffer, mimetype) {
  if (mimetype === 'application/pdf') {
    return extractTextFromPDF(buffer);
  }
  if (
    mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    mimetype === 'application/msword'
  ) {
    return extractTextFromDOCX(buffer);
  }
  // Düz metin
  return buffer.toString('utf-8');
}
