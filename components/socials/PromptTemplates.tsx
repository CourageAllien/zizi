"use client";

import { useState } from "react";
import { promptTemplates, templatesByCategory } from "@/lib/social-platforms";
import { Rocket, Hammer, Lightbulb, Wrench, Zap, MessageCircle, Trophy, ChevronRight } from "lucide-react";

interface PromptTemplatesProps {
  onSelect: (prompt: string) => void;
}

const categoryIcons: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  "launch": Rocket,
  "build-in-public": Hammer,
  "value-insight": Lightbulb,
  "tool-showcase": Wrench,
  "contrarian": Zap,
  "engagement": MessageCircle,
  "testimonial": Trophy,
};

const categoryLabels: Record<string, string> = {
  "launch": "Launch & New Beginnings",
  "build-in-public": "Build in Public",
  "value-insight": "Value & Insights",
  "tool-showcase": "Tool Showcase",
  "contrarian": "Contrarian Takes",
  "engagement": "Engagement",
  "testimonial": "Results & Proof",
};

const categoryColors: Record<string, string> = {
  "launch": "#F472B6",
  "build-in-public": "var(--color-primary)",
  "value-insight": "var(--color-accent)",
  "tool-showcase": "#10B981",
  "contrarian": "#F59E0B",
  "engagement": "#EC4899",
  "testimonial": "#3B82F6",
};

export default function PromptTemplates({ onSelect }: PromptTemplatesProps) {
  const [activeCategory, setActiveCategory] = useState<keyof typeof templatesByCategory | null>(null);
  const [showAll, setShowAll] = useState(false);

  const categories = Object.keys(templatesByCategory) as (keyof typeof templatesByCategory)[];

  if (!showAll) {
    // Compact view - show first 6 templates as chips
    const quickTemplates = promptTemplates.slice(0, 6);
    
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">
            Quick Start Templates
          </label>
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="text-xs text-[var(--color-primary)] hover:text-[var(--color-primary-light)] transition-colors flex items-center gap-1"
          >
            View all
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {quickTemplates.map((template) => (
            <button
              key={template.id}
              type="button"
              onClick={() => onSelect(template.prompt)}
              className="px-3 py-1.5 text-sm bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-primary)]/20 border border-[var(--color-border)] hover:border-[var(--color-primary)]/50 rounded-full text-[var(--color-text-secondary)] hover:text-white transition-all"
            >
              {template.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="px-3 py-1.5 text-sm bg-transparent border border-dashed border-[var(--color-border)] hover:border-[var(--color-primary)]/50 rounded-full text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-all"
          >
            + More
          </button>
        </div>
      </div>
    );
  }

  // Expanded view with categories
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">
          Prompt Templates
        </label>
        <button
          type="button"
          onClick={() => {
            setShowAll(false);
            setActiveCategory(null);
          }}
          className="text-xs text-[var(--color-text-muted)] hover:text-white transition-colors"
        >
          Collapse
        </button>
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const Icon = categoryIcons[category];
          const isActive = activeCategory === category;
          const color = categoryColors[category];
          
          return (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(isActive ? null : category)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all text-sm ${
                isActive 
                  ? "border-transparent text-white" 
                  : "border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-hover)]"
              }`}
              style={isActive ? { backgroundColor: `${color}30` } : {}}
            >
              <Icon className="w-4 h-4" style={isActive ? { color } : {}} />
              {categoryLabels[category]}
            </button>
          );
        })}
      </div>

      {/* Templates for selected category */}
      {activeCategory && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 animate-fade-in">
          {templatesByCategory[activeCategory].map((template) => (
            <button
              key={template.id}
              type="button"
              onClick={() => {
                onSelect(template.prompt);
                setShowAll(false);
                setActiveCategory(null);
              }}
              className="p-3 text-left bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-bg-tertiary)]/80 border border-[var(--color-border)] hover:border-[var(--color-primary)]/30 rounded-xl transition-all group"
            >
              <span className="text-sm font-medium text-white group-hover:text-[var(--color-primary)] transition-colors">
                {template.label}
              </span>
              <p className="text-xs text-[var(--color-text-muted)] mt-1 line-clamp-2">
                {template.prompt.slice(0, 80)}...
              </p>
            </button>
          ))}
        </div>
      )}

      {/* Show all templates if no category selected */}
      {!activeCategory && (
        <div className="flex flex-wrap gap-2">
          {promptTemplates.map((template) => (
            <button
              key={template.id}
              type="button"
              onClick={() => {
                onSelect(template.prompt);
                setShowAll(false);
              }}
              className="px-3 py-1.5 text-sm bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-primary)]/20 border border-[var(--color-border)] hover:border-[var(--color-primary)]/50 rounded-full text-[var(--color-text-secondary)] hover:text-white transition-all"
            >
              {template.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

