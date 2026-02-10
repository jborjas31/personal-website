import type { SimulationState, SimulationMetrics } from "./types";

export function calculateMetrics(state: SimulationState): SimulationMetrics {
  // Throughput: completed items in last 60s, expressed as units/min
  const windowSeconds = Math.min(state.elapsed, 60);
  const throughput =
    windowSeconds > 0
      ? (state.completionTimestamps.length / windowSeconds) * 60
      : 0;

  // WIP: items currently in buffers + items being processed
  const wipInBuffers = state.buffers.reduce((sum, b) => sum + b.items.length, 0);
  const wipInStations = state.stations.filter((s) => s.itemInProcess).length;
  const wip = wipInBuffers + wipInStations;

  // Average cycle time: from last 20 completed items
  const recentItems = state.completedItems.slice(-20);
  const avgCycleTime =
    recentItems.length > 0
      ? recentItems.reduce((sum, item) => {
          const ct = ((item.completedAt ?? item.createdAt) - item.createdAt) * 0.1; // ticks to seconds
          return sum + ct;
        }, 0) / recentItems.length
      : 0;

  // Per-station metrics
  const perStation = state.stations.map((station, i) => ({
    id: station.config.id,
    utilization: state.tick > 0 ? state.stationBusyTicks[i] / state.tick : 0,
    itemsProcessed: state.stationProcessedCounts[i],
  }));

  // Line efficiency: average utilization across stations
  const lineEfficiency =
    perStation.length > 0
      ? perStation.reduce((sum, s) => sum + s.utilization, 0) / perStation.length
      : 0;

  // First pass yield
  const totalCompleted = state.completedItems.length + state.defectiveItems.length;
  const fpy = totalCompleted > 0 ? state.completedItems.length / totalCompleted : 1;

  // Little's Law: L = lambda * W
  const lambda = throughput / 60; // items per second
  const littlesLaw = {
    L: wip,
    lambda,
    W: avgCycleTime,
  };

  // Throughput history (sampled every ~1s)
  const throughputHistory: number[] = [];
  const completionTimestamps = [...state.completionTimestamps].sort((a, b) => a - b);
  if (state.elapsed > 0) {
    const bucketSize = 5; // 5-second buckets
    const startTime = Math.max(0, state.elapsed - 60);
    for (let t = startTime; t < state.elapsed; t += bucketSize) {
      const count = completionTimestamps.filter(
        (ts) => ts > t && ts <= t + bucketSize
      ).length;
      throughputHistory.push((count / bucketSize) * 60);
    }
  }

  return {
    throughput,
    wip,
    avgCycleTime,
    lineEfficiency,
    fpy,
    perStation,
    littlesLaw,
    throughputHistory,
  };
}
