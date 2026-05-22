import 'dotenv/config';
import './services/firebase-admin.service.js';
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import wordRoutes from './routes/word.routes.js';
import aiRoutes from './routes/ai.routes.js';
import grammarRoutes from './routes/grammar.routes.js';
import praepositionalverbenRoutes from './routes/praepositionalverben.routes.js';
import nvvRoutes from './routes/nvv.routes.js';
import sessionRoutes from './routes/session.routes.js';
import { requireAuth } from './middleware/auth.middleware.js';

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = (process.env.FRONTEND_URL || '')
  .split(',')
  .map(o => o.trim())
  .filter(Boolean);
app.use(cors({ origin: allowedOrigins.length === 1 ? allowedOrigins[0] : allowedOrigins }));
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

app.use('/api/words', requireAuth, wordRoutes);
app.use('/api/ai', requireAuth, aiRoutes);
app.use('/api/grammar', requireAuth, grammarRoutes);
app.use('/api/praepositionalverben', requireAuth, praepositionalverbenRoutes);
app.use('/api/nvv', requireAuth, nvvRoutes);
app.use('/api/sessions', requireAuth, sessionRoutes);

app.get('/api/health', (_, res) => res.json({ status: 'ok' }));

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ success: false, message: err.message || 'Sunucu hatası' });
});

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
