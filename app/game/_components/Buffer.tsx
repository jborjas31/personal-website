"use client";

import { memo } from "react";
import type { BufferState } from "../_engine/types";
import { ItemDot } from "./Item";

interface BufferProps {
  buffer: BufferState;
  label?: string;
}

const MAX_VISIBLE = 8;

export const Buffer = memo(function Buffer({ buffer, label }: BufferProps) {
  const fillRatio = buffer.items.length / buffer.config.capacity;
  const isNearFull = fillRatio >= 0.8;
  const visibleItems = buffer.items.slice(0, MAX_VISIBLE);
  const overflow = buffer.items.length - MAX_VISIBLE;

  return (
    <div
      className={`flex flex-col items-center gap-1 min-w-[40px] rounded-md border p-1.5 transition-colors duration-200 ${
        isNearFull
          ? "border-[var(--color-blocked,#d4a017)] bg-[#fdf8e8]"
          : "border-[var(--color-border)] bg-[var(--color-bg)]"
      }`}
    >
      {label && (
        <div className="text-[9px] text-[var(--color-fg-tertiary)] font-medium uppercase tracking-wider">
          {label}
        </div>
      )}
      <div className="flex flex-col-reverse gap-0.5 items-center min-h-[20px]">
        {visibleItems.map((item) => (
          <ItemDot key={item.id} item={item} />
        ))}
      </div>
      {overflow > 0 && (
        <div className="text-[9px] text-[var(--color-fg-tertiary)] font-medium">
          +{overflow}
        </div>
      )}
      <div className="text-[9px] text-[var(--color-fg-tertiary)]">
        {buffer.items.length}/{buffer.config.capacity}
      </div>
    </div>
  );
});
