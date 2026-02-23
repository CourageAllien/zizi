"use client";

import { useState } from "react";
import { Copy, Check, RefreshCw, Clock, Lightbulb, ChevronDown } from "lucide-react";
import { platforms, PlatformId } from "@/lib/social-platforms";

interface GeneratedContentProps {
  content: string;
  platform: PlatformId;
  onRegenerate: () => void;
  isRegenerating?: boolean;
  timestamp?: Date;
}

export default function GeneratedContent({ 
  content, 
  platform, 
  onRegenerate, 
  isRegenerating,
  timestamp 
}: GeneratedContentProps) {
  const [copied, setCopied] = useState(false);
  const [showTips, setShowTips] = useState(false);

  const platformConfig = platforms[platform];
  const charCount = content.length;
  const charLimit = platformConfig.charLimit;
  const percentUsed = (charCount / charLimit) * 100;

  const getCharCountColor = () => {
    if (percentUsed > 100) return "text-red-400";
    if (percentUsed > 80) return "text-yellow-400";
    return "text-green-400";
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="relative">
      {/* Glow effect */}
      <div 
        className="absolute -inset-0.5 rounded-2xl opacity-30 blur-sm"
        style={{ background: `linear-gradient(135deg, ${platformConfig.color}40, transparent)` }}
      />

      <div className="relative bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-3">
            <span 
              className="px-3 py-1 rounded-full text-sm font-medium"
              style={{ backgroundColor: `${platformConfig.color}20`, color: platformConfig.color }}
            >
              {platformConfig.name}
            </span>
            {timestamp && (
              <span className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)]">
                <Clock className="w-3 h-3" />
                {formatTimestamp(timestamp)}
              </span>
            )}
          </div>
          
          {/* Character count */}
          <div className={`text-sm font-mono ${getCharCountColor()}`}>
            {charCount.toLocaleString()} / {charLimit.toLocaleString()}
            {percentUsed > 100 && (
              <span className="ml-2 text-xs text-red-400">
                ({Math.round(charCount - charLimit)} over limit)
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="whitespace-pre-wrap text-white leading-relaxed text-[15px]">
            {content}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-[var(--color-border)] bg-[var(--color-bg-tertiary)]/50">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              disabled={copied}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                copied
                  ? "bg-green-500/20 text-green-400"
                  : "bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white"
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy
                </>
              )}
            </button>

            <button
              onClick={onRegenerate}
              disabled={isRegenerating}
              className="flex items-center gap-2 px-4 py-2 bg-[var(--color-bg-primary)] hover:bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-secondary)] hover:text-white font-medium text-sm transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isRegenerating ? "animate-spin" : ""}`} />
              Regenerate
            </button>
          </div>

          {/* Tips toggle */}
          <button
            onClick={() => setShowTips(!showTips)}
            className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
          >
            <Lightbulb className="w-4 h-4" />
            Tips
            <ChevronDown className={`w-4 h-4 transition-transform ${showTips ? "rotate-180" : ""}`} />
          </button>
        </div>

        {/* Platform Tips */}
        {showTips && (
          <div className="px-5 py-4 border-t border-[var(--color-border)] bg-[var(--color-bg-primary)]/50 animate-fade-in">
            <div className="flex items-center gap-2 mb-3">
              <span 
                className="text-sm font-medium"
                style={{ color: platformConfig.color }}
              >
                {platformConfig.name} Best Practices
              </span>
              <span className="text-xs text-[var(--color-text-muted)]">
                Best times: {platformConfig.bestTimes}
              </span>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {platformConfig.tips.map((tip, index) => (
                <li 
                  key={index}
                  className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]"
                >
                  <span 
                    className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                    style={{ backgroundColor: platformConfig.color }}
                  />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}


