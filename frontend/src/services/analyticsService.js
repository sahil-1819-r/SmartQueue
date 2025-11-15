import api from './api';

export const fetchUserAnalytics = () => api.get('/analytics/me');

