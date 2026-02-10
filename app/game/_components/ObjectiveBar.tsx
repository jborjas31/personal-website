"use client";

import { memo } from "react";
import type { ObjectiveConfig } from "../_engine/types";
import type { ObjectiveProgress } from "../_levels/objectives";

interface ObjectiveBarProps {
  objective: ObjectiveConfig;
  progress: ObjectiveProgress;
}

export const ObjectiveBar = memo(function ObjectiveBar({
  objective,
  progress,
}: ObjectiveBarProps) {
  return (
    <div
      className={`rounded-lg px-4 py-2 border transition-colors duration-300 ${
        progress.isComplete
          ? "bg-[var(--color-accent-light)] border-[var(--color-accent)]"
          : progress.isMet
          ? "bg-[#f0faf3] border-[var(--color-accent)]"
          : "bg-[var(--color-bg-card)] border-[var(--color-border)]"
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-fg-tertiary)]">
            Objective
          </span>
          <div className="text-sm font-medium text-[var(--color-fg)]">
            {objective.description}
          </div>
        </div>
        <div className="text-right shrink-0">
          {progress.isComplete ? (
            <span className="text-sm font-bold text-[var(--color-accent)]">
              Complete!
            </span>
          ) : progress.isMet ? (
            <span className="text-xs text-[var(--color-accent)]">
              Sustain for {Math.ceil(objective.sustainDuration - progress.sustainedFor)}s more...
            </span>
          ) : (
            <span className="text-xs text-[var(--color-fg-tertiary)]">Not yet</span>
          )}
        </div>
      </div>
    </div>
  );
});
