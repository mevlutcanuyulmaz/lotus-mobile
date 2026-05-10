import { getSessionToken } from './auth';
import { apiClient } from './api';
import { PlanValidateResponse } from '../types/safety';

function resolveToken(token?: string) {
  const authToken = token ?? getSessionToken();
  if (!authToken) {
    throw new Error('Oturum bulunamadı.');
  }
  return authToken;
}

export async function validateWeeklyPlan(weeklyPlanId: number, token?: string) {
  return apiClient.request<PlanValidateResponse>(`/safety/plans/${weeklyPlanId}/validate`, {
    method: 'POST',
    token: resolveToken(token),
  });
}
