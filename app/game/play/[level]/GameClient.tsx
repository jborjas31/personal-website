"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import type { LevelConfig } from "../../_engine/types";
import { useSimulation } from "../../_engine/useSimulation";
import { calculateMetrics } from "../../_engine/metrics";
import { checkObjective, initialProgress } from "../../_levels/objectives";
import type { ObjectiveProgress } from "../../_levels/objectives";
import { levels } from "../../_levels/levels";
import { AssemblyLine } from "../../_components/AssemblyLine";
import { MetricsDashboard } from "../../_components/MetricsDashboard";
import { ControlsPanel } from "../../_components/ControlsPanel";
import { ObjectiveBar } from "../../_components/ObjectiveBar";
import { LevelIntro } from "../../_components/LevelIntro";
import { LevelComplete } from "../../_components/LevelComplete";
import { HintPopup } from "../../_components/HintPopup";

interface GameClientProps {
  levelConfig: LevelConfig;
}

export default function GameClient({ levelConfig }: GameClientProps) {
  const router = useRouter();
  const { state, actions } = useSimulation(levelConfig);
  const metrics = useMemo(() => calculateMetrics(state), [state]);

  // Objective tracking
  const [objProgress, setObjProgress] = useState<ObjectiveProgress>(initialProgress);
  const prevTickRef = useRef(0);
  const metricsRef = useRef(metrics);
  metricsRef.current = metrics;

  useEffect(() => {
    if (state.paused || state.tick === 0) return;

    const dt = (state.tick - prevTickRef.current) * 0.1;
    prevTickRef.current = state.tick;

    setObjProgress((prev) => checkObjective(metricsRef.current, levelConfig.objective, prev, dt));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.tick]);

  // Modal states
  const [showIntro, setShowIntro] = useState(true);
  const [showComplete, setShowComplete] = useState(false);

  // Show completion modal when objective is met
  const completedRef = useRef(false);
  useEffect(() => {
    if (objProgress.isComplete && !completedRef.current) {
      completedRef.current = true;
      actions.pause();
      setShowComplete(true);
    }
  }, [objProgress.isComplete, actions]);

  // Hint system
  const [currentHint, setCurrentHint] = useState<string | null>(null);
  const hintIndexRef = useRef(0);
  const lastInteractionRef = useRef(Date.now());

  // Track user interactions
  const trackInteraction = useCallback(() => {
    lastInteractionRef.current = Date.now();
    setCurrentHint(null);
  }, []);

  useEffect(() => {
    if (state.paused || showIntro || showComplete) return;

    const interval = setInterval(() => {
      const idle = Date.now() - lastInteractionRef.current;
      if (idle > 30000 && hintIndexRef.current < levelConfig.hints.length) {
        setCurrentHint(levelConfig.hints[hintIndexRef.current]);
        hintIndexRef.current += 1;
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [state.paused, showIntro, showComplete, levelConfig.hints]);

  const handleStart = () => {
    setShowIntro(false);
    actions.resume();
    lastInteractionRef.current = Date.now();
  };

  const handleReset = () => {
    actions.reset();
    setObjProgress(initialProgress);
    completedRef.current = false;
    setShowComplete(false);
    setShowIntro(true);
    prevTickRef.current = 0;
    hintIndexRef.current = 0;
  };

  const handleNextLevel = () => {
    const currentIndex = levels.findIndex((l) => l.id === levelConfig.id);
    if (currentIndex < levels.length - 1) {
      router.push(`/game/play/${levels[currentIndex + 1].id}`);
    }
  };

  const currentIndex = levels.findIndex((l) => l.id === levelConfig.id);
  const hasNextLevel = currentIndex < levels.length - 1;

  // Wrap actions with interaction tracking
  const trackedActions = {
    ...actions,
    setStationCycleTime: (index: number, cycleTime: number) => {
      trackInteraction();
      actions.setStationCycleTime(index, cycleTime);
    },
    setSpeed: (speed: number) => {
      trackInteraction();
      actions.setSpeed(speed);
    },
    reset: handleReset,
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Objective bar */}
      <div className="mb-4">
        <ObjectiveBar objective={levelConfig.objective} progress={objProgress} />
      </div>

      {/* Assembly line visualization */}
      <div className="mb-4 bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-lg p-4">
        <div className="text-xs font-bold uppercase tracking-wider text-[var(--color-fg-tertiary)] mb-2">
          Assembly Line
        </div>
        <AssemblyLine state={state} metrics={metrics} />
      </div>

      {/* Controls and Metrics side by side on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ControlsPanel
          state={state}
          availableControls={levelConfig.availableControls}
          actions={trackedActions}
        />
        <MetricsDashboard metrics={metrics} elapsed={state.elapsed} />
      </div>

      {/* Modals */}
      {showIntro && <LevelIntro level={levelConfig} onStart={handleStart} />}
      {showComplete && (
        <LevelComplete
          level={levelConfig}
          metrics={metrics}
          elapsed={state.elapsed}
          hasNextLevel={hasNextLevel}
          onNextLevel={handleNextLevel}
          onReplay={handleReset}
        />
      )}
      {currentHint && !showIntro && !showComplete && (
        <HintPopup hint={currentHint} onDismiss={() => setCurrentHint(null)} />
      )}
    </div>
  );
}
