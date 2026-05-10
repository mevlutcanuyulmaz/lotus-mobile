import { clearSessionToken, getCurrentUser } from '../../services/auth';
import { getDailyPlans, getWeeklyPlans } from '../../services/plan';
import { DailyPlanResponse, WeeklyPlanResponse } from '../../types/plan';

export async function fetchHomeUserAction() {
  return getCurrentUser();
}

export async function submitHomeLogoutAction() {
  await clearSessionToken();
}

const getLocalDateKey = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const isTodayInRange = (plan: WeeklyPlanResponse, today: string) => {
  if (!plan.start_date || !plan.end_date) return false;
  return plan.start_date <= today && today <= plan.end_date;
};

const getTodayDayIndex = () => {
  const jsDay = new Date().getDay(); // 0:Sunday ... 6:Saturday
  return jsDay === 0 ? 7 : jsDay; // 1..7 (Mon..Sun varsayımı)
};

export async function fetchTodayDailyPlanAction(): Promise<DailyPlanResponse> {
  const weeklyPlans = await getWeeklyPlans();
  if (!weeklyPlans.length) {
    throw new Error('Henüz haftalık plan bulunamadı.');
  }

  const today = getLocalDateKey();
  const weekly =
    weeklyPlans.find(plan => isTodayInRange(plan, today)) ??
    weeklyPlans.find(plan => plan.status.toLowerCase() === 'active') ??
    weeklyPlans[0];

  const dailyPlans = await getDailyPlans(weekly.id);
  if (!dailyPlans.length) {
    throw new Error('Bu haftada günlük plan bulunamadı.');
  }

  const todayByDate = dailyPlans.find(day => day.planned_date === today);
  if (todayByDate) return todayByDate;

  const todayIndex = getTodayDayIndex();
  const todayByIndex = dailyPlans.find(day => day.day_index === todayIndex);
  if (todayByIndex) return todayByIndex;

  return dailyPlans[0];
}
