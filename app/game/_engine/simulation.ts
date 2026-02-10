import type { LevelConfig, SimulationState, Item, StationState, BufferState } from "./types";

const TICK_DURATION = 0.1; // each tick = 0.1 seconds of simulation time

export function createInitialState(config: LevelConfig): SimulationState {
  const stations: StationState[] = config.stations.map((sc) => ({
    config: sc,
    cycleTime: sc.baseCycleTime,
    progress: 0,
    status: "idle" as const,
    itemInProcess: null,
  }));

  const buffers: BufferState[] = config.buffers.map((bc) => ({
    config: bc,
    items: [],
  }));

  return {
    tick: 0,
    elapsed: 0,
    stations,
    buffers,
    completedItems: [],
    defectiveItems: [],
    nextItemId: 1,
    inputAccumulator: 0,
    speed: 1,
    paused: true,
    ticksPerSecond: 10,
    completionTimestamps: [],
    stationProcessedCounts: config.stations.map(() => 0),
    stationBusyTicks: config.stations.map(() => 0),
  };
}

export function tick(state: SimulationState, config: LevelConfig): SimulationState {
  if (state.paused) return state;

  const s = structuredClone(state) as SimulationState;
  s.tick += 1;
  s.elapsed += TICK_DURATION;

  // 1. Feed items into the first buffer based on inputRate
  s.inputAccumulator += config.inputRate * TICK_DURATION;
  while (s.inputAccumulator >= 1) {
    if (s.buffers[0].items.length < s.buffers[0].config.capacity) {
      const item: Item = {
        id: s.nextItemId++,
        createdAt: s.tick,
        isDefective: false,
      };
      s.buffers[0].items.push(item);
    }
    s.inputAccumulator -= 1;
  }

  // 2. Process stations RIGHT-TO-LEFT (downstream first to prevent multi-hop)
  for (let i = s.stations.length - 1; i >= 0; i--) {
    const station = s.stations[i];
    const inputBuffer = s.buffers[i];
    const outputBuffer = s.buffers[i + 1];

    // If station has an item being processed
    if (station.itemInProcess) {
      station.progress += TICK_DURATION;
      s.stationBusyTicks[i] += 1;

      // Check if processing is complete
      if (station.progress >= station.cycleTime) {
        const item = station.itemInProcess;

        // Defect check
        if (Math.random() < station.config.defectRate) {
          item.isDefective = true;
        }

        // Try to push to output buffer
        if (outputBuffer.items.length < outputBuffer.config.capacity) {
          item.completedAt = s.tick;
          outputBuffer.items.push(item);
          station.itemInProcess = null;
          station.progress = 0;
          s.stationProcessedCounts[i] += 1;

          // If this is the last station, track completion
          if (i === s.stations.length - 1) {
            if (item.isDefective) {
              s.defectiveItems.push(item);
            } else {
              s.completedItems.push(item);
              s.completionTimestamps.push(s.elapsed);
            }
          }
        } else {
          // Output full — blocked
          station.status = "blocked";
          station.progress = station.cycleTime; // cap at cycle time
        }
      } else {
        station.status = "processing";
      }
    }

    // If station is idle or just finished, try to pull from input buffer
    if (!station.itemInProcess) {
      if (inputBuffer.items.length > 0) {
        station.itemInProcess = inputBuffer.items.shift()!;
        station.progress = 0;
        station.status = "processing";
        s.stationBusyTicks[i] += 1;
      } else {
        station.status = "starved";
      }
    }
  }

  // 3. Clean old completion timestamps (keep 60s rolling window)
  const windowStart = s.elapsed - 60;
  s.completionTimestamps = s.completionTimestamps.filter((t) => t > windowStart);

  return s;
}
