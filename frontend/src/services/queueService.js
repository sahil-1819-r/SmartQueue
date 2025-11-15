import api from './api';

export const getQueue = (queueId) => api.get(`/queues/${queueId}`);

export const getAllQueues = () => api.get('/queues');

export const createQueue = (payload) => api.post('/queues', payload);

export const updateQueue = (queueId, payload) =>
  api.put(`/queues/${queueId}`, payload);

export const fetchQueueAnalytics = (queueId) =>
  api.get(`/analytics/queues/${queueId}`);

export const fetchFeedbackForQueue = (queueId) =>
  api.get(`/feedback/queue/${queueId}`);

export const submitFeedback = (payload) => api.post('/feedback', payload);

