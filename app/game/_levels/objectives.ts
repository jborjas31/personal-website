import type { SimulationMetrics, ObjectiveConfig } from "../_engine/types";

export interface ObjectiveProgress {
  isMet: boolean;
  sustainedFor: number; // seconds
  isComplete: boolean;
}

export function checkObjective(
  metrics: SimulationMetrics,
  objective: ObjectiveConfig,
  prevProgress: ObjectiveProgress,
  dt: number // seconds since last check
): ObjectiveProgress {
  const isMet = objective.check(metrics);

  if (!isMet) {
    return { isMet: false, sustainedFor: 0, isComplete: false };
  }

  const sustainedFor = prevProgress.isMet ? prevProgress.sustainedFor + dt : dt;
  const isComplete = sustainedFor >= objective.sustainDuration;

  return { isMet, sustainedFor, isComplete };
}

export const initialProgress: ObjectiveProgress = {
  isMet: false,
  sustainedFor: 0,
  isComplete: false,
};
