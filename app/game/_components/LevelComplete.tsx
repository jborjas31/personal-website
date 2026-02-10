"use client";

import type { LevelConfig, SimulationMetrics } from "../_engine/types";
import { formatNumber, formatPercent } from "../_utils/formatters";

interface LevelCompleteProps {
  level: LevelConfig;
  metrics: SimulationMetrics;
  elapsed: number;
  hasNextLevel: boolean;
  onNextLevel: () => void;
  onReplay: () => void;
}

export function LevelComplete({
  level,
  metrics,
  elapsed,
  hasNextLevel,
  onNextLevel,
  onReplay,
}: LevelCompleteProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-[var(--color-bg-card)] rounded-xl shadow-xl max-w-md w-full p-6">
        <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-accent)] mb-1">
          Level Complete
        </div>
        <h2 className="font-serif text-xl font-normal text-[var(--color-fg)] mb-3">
          {level.title}
        </h2>
        <p className="text-sm text-[var(--color-fg-secondary)] leading-relaxed mb-4">
          {level.completionText}
        </p>

        <div className="grid grid-cols-2 gap-3 mb-5">
          <StatBox label="Throughput" value={`${formatNumber(metrics.throughput)} /min`} />
          <StatBox label="Time" value={`${Math.floor(elapsed)}s`} />
          <StatBox label="Efficiency" value={formatPercent(metrics.lineEfficiency)} />
          <StatBox label="WIP" value={`${metrics.wip} items`} />
        </div>

        <div className="flex gap-2">
          <button
            onClick={onReplay}
            className="flex-1 py-2.5 rounded-md border border-[var(--color-border)] text-sm font-medium text-[var(--color-fg-secondary)] hover:bg-[var(--color-bg)] transition-colors"
          >
            Replay
          </button>
          {hasNextLevel && (
            <button
              onClick={onNextLevel}
              className="flex-1 py-2.5 rounded-md bg-[var(--color-accent)] text-white font-medium text-sm hover:opacity-90 transition-opacity"
            >
              Next Level
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[var(--color-bg)] rounded-md px-3 py-2">
      <div className="text-[9px] font-bold uppercase tracking-wider text-[var(--color-fg-tertiary)]">
        {label}
      </div>
      <div className="text-sm font-semibold text-[var(--color-fg)]">{value}</div>
    </div>
  );
}
