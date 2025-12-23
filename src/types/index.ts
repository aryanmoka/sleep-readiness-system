export interface TrainingInput {
  sleep_quality: number;
  fatigue_level: number;
  stress_level: number;
  caffeine_intake: number;
}

export interface TrainingOutput {
  readiness_score: number;
  recommendation: "Train Normally" | "Light Training" | "Rest / Active Recovery";
  recommendation_category: "ready" | "caution" | "rest";
  interpretation: string;
}

export interface InputConfig {
  label: string;
  key: keyof TrainingInput;
  min: number;
  max: number;
  step: number;
  description: string;
  unit?: string;
}
