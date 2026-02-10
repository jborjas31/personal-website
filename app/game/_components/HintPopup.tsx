"use client";

import { memo } from "react";

interface HintPopupProps {
  hint: string;
  onDismiss: () => void;
}

export const HintPopup = memo(function HintPopup({ hint, onDismiss }: HintPopupProps) {
  return (
    <div className="fixed bottom-4 right-4 z-40 max-w-xs animate-[slideUp_0.3s_ease-out] bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-lg shadow-lg p-4">
      <div className="flex items-start gap-2">
        <span className="text-[var(--color-accent)] text-sm shrink-0">Hint:</span>
        <p className="text-sm text-[var(--color-fg-secondary)] leading-relaxed">
          {hint}
        </p>
      </div>
      <button
        onClick={onDismiss}
        className="mt-2 text-xs text-[var(--color-fg-tertiary)] hover:text-[var(--color-fg)] transition-colors"
      >
        Dismiss
      </button>
    </div>
  );
});
