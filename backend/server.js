import dotenv from 'dotenv';
import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import passport from 'passport';
import { Server as SocketIOServer } from 'socket.io';

import connectDB from './config/db.js';
import configurePassport from './config/passport.js';
import { initSocket } from './services/socket.service.js';
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

const io = new SocketIOServer(server, {
  cors: {
    origin: process.env.SOCKET_IO_CORS?.split(',') || '*',
    credentials: true,
  },
});

initSocket(io);

connectDB();
configurePassport(passport);

app.use(cors({
  origin: process.env.CLIENT_URL?.split(',') || '*',
  credentials: true,
}));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(passport.initialize());

app.get('/', (_req, res) => {
  res.json({ status: 'OK', message: 'SmartQueue API' });
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
});
