"use client";

import { useState, useEffect } from "react";
import { History, Trash2, X, Linkedin, Twitter, Instagram, Facebook, Music2 } from "lucide-react";
import { HistoryItem, PlatformId, platforms } from "@/lib/social-platforms";

const STORAGE_KEY = "zizi-social-content-history";
const MAX_HISTORY_ITEMS = 20;

interface ContentHistoryProps {
  onSelect: (item: HistoryItem) => void;
  onClear: () => void;
}

const PlatformIcons: Record<PlatformId, React.ReactNode> = {
  linkedin: <Linkedin className="w-4 h-4" />,
  twitter: <Twitter className="w-4 h-4" />,
  instagram: <Instagram className="w-4 h-4" />,
  facebook: <Facebook className="w-4 h-4" />,
  tiktok: <Music2 className="w-4 h-4" />,
};

export function useContentHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setHistory(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse history:", e);
      }
    }
  }, []);

  const addToHistory = (item: Omit<HistoryItem, "id" | "createdAt">) => {
    const newItem: HistoryItem = {
      ...item,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };

    setHistory((prev) => {
      const updated = [newItem, ...prev].slice(0, MAX_HISTORY_ITEMS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const removeItem = (id: string) => {
    setHistory((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  return { history, addToHistory, clearHistory, removeItem };
}

export default function ContentHistory({ onSelect, onClear }: ContentHistoryProps) {
  const { history, removeItem, clearHistory } = useContentHistory();
  const [isOpen, setIsOpen] = useState(false);

  if (history.length === 0) {
    return null;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const handleClear = () => {
    clearHistory();
    onClear();
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-bg-tertiary)]/80 border border-[var(--color-border)] rounded-xl text-[var(--color-text-secondary)] hover:text-white transition-all text-sm"
      >
        <History className="w-4 h-4" />
        History
        <span className="px-1.5 py-0.5 bg-[var(--color-primary)]/20 text-[var(--color-primary)] text-xs rounded">
          {history.length}
        </span>
      </button>

      {/* History panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Panel */}
          <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 max-h-[60vh] bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl shadow-2xl shadow-black/50 z-50 overflow-hidden animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-border)]">
              <span className="text-sm font-medium text-white">Recent Generations</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleClear}
                  className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                  Clear all
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-[var(--color-text-muted)] hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* History list */}
            <div className="max-h-[calc(60vh-60px)] overflow-y-auto">
              {history.map((item) => {
                const platformConfig = platforms[item.platform];
                
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelect(item);
                      setIsOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-[var(--color-bg-tertiary)] border-b border-[var(--color-border)] last:border-b-0 transition-colors group"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span 
                            className="flex items-center justify-center w-6 h-6 rounded-md"
                            style={{ backgroundColor: `${platformConfig.color}20`, color: platformConfig.color }}
                          >
                            {PlatformIcons[item.platform]}
                          </span>
                          <span className="text-xs text-[var(--color-text-muted)]">
                            {formatDate(item.createdAt)}
                          </span>
                        </div>
                        <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2 group-hover:text-white transition-colors">
                          {item.content.slice(0, 100)}...
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeItem(item.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 p-1 text-[var(--color-text-muted)] hover:text-red-400 transition-all"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}


