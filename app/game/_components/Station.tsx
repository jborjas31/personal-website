"use client";

import { memo } from "react";
import type { StationState } from "../_engine/types";

interface StationProps {
  station: StationState;
  utilization: number;
}

const statusColors: Record<string, string> = {
  processing: "border-[var(--color-accent)]",
  idle: "border-[var(--color-border)]",
  starved: "border-[var(--color-starved,#bbbbbb)]",
  blocked: "border-[var(--color-blocked,#d4a017)]",
};

const statusLabels: Record<string, string> = {
  processing: "Processing",
  idle: "Idle",
  starved: "Starved",
  blocked: "Blocked",
};

export const Station = memo(function Station({ station, utilization }: StationProps) {
  const progress =
    station.itemInProcess && station.cycleTime > 0
      ? Math.min(station.progress / station.cycleTime, 1)
      : 0;

  const borderClass = statusColors[station.status] || statusColors.idle;
  const isProcessing = station.status === "processing";

  return (
    <div
      className={`bg-[var(--color-bg-card)] border-2 ${borderClass} rounded-lg p-3 min-w-[120px] transition-colors duration-200 ${
        isProcessing ? "station-pulse" : ""
      }`}
    >
      <div className="text-xs font-bold uppercase tracking-wider text-[var(--color-fg-tertiary)] mb-1">
        {station.config.name}
      </div>
      <div className="text-sm font-medium text-[var(--color-fg)]">
        {station.cycleTime.toFixed(1)}s / item
      </div>
      <div className="mt-2 h-2 bg-[var(--color-border)] rounded-full overflow-hidden">
        <div
          className="h-full bg-[var(--color-accent)] rounded-full transition-all duration-100"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
      <div className="flex justify-between items-center mt-1.5">
        <span className="text-[10px] text-[var(--color-fg-tertiary)]">
          {statusLabels[station.status]}
        </span>
        <span className="text-[10px] text-[var(--color-fg-tertiary)]">
          {(utilization * 100).toFixed(0)}%
        </span>
      </div>
    </div>
  );
});
