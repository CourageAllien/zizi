"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ChevronDown, AlertCircle, Wand2, Globe } from "lucide-react";
import PlatformSelect from "@/components/socials/PlatformSelect";
import PromptTemplates from "@/components/socials/PromptTemplates";
import GeneratedContent from "@/components/socials/GeneratedContent";
import ContentHistory, { useContentHistory } from "@/components/socials/ContentHistory";
import LoadingState from "@/components/socials/LoadingState";
import { useToast } from "@/components/socials/Toast";
import { PlatformId, HistoryItem } from "@/lib/social-platforms";

export default function SocialsPage() {
  // Form state
  const [platform, setPlatform] = useState<PlatformId | "">("");
  const [description, setDescription] = useState("");
  const [styleReference, setStyleReference] = useState("");
  const [companyDomain, setCompanyDomain] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Generation state
  const [isLoading, setIsLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [generatedPlatform, setGeneratedPlatform] = useState<PlatformId | null>(null);
  const [generatedAt, setGeneratedAt] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Validation state
  const [platformError, setPlatformError] = useState("");
  const [companyDomainError, setCompanyDomainError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const { showToast } = useToast();
  const { addToHistory } = useContentHistory();

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + Enter to generate
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        handleSubmit();
      }
      // Escape to clear error
      if (e.key === "Escape" && error) {
        setError(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [platform, description, error]);

  const validateForm = () => {
    let isValid = true;

    if (!platform) {
      setPlatformError("Please select a platform");
      isValid = false;
    } else {
      setPlatformError("");
    }

    if (!companyDomain.trim()) {
      setCompanyDomainError("Please enter your company website");
      isValid = false;
    } else {
      setCompanyDomainError("");
    }

    if (!description.trim()) {
      setDescriptionError("Please describe what you want to create");
      isValid = false;
    } else if (description.trim().length < 20) {
      setDescriptionError("Please provide more detail (at least 20 characters)");
      isValid = false;
    } else {
      setDescriptionError("");
    }

    return isValid;
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setError(null);
    setGeneratedContent(null);

    try {
      const response = await fetch("/api/socials/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          platform,
          description: description.trim(),
          styleReference: styleReference.trim() || undefined,
          companyDomain: companyDomain.trim() || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate content");
      }

      setGeneratedContent(data.content);
      setGeneratedPlatform(data.platform);
      setGeneratedAt(new Date());

      // Add to history
      addToHistory({
        platform: data.platform,
        content: data.content,
        description: description.trim(),
        styleReference: styleReference.trim() || undefined,
      });

      showToast("Content generated successfully!", "success");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      setError(message);
      showToast("Generation failed. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/socials/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          platform: generatedPlatform || platform,
          description: description.trim(),
          styleReference: styleReference.trim() || undefined,
          companyDomain: companyDomain.trim() || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to regenerate content");
      }

      setGeneratedContent(data.content);
      setGeneratedAt(new Date());

      // Add to history
      addToHistory({
        platform: data.platform,
        content: data.content,
        description: description.trim(),
        styleReference: styleReference.trim() || undefined,
      });

      showToast("Content regenerated!", "success");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      setError(message);
      showToast("Regeneration failed. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleHistorySelect = useCallback((item: HistoryItem) => {
    setGeneratedContent(item.content);
    setGeneratedPlatform(item.platform);
    setPlatform(item.platform);
    setDescription(item.description);
    if (item.styleReference) {
      setStyleReference(item.styleReference);
      setShowAdvanced(true);
    }
    setGeneratedAt(new Date(item.createdAt));
  }, []);

  const handleTemplateSelect = (prompt: string) => {
    setDescription(prompt);
    setDescriptionError("");
  };

  const isFormValid = platform && companyDomain.trim() && description.trim().length >= 20;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 py-4 px-6 border-b border-[var(--color-border)] bg-[var(--color-bg-primary)]/80 backdrop-blur-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-white hover:text-[var(--color-primary)] transition-colors">
            ZiziCo
          </Link>
          
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[var(--color-primary)]" />
            <span className="font-display font-semibold text-white">Social Content Generator</span>
          </div>

          <div className="flex items-center gap-4">
            <ContentHistory 
              onSelect={handleHistorySelect} 
              onClear={() => showToast("History cleared", "info")} 
            />
            <Link
              href="/zizi/book"
              className="hidden sm:block text-sm text-[var(--color-text-muted)] hover:text-white transition-colors"
            >
              Book a Call
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-8 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Create <span className="gradient-text">engaging content</span> for any platform
            </h1>
            <p className="text-[var(--color-text-secondary)] max-w-xl mx-auto">
              Select your platform, describe what you need, and let AI craft the perfect post.
              <span className="hidden sm:inline"> Pro tip: Press <kbd className="px-1.5 py-0.5 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded text-xs font-mono">⌘</kbd> + <kbd className="px-1.5 py-0.5 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded text-xs font-mono">↵</kbd> to generate.</span>
            </p>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Card */}
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[var(--color-primary)]/10 via-[var(--color-accent)]/10 to-[var(--color-primary)]/10 rounded-3xl blur-xl opacity-60" />

              <div className="relative bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-2xl p-6 md:p-8 space-y-6">
                {/* Platform Select */}
                <PlatformSelect
                  value={platform}
                  onChange={(p) => {
                    setPlatform(p);
                    setPlatformError("");
                  }}
                  error={platformError}
                />

                {/* Company Domain - Required */}
                <div>
                  <label className="block text-xs font-medium text-[var(--color-text-muted)] mb-2 uppercase tracking-wider">
                    Company Website <span className="text-red-400">*</span>
                  </label>
                  <p className="text-xs text-[var(--color-text-muted)] mb-2">
                    Enter your company&apos;s domain so AI can create content tailored to what you do.
                  </p>
                  <div className="relative">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
                    <input
                      type="text"
                      value={companyDomain}
                      onChange={(e) => {
                        setCompanyDomain(e.target.value);
                        if (e.target.value.trim()) setCompanyDomainError("");
                      }}
                      placeholder="yourcompany.com"
                      className={`w-full pl-11 pr-4 py-3 bg-[var(--color-bg-primary)] border rounded-xl text-white placeholder-[var(--color-text-muted)] focus:outline-none transition-all text-sm ${
                        companyDomainError
                          ? "border-red-400/50 focus:border-red-400 focus:ring-1 focus:ring-red-400/20"
                          : "border-[var(--color-border)] focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]/50"
                      }`}
                    />
                  </div>
                  {companyDomainError && (
                    <p className="mt-2 text-sm text-red-400">{companyDomainError}</p>
                  )}
                </div>

                {/* Prompt Templates */}
                <PromptTemplates onSelect={handleTemplateSelect} />

                {/* Description */}
                <div>
                  <label className="block text-xs font-medium text-[var(--color-text-muted)] mb-2 uppercase tracking-wider">
                    What do you want to create? <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                      if (e.target.value.length >= 20) setDescriptionError("");
                    }}
                    placeholder="Describe the content you want. Be specific about the topic, tone, goal, and any key points to include.

Example: Write a LinkedIn post about how AI-powered sales tools help founders close more deals. Tone should be professional but conversational. Include a call-to-action to book a demo."
                    rows={5}
                    className={`w-full px-4 py-3 bg-[var(--color-bg-primary)] border rounded-xl text-white placeholder-[var(--color-text-muted)] focus:outline-none transition-all resize-none text-sm ${
                      descriptionError
                        ? "border-red-400/50 focus:border-red-400 focus:ring-1 focus:ring-red-400/20"
                        : "border-[var(--color-border)] focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]/50"
                    }`}
                  />
                  <div className="flex items-center justify-between mt-2">
                    {descriptionError ? (
                      <p className="text-sm text-red-400">{descriptionError}</p>
                    ) : (
                      <span className="text-xs text-[var(--color-text-muted)]">
                        {description.length} characters
                      </span>
                    )}
                  </div>
                </div>

                {/* Style Reference (collapsible) */}
                <div>
                  <button
                    type="button"
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
                  >
                    <ChevronDown className={`w-4 h-4 transition-transform ${showAdvanced ? "rotate-180" : ""}`} />
                    Advanced: Add style reference
                  </button>

                  {showAdvanced && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4"
                    >
                      <label className="block text-xs font-medium text-[var(--color-text-muted)] mb-2 uppercase tracking-wider">
                        Content to Imitate (Optional)
                      </label>
                      <p className="text-xs text-[var(--color-text-muted)] mb-2">
                        Paste an example post whose style, tone, or structure you want to mimic. We&apos;ll match the vibe, not copy the content.
                      </p>
                      <textarea
                        value={styleReference}
                        onChange={(e) => setStyleReference(e.target.value)}
                        placeholder="Paste example content here..."
                        rows={4}
                        className="w-full px-4 py-3 bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-xl text-white placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]/50 transition-all resize-none text-sm"
                      />
                    </motion.div>
                  )}
                </div>

                {/* Error display */}
                {error && (
                  <div className="flex items-center gap-3 p-4 bg-red-400/10 border border-red-400/20 rounded-xl text-red-400">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{error}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setError(null)}
                      className="text-red-400/60 hover:text-red-400 transition-colors text-sm"
                    >
                      Dismiss
                    </button>
                  </div>
                )}

                {/* Generate Button */}
                <button
                  type="submit"
                  disabled={isLoading || !isFormValid}
                  className="w-full py-4 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] hover:from-[var(--color-primary-light)] hover:to-[var(--color-primary)] text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[var(--color-primary)]/20 hover:shadow-[var(--color-primary)]/40"
                >
                  {isLoading ? (
                    <>
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-5 h-5" />
                      Generate Content
                      <span className="hidden sm:inline text-xs opacity-60 ml-2">⌘↵</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.form>

          {/* Output */}
          {(isLoading || generatedContent) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-8"
            >
              {isLoading && !generatedContent ? (
                <LoadingState />
              ) : generatedContent && generatedPlatform ? (
                <GeneratedContent
                  content={generatedContent}
                  platform={generatedPlatform}
                  onRegenerate={handleRegenerate}
                  isRegenerating={isLoading}
                  timestamp={generatedAt || undefined}
                />
              ) : null}
            </motion.div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-6 border-t border-[var(--color-border)]">
        <div className="max-w-4xl mx-auto flex items-center justify-between text-sm text-[var(--color-text-muted)]">
          <span>© {new Date().getFullYear()} ZiziCo</span>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/zizi/book" className="hover:text-white transition-colors">
              Book a Call
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

