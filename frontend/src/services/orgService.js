import api from './api';

export const fetchNearby = ({ lat, lng, radius }) =>
  api.get('/orgs/nearby', {
    params: { lat, lng, radius },
  });

export const fetchOrgById = (orgId) => api.get(`/orgs/${orgId}`);

export const fetchOrgQueues = (orgId) => api.get(`/orgs/${orgId}/queues`);

