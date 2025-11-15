import api from './api';

export const login = (credentials) => api.post('/auth/login', credentials);

export const registerUser = (payload) =>
  api.post('/auth/register/user', payload);

export const registerOrg = (payload) =>
  api.post('/auth/register/org', payload);

