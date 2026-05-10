import { apiClient } from './api';
import { getSessionToken } from './auth';
import { ExerciseResponse, ExerciseSegmentResponse } from '../types/exercise';

function resolveToken(token?: string) {
  const authToken = token ?? getSessionToken();
  if (!authToken) {
    throw new Error('Oturum bulunamadı.');
  }
  return authToken;
}

function resolvePlayableVideoUrl(videoUrl?: string | null, videoPath?: string | null) {
  const base = apiClient.API_BASE_URL.replace(/\/$/, '');
  const normalizedPath = videoPath?.trim().replace(/\\/g, '/').replace(/^\/+/, '');

  // En güvenilir kaynak: local video_path + güncel API base URL.
  if (normalizedPath) {
    return `${base}/media/videos/${normalizedPath}`;
  }

  const raw = (videoUrl || '').trim();
  if (!raw) return raw;

  // DB'de eski IP varsa, sadece media yolunu koruyup güncel API host ile birleştir.
  const mediaIndex = raw.indexOf('/media/videos/');
  if (mediaIndex >= 0) {
    return `${base}${raw.substring(mediaIndex)}`;
  }

  if (raw.startsWith('/')) {
    return `${base}${raw}`;
  }

  return raw;
}

export async function getExercises(token?: string) {
  return apiClient.request<ExerciseResponse[]>('/exercises', {
    method: 'GET',
    token: resolveToken(token),
  });
}

export async function getExerciseSegments(exerciseId: number, token?: string, limit: number = 100) {
  const safeLimit = Math.max(1, Math.min(500, Math.floor(limit)));
  const segments = await apiClient.request<ExerciseSegmentResponse[]>(
    `/exercises/${exerciseId}/segments?only_active=true&require_downloaded=true&local_only=true&limit=${safeLimit}`,
    {
    method: 'GET',
    token: resolveToken(token),
    }
  );

  return segments.map(segment => ({
    ...segment,
    video_url: resolvePlayableVideoUrl(segment.video_url, segment.video_path),
  }));
}
