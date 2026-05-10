import { createWeeklyPlan, getWeeklyPlans } from '../../services/plan';

function toISODate(date: Date) {
  return date.toISOString().split('T')[0];
}

export async function fetchWeeklyPlansAction() {
  return getWeeklyPlans();
}

export async function createStarterWeeklyPlanAction() {
  const start = new Date();
  const end = new Date(start);
  end.setDate(start.getDate() + 6);

  return createWeeklyPlan({
    title: 'Haftalık Başlangıç Planı',
    goal: 'Dengeli fitness rutini',
    notes: 'Mobil uygulamadan oluşturulan başlangıç planı.',
    start_date: toISODate(start),
    end_date: toISODate(end),
  });
}
