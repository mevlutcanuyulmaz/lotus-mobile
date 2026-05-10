export interface SafetyIssueItem {
  code: string;
  severity: string;
  message: string;
  recommendation: string;
  plan_exercise_id: number;
  exercise_id?: number | null;
  exercise_name?: string | null;
}

export interface PlanValidateResponse {
  weekly_plan_id: number;
  risk_level: string;
  issue_count: number;
  issues: SafetyIssueItem[];
}
