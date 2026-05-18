import { Router } from 'express';
import multer from 'multer';
import rateLimit from 'express-rate-limit';
import { analyzeWordHandler, analyzeWordsBatchHandler, extractFromImage, extractFromFile, analyzeWritingHandler, generateWritingPromptHandler, generateHochschulePromptHandler, analyzeHochschuleWritingHandler, leseverstehenHandler, analyzeMuendlichHandler, generateTagesSchreibenHandler, analyzeTagesSchreibenHandler } from '../controllers/ai.controller.js';

const aiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 dakika
  max: 50,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Çok fazla istek gönderildi. 15 dakika sonra tekrar dene.' },
});

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (_, file, cb) => {
    const allowed = ['application/pdf', 'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'];
    cb(null, allowed.includes(file.mimetype));
  },
});

const router = Router();

router.use(aiLimiter);

router.post('/analyze', analyzeWordHandler);
router.post('/analyze-batch', analyzeWordsBatchHandler);
router.post('/extract-image', extractFromImage);
router.post('/extract-file', upload.single('file'), extractFromFile);
router.get('/schreiben-aufgabe', generateWritingPromptHandler);
router.post('/schreiben', analyzeWritingHandler);
router.get('/leseverstehen', leseverstehenHandler);
router.get('/hochschule-aufgabe', generateHochschulePromptHandler);
router.post('/hochschule', analyzeHochschuleWritingHandler);
router.post('/muendlich', analyzeMuendlichHandler);
router.get('/tagesschreiben', generateTagesSchreibenHandler);
router.post('/tagesschreiben', analyzeTagesSchreibenHandler);

export default router;
