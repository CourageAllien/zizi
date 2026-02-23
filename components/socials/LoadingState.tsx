"use client";

import { Sparkles } from "lucide-react";

export default function LoadingState() {
  return (
    <div className="relative">
      {/* Subtle glow */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--color-primary)]/20 via-[var(--color-accent)]/20 to-[var(--color-primary)]/20 rounded-2xl blur-sm opacity-60 animate-pulse" />

      <div className="relative bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-2xl overflow-hidden">
        {/* Header skeleton */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-3">
            <div className="w-20 h-6 bg-[var(--color-bg-tertiary)] rounded-full animate-pulse" />
            <div className="w-16 h-4 bg-[var(--color-bg-tertiary)] rounded animate-pulse" />
          </div>
          <div className="w-24 h-4 bg-[var(--color-bg-tertiary)] rounded animate-pulse" />
        </div>

        {/* Content area */}
        <div className="p-8 flex flex-col items-center justify-center min-h-[200px]">
          <div className="relative mb-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-accent)]/20 flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-[var(--color-primary)] animate-pulse" />
            </div>
            {/* Spinning ring */}
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[var(--color-primary)] animate-spin" />
          </div>
          
          <p className="text-[var(--color-text-secondary)] text-sm mb-2">
            Crafting your content...
          </p>
          
          <p className="text-[var(--color-text-muted)] text-xs">
            This usually takes a few seconds
          </p>

          {/* Skeleton lines */}
          <div className="w-full mt-8 space-y-3">
            <div className="w-full h-4 bg-[var(--color-bg-tertiary)] rounded animate-pulse" />
            <div className="w-5/6 h-4 bg-[var(--color-bg-tertiary)] rounded animate-pulse" />
            <div className="w-4/6 h-4 bg-[var(--color-bg-tertiary)] rounded animate-pulse" />
            <div className="w-3/4 h-4 bg-[var(--color-bg-tertiary)] rounded animate-pulse" />
          </div>
        </div>

        {/* Footer skeleton */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-[var(--color-border)] bg-[var(--color-bg-tertiary)]/50">
          <div className="flex gap-2">
            <div className="w-20 h-9 bg-[var(--color-bg-primary)] rounded-lg animate-pulse" />
            <div className="w-28 h-9 bg-[var(--color-bg-primary)] rounded-lg animate-pulse" />
          </div>
          <div className="w-16 h-4 bg-[var(--color-bg-primary)] rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}

