import { validateWeeklyPlan } from '../../services/safety';

export async function validateWeeklyPlanSafetyAction(weeklyPlanId: number) {
  return validateWeeklyPlan(weeklyPlanId);
}
