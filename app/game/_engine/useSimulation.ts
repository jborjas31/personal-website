"use client";

import { useReducer, useEffect, useRef, useCallback } from "react";
import type { LevelConfig, SimulationState, SimAction } from "./types";
import { createInitialState, tick } from "./simulation";

type ConfigAction = SimAction | { type: "SET_CONFIG"; config: LevelConfig };

function reducer(
  state: SimulationState & { _config: LevelConfig },
  action: ConfigAction
): SimulationState & { _config: LevelConfig } {
  if (action.type === "SET_CONFIG") {
    return { ...state, _config: action.config };
  }

  const config = state._config;
  switch (action.type) {
    case "TICK": {
      // Extract _config before tick (tick only gets SimulationState)
      const { _config, ...simState } = state;
      return { ...tick(simState, config), _config };
    }

    case "SET_STATION_CYCLE_TIME": {
      const stations = [...state.stations];
      const station = { ...stations[action.stationIndex] };
      station.cycleTime = Math.max(
        station.config.minCycleTime,
        Math.min(station.config.maxCycleTime, action.cycleTime)
      );
      stations[action.stationIndex] = station;
      return { ...state, stations };
    }

    case "SET_SPEED":
      return { ...state, speed: action.speed };

    case "PAUSE":
      return { ...state, paused: true };

    case "RESUME":
      return { ...state, paused: false };

    case "RESET": {
      return { ...createInitialState(config), _config: config };
    }

    case "SET_BUFFER_SIZE": {
      const buffers = [...state.buffers];
      const buffer = { ...buffers[action.bufferIndex] };
      buffer.config = { ...buffer.config, capacity: action.capacity };
      buffer.items = buffer.items.slice(0, action.capacity);
      buffers[action.bufferIndex] = buffer;
      return { ...state, buffers };
    }

    default:
      return state;
  }
}

function initState(config: LevelConfig): SimulationState & { _config: LevelConfig } {
  return { ...createInitialState(config), _config: config };
}

export function useSimulation(config: LevelConfig) {
  const [fullState, dispatch] = useReducer(reducer, config, initState);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _config, ...state } = fullState;

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    if (!state.paused) {
      const ms = 100 / state.speed;
      intervalRef.current = setInterval(() => {
        dispatch({ type: "TICK" });
      }, ms);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [state.paused, state.speed]);

  const actions = {
    pause: useCallback(() => dispatch({ type: "PAUSE" }), []),
    resume: useCallback(() => dispatch({ type: "RESUME" }), []),
    reset: useCallback(() => dispatch({ type: "RESET" }), []),
    setSpeed: useCallback(
      (speed: number) => dispatch({ type: "SET_SPEED", speed }),
      []
    ),
    setStationCycleTime: useCallback(
      (stationIndex: number, cycleTime: number) =>
        dispatch({ type: "SET_STATION_CYCLE_TIME", stationIndex, cycleTime }),
      []
    ),
    setBufferSize: useCallback(
      (bufferIndex: number, capacity: number) =>
        dispatch({ type: "SET_BUFFER_SIZE", bufferIndex, capacity }),
      []
    ),
  };

  return { state: state as SimulationState, actions };
}
