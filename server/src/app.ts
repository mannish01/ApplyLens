import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import apiRoutes from './routes/index.js';
import { requestLogger } from './middleware/requestLogger.js';
import { errorHandler } from './middleware/errorHandler.js';
import cookieParser from 'cookie-parser';
const app = express();

app.use(helmet());

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);
app.get('/api/v1/health', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'ApplyLens API is running!',
    timestamp: new Date().toISOString(),
  });
});
app.use('/api/v1', apiRoutes);

// Handle unknown endpoints
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found.',
  });
});
app.use(errorHandler)
export default app;
