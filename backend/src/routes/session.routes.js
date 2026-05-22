import { Router } from 'express';
import { createSession, getSessionStats } from '../controllers/session.controller.js';

const router = Router();

router.post('/', createSession);
router.get('/stats', getSessionStats);

export default router;
