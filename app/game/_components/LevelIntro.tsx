"use client";

import type { LevelConfig } from "../_engine/types";

interface LevelIntroProps {
  level: LevelConfig;
  onStart: () => void;
}

export function LevelIntro({ level, onStart }: LevelIntroProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-[var(--color-bg-card)] rounded-xl shadow-xl max-w-md w-full p-6">
        <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-accent)] mb-1">
          {level.concept}
        </div>
        <h2 className="font-serif text-xl font-normal text-[var(--color-fg)] mb-3">
          {level.title}
        </h2>
        <p className="text-sm text-[var(--color-fg-secondary)] leading-relaxed mb-4">
          {level.introText}
        </p>
        <div className="bg-[var(--color-accent-light)] rounded-md px-3 py-2 mb-5">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-accent)] mb-0.5">
            Objective
          </div>
          <div className="text-sm text-[var(--color-fg)]">
            {level.objective.description} (sustain for {level.objective.sustainDuration}s)
          </div>
        </div>
        <button
          onClick={onStart}
          className="w-full py-2.5 rounded-md bg-[var(--color-accent)] text-white font-medium text-sm hover:opacity-90 transition-opacity"
        >
          Start Level
        </button>
      </div>
    </div>
  );
}
