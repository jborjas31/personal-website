"use client";

import { memo } from "react";
import type { SimulationMetrics } from "../_engine/types";
import { AnimatedNumber } from "./AnimatedNumber";
import { Sparkline } from "./Sparkline";
import { formatPercent } from "../_utils/formatters";

interface MetricsDashboardProps {
  metrics: SimulationMetrics;
  elapsed: number;
}

export const MetricsDashboard = memo(function MetricsDashboard({
  metrics,
  elapsed,
}: MetricsDashboardProps) {
  return (
    <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-lg p-4">
      <div className="text-xs font-bold uppercase tracking-wider text-[var(--color-fg-tertiary)] mb-3">
        Metrics
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
        <MetricCard
          label="Throughput"
          value={<AnimatedNumber value={metrics.throughput} suffix=" /min" />}
          sub={<Sparkline data={metrics.throughputHistory} />}
        />
        <MetricCard
          label="WIP"
          value={<AnimatedNumber value={metrics.wip} decimals={0} suffix=" items" />}
        />
        <MetricCard
          label="Avg Cycle Time"
          value={<AnimatedNumber value={metrics.avgCycleTime} suffix="s" />}
        />
        <MetricCard
          label="Line Efficiency"
          value={
            <span className="text-lg font-semibold text-[var(--color-fg)]">
              {formatPercent(metrics.lineEfficiency)}
            </span>
          }
        />
      </div>

      {/* Per-station utilization */}
      {metrics.perStation.length > 1 && (
        <div className="mb-4">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-fg-tertiary)] mb-2">
            Station Utilization
          </div>
          <div className="flex gap-2">
            {metrics.perStation.map((s) => (
              <div key={s.id} className="flex-1">
                <div className="h-2 bg-[var(--color-border)] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[var(--color-accent)] rounded-full transition-all duration-300"
                    style={{ width: `${s.utilization * 100}%` }}
                  />
                </div>
                <div className="text-[9px] text-center text-[var(--color-fg-tertiary)] mt-0.5">
                  {formatPercent(s.utilization)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Little's Law */}
      {elapsed > 5 && (
        <div className="text-xs text-[var(--color-fg-tertiary)] border-t border-[var(--color-border)] pt-2">
          <span className="font-medium">Little&apos;s Law:</span>{" "}
          L = &lambda; &times; W &rarr; {metrics.littlesLaw.L.toFixed(1)} &asymp;{" "}
          {metrics.littlesLaw.lambda.toFixed(2)} &times;{" "}
          {metrics.littlesLaw.W.toFixed(1)} ={" "}
          {(metrics.littlesLaw.lambda * metrics.littlesLaw.W).toFixed(1)}
        </div>
      )}
    </div>
  );
});

function MetricCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: React.ReactNode;
  sub?: React.ReactNode;
}) {
  return (
    <div>
      <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-fg-tertiary)] mb-1">
        {label}
      </div>
      <div className="text-lg font-semibold text-[var(--color-fg)]">{value}</div>
      {sub && <div className="mt-1">{sub}</div>}
    </div>
  );
}
