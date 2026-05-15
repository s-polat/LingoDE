import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import wordRoutes from './routes/word.routes.js';
import aiRoutes from './routes/ai.routes.js';
import grammarRoutes from './routes/grammar.routes.js';
import praepositionalverbenRoutes from './routes/praepositionalverben.routes.js';
import nvvRoutes from './routes/nvv.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

app.use('/api/words', wordRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/grammar', grammarRoutes);
app.use('/api/praepositionalverben', praepositionalverbenRoutes);
app.use('/api/nvv', nvvRoutes);

app.get('/api/health', (_, res) => res.json({ status: 'ok' }));

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ success: false, message: err.message || 'Sunucu hatası' });
});

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Backend çalışıyor: http://localhost:${PORT}`));
});
