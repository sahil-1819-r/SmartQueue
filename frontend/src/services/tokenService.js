import api from './api';

export const listQueueTokens = (queueId) =>
  api.get(`/tokens/queue/${queueId}`);

export const joinQueue = (queueId, payload = {}) =>
  api.post(`/tokens/queue/${queueId}/join`, payload);

export const markTokenDone = (tokenId) =>
  api.patch(`/tokens/${tokenId}/done`);

