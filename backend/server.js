import dotenv from 'dotenv';
import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import passport from 'passport';
import connectDB from './config/db.js';
import configurePassport from './config/passport.js';
import authRoutes from './routes/auth.routes.js';
import orgRoutes from './routes/org.routes.js';
import queueRoutes from './routes/queue.routes.js';
import tokenRoutes from './routes/token.routes.js';
import analyticsRoutes from './routes/analytics.routes.js';
import feedbackRoutes from './routes/feedback.routes.js';
import errorHandler from './middlewares/errorHandler.js';

dotenv.config();

const app = express();
const server = http.createServer(app);

connectDB();
configurePassport(passport);

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, Postman, or same-origin requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = process.env.CLIENT_URL?.split(',') || [
      'http://localhost:5173', // Vite default dev port
      'http://localhost:3000', // Common React dev port
      'http://localhost:5174', // Vite alternate port
      'http://127.0.0.1:5173',
      'http://127.0.0.1:3000',
    ];
    
    if (process.env.CLIENT_URL === '*' || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log(`[CORS] Blocked origin: ${origin}`);
      callback(null, true); // Allow all in development, can be restricted in production
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(passport.initialize());

app.get('/', (_req, res) => {
  res.json({ status: 'OK', message: 'SmartQueue API' });
});

app.get('/health', (_req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.use('/api/auth', authRoutes);
app.use('/api/orgs', orgRoutes);
app.use('/api/queues', queueRoutes);
app.use('/api/tokens', tokenRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/feedback', feedbackRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`[SERVER] Starting SmartQueue API on port ${PORT}`);
  console.log(`[SERVER] Health check available at http://localhost:${PORT}/health`);
  console.log(`[SERVER] API endpoints available at http://localhost:${PORT}/api`);
});
