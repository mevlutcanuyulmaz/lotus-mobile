import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiClient } from './api';

type TokenResponse = {
  access_token: string;
  token_type: string;
};

type RegisterPayload = {
  email: string;
  password: string;
  full_name?: string;
};

export type AuthUser = {
  id: number;
  email: string;
  full_name?: string | null;
};

export type RememberedLogin = {
  email: string;
  password: string;
};

let sessionToken: string | null = null;
const SESSION_TOKEN_KEY = 'lotus.session.token';
const REMEMBERED_LOGIN_KEY = 'lotus.remembered.login';

export async function registerWithPassword(payload: RegisterPayload) {
  return apiClient.request('/auth/register', {
    method: 'POST',
    body: payload,
  });
}

export async function loginWithPassword(email: string, password: string) {
  const formBody = new URLSearchParams({
    username: email.trim(),
    password,
  }).toString();

  const data = await apiClient.request<TokenResponse>('/auth/token', {
    method: 'POST',
    formBody,
  });

  sessionToken = data.access_token;
  await AsyncStorage.setItem(SESSION_TOKEN_KEY, data.access_token);
  return data.access_token;
}

export function getSessionToken() {
  return sessionToken;
}

export async function restoreSessionToken() {
  const token = await AsyncStorage.getItem(SESSION_TOKEN_KEY);
  sessionToken = token;
  return token;
}

export async function clearSessionToken() {
  sessionToken = null;
  await AsyncStorage.removeItem(SESSION_TOKEN_KEY);
}

export async function getRememberedLogin() {
  const raw = await AsyncStorage.getItem(REMEMBERED_LOGIN_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as RememberedLogin;
    if (!parsed?.email || !parsed?.password) return null;
    return parsed;
  } catch {
    return null;
  }
}

export async function saveRememberedLogin(payload: RememberedLogin) {
  await AsyncStorage.setItem(REMEMBERED_LOGIN_KEY, JSON.stringify(payload));
}

export async function clearRememberedLogin() {
  await AsyncStorage.removeItem(REMEMBERED_LOGIN_KEY);
}

export async function getCurrentUser(token?: string) {
  const authToken = token ?? sessionToken;
  if (!authToken) {
    throw new Error('Oturum bulunamadı.');
  }

  return apiClient.request<AuthUser>('/auth/me', {
    method: 'GET',
    token: authToken,
  });
}
