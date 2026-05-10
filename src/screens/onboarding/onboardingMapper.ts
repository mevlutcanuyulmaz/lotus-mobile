import { OnboardingProfilePayload } from '../../types/profile';

export type OnboardingAnswers = Record<string, string>;

const FITNESS_GOAL_MAP: Record<string, OnboardingProfilePayload['fitness_goal']> = {
  a: 'weight_loss',
  b: 'muscle_gain',
  c: 'healthy_lifestyle',
  d: 'maintain_form',
};

const AGE_RANGE_MAP: Record<string, number> = {
  '18-25': 22,
  '26-35': 30,
  '36-45': 40,
  '46+': 50,
};

const WORKOUT_FREQUENCY_MAP: Record<string, number> = {
  '1-2': 2,
  '3-4': 4,
  '5+': 6,
};

const SLEEP_HOURS_MAP: Record<string, number> = {
  '<5': 4.5,
  '5-7': 6,
  '7-9': 8,
  '>9': 9.5,
};

const WATER_MAP: Record<string, number> = {
  low: 0.8,
  medium: 1.5,
  high: 2.5,
};

function inferBodyMetrics(bodyType: string) {
  if (bodyType === 'slim') {
    return { heightCm: 170, weightKg: 58 };
  }
  if (bodyType === 'overweight') {
    return { heightCm: 170, weightKg: 88 };
  }
  return { heightCm: 170, weightKg: 72 };
}

function inferTargetWeight(currentWeight: number, goal: OnboardingProfilePayload['fitness_goal']) {
  if (goal === 'weight_loss') return Math.max(45, currentWeight - 8);
  if (goal === 'muscle_gain') return Math.min(120, currentWeight + 5);
  return currentWeight;
}

export function mapAnswersToProfilePayload(answers: OnboardingAnswers): OnboardingProfilePayload {
  const goal = FITNESS_GOAL_MAP[answers.fitness_goal] ?? 'healthy_lifestyle';
  const bodyTypeRaw = answers.current_body_type ?? 'average';
  const bodyType = bodyTypeRaw as OnboardingProfilePayload['current_body_type'];
  const metrics = inferBodyMetrics(bodyTypeRaw);
  const healthSummary = [
    answers.daily_stress_level ? `Stres: ${answers.daily_stress_level}` : '',
    answers.bad_habit ? `Aliskanlik: ${answers.bad_habit}` : '',
  ]
    .filter(Boolean)
    .join(' | ');

  return {
    fitness_goal: goal,
    gender: (answers.gender as OnboardingProfilePayload['gender']) ?? 'other',
    age: AGE_RANGE_MAP[answers.age_range] ?? 30,
    height_cm: metrics.heightCm,
    weight_kg: metrics.weightKg,
    current_body_type: bodyType,
    target_weight_kg: inferTargetWeight(metrics.weightKg, goal),
    weekly_workout_frequency: WORKOUT_FREQUENCY_MAP[answers.weekly_workout_frequency] ?? 3,
    health_conditions: healthSummary || undefined,
    sleep_duration_hours: SLEEP_HOURS_MAP[answers.sleep_hours] ?? 7,
    daily_water_liters: WATER_MAP[answers.daily_water] ?? 1.5,
    yoga_experience_level: answers.preferred_exercise === 'yoga' ? 'intermediate' : 'beginner',
    flexibility_level: answers.daily_activity_level === 'active' ? 'high' : 'medium',
  };
}
