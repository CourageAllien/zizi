"use client";

import { Linkedin, Twitter, Instagram, Facebook, Music2, ChevronDown, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { platforms, platformList, PlatformId } from "@/lib/social-platforms";

interface PlatformSelectProps {
  value: PlatformId | "";
  onChange: (platform: PlatformId) => void;
  error?: string;
}

const PlatformIcons: Record<PlatformId, React.ReactNode> = {
  linkedin: <Linkedin className="w-5 h-5" />,
  twitter: <Twitter className="w-5 h-5" />,
  instagram: <Instagram className="w-5 h-5" />,
  facebook: <Facebook className="w-5 h-5" />,
  tiktok: <Music2 className="w-5 h-5" />,
};

export default function PlatformSelect({ value, onChange, error }: PlatformSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedPlatform = value ? platforms[value] : null;

  return (
    <div className="w-full" ref={dropdownRef}>
      <label className="block text-xs font-medium text-[var(--color-text-muted)] mb-2 uppercase tracking-wider">
        Select Platform <span className="text-red-400">*</span>
      </label>
      
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full flex items-center justify-between px-4 py-3.5 bg-[var(--color-bg-primary)] border rounded-xl text-left transition-all ${
            error 
              ? "border-red-400/50 focus:border-red-400 focus:ring-red-400/20" 
              : "border-[var(--color-border)] hover:border-[var(--color-border-hover)] focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]/50"
          }`}
        >
          {selectedPlatform ? (
            <div className="flex items-center gap-3">
              <span 
                className="flex items-center justify-center w-8 h-8 rounded-lg"
                style={{ backgroundColor: `${selectedPlatform.color}20`, color: selectedPlatform.color }}
              >
                {PlatformIcons[selectedPlatform.id]}
              </span>
              <span className="text-white font-medium">{selectedPlatform.name}</span>
            </div>
          ) : (
            <span className="text-[var(--color-text-muted)]">Choose a platform...</span>
          )}
          <ChevronDown 
            className={`w-5 h-5 text-[var(--color-text-muted)] transition-transform ${isOpen ? "rotate-180" : ""}`} 
          />
        </button>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute z-50 w-full mt-2 py-2 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl shadow-2xl shadow-black/50 overflow-hidden animate-fade-in">
            {platformList.map((platform) => (
              <button
                key={platform.id}
                type="button"
                onClick={() => {
                  onChange(platform.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 hover:bg-[var(--color-bg-tertiary)] transition-colors ${
                  value === platform.id ? "bg-[var(--color-bg-tertiary)]" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <span 
                    className="flex items-center justify-center w-8 h-8 rounded-lg"
                    style={{ backgroundColor: `${platform.color}20`, color: platform.color }}
                  >
                    {PlatformIcons[platform.id]}
                  </span>
                  <div className="text-left">
                    <span className="text-white font-medium">{platform.name}</span>
                    <span className="text-xs text-[var(--color-text-muted)] block">
                      {platform.charLimit.toLocaleString()} char limit
                    </span>
                  </div>
                </div>
                {value === platform.id && (
                  <Check className="w-5 h-5 text-[var(--color-primary)]" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
}


