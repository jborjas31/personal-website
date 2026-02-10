"use client";

import { useParams } from "next/navigation";
import { getLevelConfig } from "../../_levels/levels";
import GameClient from "./GameClient";
import Link from "next/link";

export default function PlayLevelPage() {
  const params = useParams();
  const levelId = params.level as string;
  const levelConfig = getLevelConfig(levelId);

  if (!levelConfig) {
    return (
      <div className="max-w-md mx-auto px-4 py-12 text-center">
        <h1 className="font-serif text-xl text-[var(--color-fg)] mb-2">
          Level not found
        </h1>
        <p className="text-sm text-[var(--color-fg-secondary)] mb-4">
          Level &quot;{levelId}&quot; doesn&apos;t exist.
        </p>
        <Link
          href="/game"
          className="text-sm text-[var(--color-accent)] hover:underline"
        >
          Back to level select
        </Link>
      </div>
    );
  }

  return <GameClient key={levelId} levelConfig={levelConfig} />;
}
