import { logError } from '../utils/logger.js';

const errorHandler = (err, req, res, _next) => {
  const status = err.status || 500;
  
  // Log the error with details
  logError('ERROR', {
    message: err.message || 'Server Error',
    status,
    path: req.path,
    method: req.method,
    body: req.body,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
  
  res.status(status).json({ message: err.message || 'Server Error' });
};

export default errorHandler;
