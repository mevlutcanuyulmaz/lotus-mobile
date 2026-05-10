export interface OnboardingProfilePayload {
  fitness_goal: 'weight_loss' | 'muscle_gain' | 'healthy_lifestyle' | 'maintain_form';
  gender: 'male' | 'female' | 'other';
  age: number;
  height_cm: number;
  weight_kg: number;
  current_body_type?: 'slim' | 'average' | 'overweight';
  target_weight_kg?: number;
  weekly_workout_frequency?: number;
  health_conditions?: string;
  sleep_duration_hours?: number;
  daily_water_liters?: number;
  yoga_experience_level?: 'beginner' | 'intermediate' | 'advanced';
  flexibility_level?: 'low' | 'medium' | 'high';
}

export interface ProfileResponse {
  id: number;
  user_id: number;
  gender?: string | null;
  age?: number | null;
  height_cm?: number | null;
  weight_kg?: number | null;
  current_body_type?: string | null;
  target_body_regions?: string | null;
  fitness_goal?: string | null;
  target_weight_kg?: number | null;
  weekly_workout_frequency?: number | null;
  yoga_experience_level?: string | null;
  flexibility_level?: string | null;
  health_conditions?: string | null;
  sleep_duration_hours?: number | null;
  daily_water_liters?: number | null;
  dietary_preferences?: string | null;
  unhealthy_habits?: string | null;
}
