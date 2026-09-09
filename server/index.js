import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { z } from 'zod';

const app = express();
const port = Number(process.env.PORT || 8787);
const clientOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

app.disable('x-powered-by');
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: clientOrigin, methods: ['GET', 'POST'], credentials: false }));
app.use(express.json({ limit: '20kb', strict: true }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 60, standardHeaders: 'draft-8', legacyHeaders: false }));

const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(254),
  message: z.string().trim().min(20).max(4000),
  website: z.string().max(0).optional()
}).strict();

app.get('/health', (_request, response) => response.json({ status: 'ok' }));
app.post('/api/contact', (request, response) => {
  const parsed = contactSchema.safeParse(request.body);
  if (!parsed.success) return response.status(400).json({ error: 'Please check the submitted fields.' });
  // Queue email delivery here. Do not log message contents or credentials.
  return response.status(202).json({ accepted: true });
});

app.use((_request, response) => response.status(404).json({ error: 'Not found' }));
app.use((error, _request, response, _next) => {
  if (error instanceof SyntaxError) return response.status(400).json({ error: 'Invalid JSON.' });
  return response.status(500).json({ error: 'Internal server error.' });
});

app.listen(port, () => console.log(`Buildifo API listening on port ${port}`));
