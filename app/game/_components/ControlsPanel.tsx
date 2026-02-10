"use client";

import { memo } from "react";
import type { SimulationState, AvailableControls } from "../_engine/types";

interface ControlsPanelProps {
  state: SimulationState;
  availableControls: AvailableControls;
  actions: {
    pause: () => void;
    resume: () => void;
    reset: () => void;
    setSpeed: (speed: number) => void;
    setStationCycleTime: (index: number, cycleTime: number) => void;
  };
}

const speeds = [1, 2, 4];

export const ControlsPanel = memo(function ControlsPanel({
  state,
  availableControls,
  actions,
}: ControlsPanelProps) {
  return (
    <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-lg p-4">
      <div className="text-xs font-bold uppercase tracking-wider text-[var(--color-fg-tertiary)] mb-3">
        Controls
      </div>

      {/* Play/Pause, Reset, Speed */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <button
          onClick={state.paused ? actions.resume : actions.pause}
          className="px-3 py-1.5 rounded-md bg-[var(--color-accent)] text-white text-sm font-medium hover:opacity-90 transition-opacity"
        >
          {state.paused ? "Play" : "Pause"}
        </button>
        <button
          onClick={actions.reset}
          className="px-3 py-1.5 rounded-md border border-[var(--color-border)] text-sm font-medium text-[var(--color-fg-secondary)] hover:bg-[var(--color-bg)] transition-colors"
        >
          Reset
        </button>
        <div className="flex items-center gap-1 ml-auto">
          <span className="text-[10px] text-[var(--color-fg-tertiary)] uppercase font-bold tracking-wider mr-1">
            Speed
          </span>
          {speeds.map((s) => (
            <button
              key={s}
              onClick={() => actions.setSpeed(s)}
              className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                state.speed === s
                  ? "bg-[var(--color-accent)] text-white"
                  : "bg-[var(--color-bg)] text-[var(--color-fg-secondary)] border border-[var(--color-border)]"
              }`}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>

      {/* Station speed sliders */}
      {availableControls.stationSpeed && (
        <div className="space-y-3">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-fg-tertiary)]">
            Station Cycle Times
          </div>
          {state.stations.map((station, i) => (
            <div key={station.config.id} className="flex items-center gap-3">
              <span className="text-xs text-[var(--color-fg-secondary)] w-20 shrink-0">
                {station.config.name}
              </span>
              <input
                type="range"
                min={station.config.minCycleTime}
                max={station.config.maxCycleTime}
                step={0.5}
                value={station.cycleTime}
                onChange={(e) =>
                  actions.setStationCycleTime(i, parseFloat(e.target.value))
                }
                className="flex-1 h-1.5 accent-[var(--color-accent)]"
              />
              <span className="text-xs text-[var(--color-fg)] font-medium w-12 text-right">
                {station.cycleTime.toFixed(1)}s
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});
