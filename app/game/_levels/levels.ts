import type { LevelConfig } from "../_engine/types";

export const levels: LevelConfig[] = [
  {
    id: "1",
    title: "Level 1: One Station",
    concept: "Throughput & Cycle Time",
    introText:
      "Welcome to the factory floor! You have a single station producing widgets. Your job: adjust the station's cycle time to hit the target throughput. Faster cycle time = more output per minute.",
    stations: [
      {
        id: "station-1",
        name: "Station A",
        baseCycleTime: 10,
        minCycleTime: 3,
        maxCycleTime: 15,
        defectRate: 0,
      },
    ],
    buffers: [
      { id: "input-1", capacity: 20 },
      { id: "output-1", capacity: 20 },
    ],
    inputRate: 1, // 1 item per second into the first buffer
    availableControls: {
      stationSpeed: true,
      bufferSize: false,
      addStation: false,
    },
    objective: {
      description: "Reach 12 units/min throughput",
      check: (metrics) => metrics.throughput >= 12,
      sustainDuration: 10,
    },
    hints: [
      "Try reducing the cycle time — a faster station means more output.",
      "At 5 seconds per item, you get 12 items per minute.",
      "Drag the cycle time slider to the left to speed up the station.",
    ],
    completionText:
      "Nice work! You learned that throughput = 60 / cycle time. A single station's output is directly determined by how fast it processes each item.",
  },
  {
    id: "2",
    title: "Level 2: The Bottleneck",
    concept: "Bottleneck Identification & Line Balancing",
    introText:
      "Now you have 4 stations in series. One of them is slower than the rest — it's the bottleneck. The entire line can only go as fast as its slowest station. Find it and speed it up!",
    stations: [
      {
        id: "station-1",
        name: "Cut",
        baseCycleTime: 6,
        minCycleTime: 3,
        maxCycleTime: 15,
        defectRate: 0,
      },
      {
        id: "station-2",
        name: "Shape",
        baseCycleTime: 6,
        minCycleTime: 3,
        maxCycleTime: 15,
        defectRate: 0,
      },
      {
        id: "station-3",
        name: "Assemble",
        baseCycleTime: 12,
        minCycleTime: 3,
        maxCycleTime: 15,
        defectRate: 0,
      },
      {
        id: "station-4",
        name: "Inspect",
        baseCycleTime: 6,
        minCycleTime: 3,
        maxCycleTime: 15,
        defectRate: 0,
      },
    ],
    buffers: [
      { id: "buf-0", capacity: 10 },
      { id: "buf-1", capacity: 10 },
      { id: "buf-2", capacity: 10 },
      { id: "buf-3", capacity: 10 },
      { id: "buf-4", capacity: 10 },
    ],
    inputRate: 1,
    availableControls: {
      stationSpeed: true,
      bufferSize: false,
      addStation: false,
    },
    objective: {
      description: "Reach 8 units/min throughput",
      check: (metrics) => metrics.throughput >= 8,
      sustainDuration: 10,
    },
    hints: [
      "Watch where items pile up — that's right before the bottleneck.",
      "Station 3 (Assemble) has a 12s cycle time while others have 6s. It's the slowest.",
      "Speed up the Assemble station to around 7.5s to unblock the line.",
    ],
    completionText:
      "You found the bottleneck! The line's throughput is limited by its slowest station. In real factories, identifying and improving the bottleneck is the #1 way to increase output.",
  },
];

export function getLevelConfig(id: string): LevelConfig | undefined {
  return levels.find((l) => l.id === id);
}
