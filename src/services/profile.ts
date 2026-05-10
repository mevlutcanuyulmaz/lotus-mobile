import { apiClient } from './api';
import { OnboardingProfilePayload, ProfileResponse } from '../types/profile';
import { getSessionToken } from './auth';

export async function upsertOnboardingProfile(payload: OnboardingProfilePayload, token: string) {
  return apiClient.request('/profile/onboarding', {
    method: 'POST',
    token,
    body: payload,
  });
}

export async function getMyProfile(token?: string) {
  const authToken = token ?? getSessionToken();
  if (!authToken) {
    throw new Error('Oturum bulunamadı.');
  }

  return apiClient.request<ProfileResponse>('/profile/me', {
    method: 'GET',
    token: authToken,
  });
}
