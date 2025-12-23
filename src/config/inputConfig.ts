import { InputConfig } from '../types';

export const inputConfigs: InputConfig[] = [
  {
    label: "Sleep Quality",
    key: "sleep_quality",
    min: 1,
    max: 5,
    step: 0.5,
    description: "Rate your sleep quality from poor (1) to excellent (5)",
    unit: "/5"
  },
  {
    label: "Fatigue Level",
    key: "fatigue_level",
    min: 1,
    max: 10,
    step: 1,
    description: "Rate your current fatigue from minimal (1) to extreme (10)",
    unit: "/10"
  },
  {
    label: "Stress Level",
    key: "stress_level",
    min: 1,
    max: 5,
    step: 0.5,
    description: "Rate your stress level from low (1) to very high (5)",
    unit: "/5"
  },
  {
    label: "Caffeine Intake",
    key: "caffeine_intake",
    min: 0,
    max: 3,
    step: 1,
    description: "Today's caffeine consumption (0=none, 1=low, 2=moderate, 3=high)",
    unit: "/3"
  }
];
