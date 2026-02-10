"use client";

import { memo } from "react";
import { LayoutGroup } from "framer-motion";
import type { SimulationState, SimulationMetrics } from "../_engine/types";
import { Station } from "./Station";
import { Buffer } from "./Buffer";

interface AssemblyLineProps {
  state: SimulationState;
  metrics: SimulationMetrics;
}

export const AssemblyLine = memo(function AssemblyLine({
  state,
  metrics,
}: AssemblyLineProps) {
  return (
    <LayoutGroup>
      <div className="overflow-x-auto pb-2">
        <div className="flex items-center gap-2 min-w-min px-2 py-4">
          {state.stations.map((station, i) => {
            const stationMetrics = metrics.perStation[i];
            return (
              <div key={station.config.id} className="flex items-center gap-2">
                {/* Input buffer for this station */}
                <Buffer
                  buffer={state.buffers[i]}
                  label={i === 0 ? "In" : undefined}
                />
                {/* Arrow */}
                <div className="text-[var(--color-fg-tertiary)] text-sm select-none">
                  &rarr;
                </div>
                {/* Station */}
                <Station
                  station={station}
                  utilization={stationMetrics?.utilization ?? 0}
                />
                {/* Arrow */}
                <div className="text-[var(--color-fg-tertiary)] text-sm select-none">
                  &rarr;
                </div>
                {/* Output buffer (only for last station) */}
                {i === state.stations.length - 1 && (
                  <Buffer buffer={state.buffers[i + 1]} label="Out" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </LayoutGroup>
  );
});
