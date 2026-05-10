import { getDailyPlans } from '../../services/plan';

export async function fetchDailyPlansAction(weeklyPlanId: number) {
  return getDailyPlans(weeklyPlanId);
}
