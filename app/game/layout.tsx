import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Assembly Line — Interactive Simulation",
  description: "Learn industrial engineering concepts through hands-on gameplay.",
};

export default function GameLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <nav className="border-b border-[var(--color-border)] bg-[var(--color-bg)]/80 backdrop-blur-sm sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 h-12 flex items-center justify-between">
          <Link
            href="/game"
            className="text-sm font-semibold text-[var(--color-fg)] hover:text-[var(--color-accent)] transition-colors"
          >
            Assembly Line
          </Link>
          <Link
            href="/"
            className="text-xs text-[var(--color-fg-tertiary)] hover:text-[var(--color-fg-secondary)] transition-colors"
          >
            &larr; Back to Portfolio
          </Link>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
}
