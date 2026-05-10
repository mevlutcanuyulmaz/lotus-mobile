import { apiClient } from './api';
import { getSessionToken } from './auth';
import { RetrievalSearchResponse } from '../types/retrieval';

type RetrievalSearchPayload = {
  query: string;
  top_k?: number;
  split?: string;
};

function resolveToken(token?: string) {
  const authToken = token ?? getSessionToken();
  if (!authToken) {
    throw new Error('Oturum bulunamadı.');
  }
  return authToken;
}

export async function searchRetrieval(payload: RetrievalSearchPayload, token?: string) {
  return apiClient.request<RetrievalSearchResponse>('/retrieval/search', {
    method: 'POST',
    token: resolveToken(token),
    body: payload,
  });
}
