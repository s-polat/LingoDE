import { Router } from 'express';
import { getAll, lookupVerb, getExercises, addVerb } from '../controllers/praepositionalverben.controller.js';

const router = Router();

router.get('/', getAll);
router.post('/', addVerb);
router.get('/exercises', getExercises);
router.get('/:verb', lookupVerb);

export default router;
