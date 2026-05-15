import { Router } from 'express';
import { getAll, lookupVerb, getExercises } from '../controllers/praepositionalverben.controller.js';

const router = Router();

router.get('/', getAll);
router.get('/exercises', getExercises);
router.get('/:verb', lookupVerb);

export default router;
