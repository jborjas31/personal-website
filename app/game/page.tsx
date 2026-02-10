"use client";

import Link from "next/link";
import { levels } from "./_levels/levels";

export default function GamePage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--color-fg-tertiary)] mb-2">
        Interactive Simulation
      </div>
      <h1 className="font-serif text-2xl font-normal text-[var(--color-fg)] mb-2">
        Assembly Line
      </h1>
      <p className="text-sm text-[var(--color-fg-secondary)] leading-relaxed mb-8">
        Learn industrial engineering concepts — bottleneck identification, throughput
        optimization, cycle time, and line balancing — through hands-on gameplay.
      </p>

      <div className="grid gap-4">
        {levels.map((level) => (
          <Link
            key={level.id}
            href={`/game/play/${level.id}`}
            className="block bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-lg p-5 hover:border-[#ccc] hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:-translate-y-[1px] transition-all duration-200"
          >
            <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-accent)] mb-1">
              {level.concept}
            </div>
            <h2 className="font-serif text-lg font-normal text-[var(--color-fg)] mb-1">
              {level.title}
            </h2>
            <p className="text-sm text-[var(--color-fg-secondary)] leading-relaxed">
              {level.objective.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
