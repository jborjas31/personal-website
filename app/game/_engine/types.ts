// ── Station ──
export interface StationConfig {
  id: string;
  name: string;
  baseCycleTime: number; // seconds per item
  minCycleTime: number;
  maxCycleTime: number;
  defectRate: number; // 0-1
}

export interface StationState {
  config: StationConfig;
  cycleTime: number; // current (player-adjustable)
  progress: number; // 0 → cycleTime (seconds elapsed)
  status: "idle" | "processing" | "blocked" | "starved";
  itemInProcess: Item | null;
}

// ── Buffer ──
export interface BufferConfig {
  id: string;
  capacity: number;
}

export interface BufferState {
  config: BufferConfig;
  items: Item[];
}

// ── Item ──
export interface Item {
  id: number;
  createdAt: number; // simulation tick when created
  completedAt?: number;
  isDefective: boolean;
}

// ── Metrics ──
export interface SimulationMetrics {
  throughput: number; // units per minute (rolling window)
  wip: number;
  avgCycleTime: number; // seconds
  lineEfficiency: number; // 0-1
  fpy: number; // first pass yield 0-1
  perStation: StationMetrics[];
  littlesLaw: { L: number; lambda: number; W: number };
  throughputHistory: number[];
}

export interface StationMetrics {
  id: string;
  utilization: number; // 0-1
  itemsProcessed: number;
}

// ── Objective ──
export interface ObjectiveConfig {
  description: string;
  check: (metrics: SimulationMetrics) => boolean;
  sustainDuration: number; // seconds the objective must be sustained
}

// ── Level ──
export interface LevelConfig {
  id: string;
  title: string;
  concept: string;
  introText: string;
  stations: StationConfig[];
  buffers: BufferConfig[];
  inputRate: number; // items per second fed into first buffer
  availableControls: AvailableControls;
  objective: ObjectiveConfig;
  hints: string[];
  completionText: string;
}

export interface AvailableControls {
  stationSpeed: boolean;
  bufferSize: boolean;
  addStation: boolean;
}

// ── Simulation State ──
export interface SimulationState {
  tick: number; // total ticks elapsed
  elapsed: number; // total seconds elapsed
  stations: StationState[];
  buffers: BufferState[]; // buffers[0] = input of station[0], buffers[n] = output of station[n-1]
  completedItems: Item[];
  defectiveItems: Item[];
  nextItemId: number;
  inputAccumulator: number; // fractional item accumulation for input
  speed: number; // 1, 2, or 4
  paused: boolean;
  ticksPerSecond: number;
  // rolling window for throughput
  completionTimestamps: number[];
  // per-station tracking
  stationProcessedCounts: number[];
  stationBusyTicks: number[];
}

// ── Actions ──
export type SimAction =
  | { type: "TICK" }
  | { type: "SET_STATION_CYCLE_TIME"; stationIndex: number; cycleTime: number }
  | { type: "SET_SPEED"; speed: number }
  | { type: "PAUSE" }
  | { type: "RESUME" }
  | { type: "RESET" }
  | { type: "SET_BUFFER_SIZE"; bufferIndex: number; capacity: number };
