import { ApiError } from '../../services/api';
import { AuthUser, clearSessionToken, getCurrentUser } from '../../services/auth';
import { getMyProfile } from '../../services/profile';
import { ProfileResponse } from '../../types/profile';

export type ProfileSummaryData = {
  user: AuthUser;
  profile: ProfileResponse | null;
};

export async function fetchProfileSummaryAction(): Promise<ProfileSummaryData> {
  const user = await getCurrentUser();

  try {
    const profile = await getMyProfile();
    return { user, profile };
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return { user, profile: null };
    }
    throw error;
  }
}

export async function submitLogoutAction() {
  await clearSessionToken();
}
