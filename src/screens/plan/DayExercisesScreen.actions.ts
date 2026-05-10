import { getPlanExercises } from '../../services/plan';

export async function fetchDayExercisesAction(dailyPlanId: number) {
  return getPlanExercises(dailyPlanId);
}
