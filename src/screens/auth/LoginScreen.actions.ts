import { loginWithPassword } from '../../services/auth';
import { upsertOnboardingProfile } from '../../services/profile';
import { OnboardingProfilePayload } from '../../types/profile';

type LoginActionInput = {
  email: string;
  password: string;
  onboardingPayload?: OnboardingProfilePayload;
};

type LoginActionResult = {
  didSubmitOnboardingProfile: boolean;
};

export async function submitLoginAction({
  email,
  password,
  onboardingPayload,
}: LoginActionInput): Promise<LoginActionResult> {
  const token = await loginWithPassword(email, password);

  if (onboardingPayload) {
    await upsertOnboardingProfile(onboardingPayload, token);
  }

  return {
    didSubmitOnboardingProfile: Boolean(onboardingPayload),
  };
}
