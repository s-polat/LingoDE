import { Router } from 'express';
import {
  getWords, getWord, createWord, updateWord, deleteWord,
  getReviewWords, reviewWord, getStats,
} from '../controllers/word.controller.js';

const router = Router();

router.get('/stats', getStats);
router.get('/review', getReviewWords);
router.post('/:id/review', reviewWord);

router.get('/', getWords);
router.get('/:id', getWord);
router.post('/', createWord);
router.put('/:id', updateWord);
router.delete('/:id', deleteWord);

export default router;
