export interface WeeklyPlanResponse {
  id: number;
  user_id: number;
  title: string;
  goal?: string | null;
  status: string;
  start_date?: string | null;
  end_date?: string | null;
  notes?: string | null;
  created_at: string;
  updated_at: string;
}

export interface DailyPlanResponse {
  id: number;
  weekly_plan_id: number;
  day_index: number;
  day_name?: string | null;
  planned_date?: string | null;
  focus_area?: string | null;
  estimated_minutes?: number | null;
  created_at: string;
}

export interface PlanExerciseResponse {
  id: number;
  daily_plan_id: number;
  exercise_id?: number | null;
  order_index: number;
  sets?: number | null;
  reps?: number | null;
  duration_seconds?: number | null;
  rest_seconds?: number | null;
  intensity_level?: string | null;
  notes?: string | null;
  created_at: string;
}
