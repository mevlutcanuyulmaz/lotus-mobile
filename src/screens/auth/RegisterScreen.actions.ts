import { registerWithPassword, loginWithPassword } from '../../services/auth';
import { upsertOnboardingProfile } from '../../services/profile';
import { OnboardingProfilePayload } from '../../types/profile';

type RegisterActionInput = {
  fullName: string;
  email: string;
  password: string;
  onboardingPayload?: OnboardingProfilePayload;
};

type RegisterActionResult = {
  didSubmitOnboardingProfile: boolean;
};

export async function submitRegisterAction({
  fullName,
  email,
  password,
  onboardingPayload,
}: RegisterActionInput): Promise<RegisterActionResult> {
  await registerWithPassword({
    email,
    password,
    full_name: fullName.trim() || undefined,
  });

  const token = await loginWithPassword(email, password);
  if (onboardingPayload) {
    await upsertOnboardingProfile(onboardingPayload, token);
  }

  return {
    didSubmitOnboardingProfile: Boolean(onboardingPayload),
  };
}
