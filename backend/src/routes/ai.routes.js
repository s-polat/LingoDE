import { Router } from 'express';
import multer from 'multer';
import { analyzeWordHandler, analyzeWordsBatchHandler, extractFromImage, extractFromFile, analyzeWritingHandler, generateWritingPromptHandler, generateHochschulePromptHandler, analyzeHochschuleWritingHandler, leseverstehenHandler, analyzeMuendlichHandler, generateTagesSchreibenHandler, analyzeTagesSchreibenHandler } from '../controllers/ai.controller.js';

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
