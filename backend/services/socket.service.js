import { log } from '../utils/logger.js';

let ioInstance = null;

export const initSocket = (io) => {
  ioInstance = io;

  io.on('connection', (socket) => {
    log('SOCKET', `User ${socket.id} connected`);

    socket.on('joinQueue', (queueId) => {
      socket.join(`queue:${queueId}`);
      log('SOCKET', `User ${socket.id} joined room: queue:${queueId}`);
    });

    socket.on('disconnect', () => {
      log('SOCKET', `User ${socket.id} disconnected`);
    });
  });
};

export const emitQueueEvent = (queueId, event, payload) => {
  if (!ioInstance) return;
  ioInstance.to(`queue:${queueId}`).emit(event, payload);
};
