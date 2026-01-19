"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Loader2, CheckCircle, ArrowDown } from "lucide-react";

// List of free email domains to block
const FREE_EMAIL_DOMAINS = [
  "gmail.com",
  "yahoo.com",
  "yahoo.co.uk",
  "hotmail.com",
  "hotmail.co.uk",
  "outlook.com",
  "outlook.co.uk",
  "live.com",
  "msn.com",
  "aol.com",
  "icloud.com",
  "me.com",
  "mac.com",
  "protonmail.com",
  "proton.me",
  "mail.com",
  "zoho.com",
  "yandex.com",
  "gmx.com",
  "gmx.net",
];

function isCompanyEmail(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase();
  if (!domain) return false;
  return !FREE_EMAIL_DOMAINS.includes(domain);
}

export default function SalesHero() {
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!description.trim()) {
      setError("Please describe the sales tool you want");
      return;
    }

    if (!email.trim()) {
      setError("Please enter your work email");
      return;
    }

    if (!isCompanyEmail(email)) {
      setError("Please use your company email (no Gmail, Yahoo, Outlook, etc.)");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/sales/free-tool", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description, email }),
      });

      if (!response.ok) throw new Error("Failed to submit");

      setIsSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-24 pb-16 bg-[var(--color-bg-primary)]">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[700px] bg-emerald-500/8 rounded-full blur-[150px] -z-10" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-600/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute top-1/4 left-0 w-[300px] h-[300px] bg-teal-500/5 rounded-full blur-[100px] -z-10" />

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 -z-10 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="max-w-6xl mx-auto px-6">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-sm font-medium text-emerald-400">
            <Sparkles className="w-4 h-4" />
            AI-Powered Sales Tools
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white text-center mb-6 leading-[1.1]"
        >
          Helping salespeople{" "}
          <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
            close more deals
          </span>
          <br />
          <span className="text-3xl md:text-4xl lg:text-5xl text-[var(--color-text-secondary)] font-medium">
            with custom AI-powered sales assets and tools.
          </span>
        </motion.h1>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6"
        >
          <button
            onClick={() => scrollToSection("#what-we-build")}
            className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 flex items-center gap-2"
          >
            See What We Build
            <ArrowDown className="w-4 h-4" />
          </button>
          <span className="text-[var(--color-text-muted)] text-sm">— or —</span>
          <button
            onClick={() => scrollToSection("#pricing")}
            className="px-8 py-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/50 font-semibold rounded-xl transition-all flex items-center gap-2"
          >
            Start Building
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

        {/* Free Tool Builder Box */}
        <motion.div
          id="free-tool"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="max-w-2xl mx-auto scroll-mt-24 mt-16"
        >
          {/* Glow effect */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-emerald-500/20 rounded-3xl blur-xl opacity-60" />

            {/* Card */}
            <div className="relative bg-[var(--color-bg-secondary)] border border-emerald-500/20 rounded-2xl p-8 backdrop-blur-sm">
              {/* Header */}
              <div className="flex justify-center mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 rounded-full text-sm font-medium text-emerald-400">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  Free Preview Tool
                </span>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-2">
                The proof is in the pudding
              </h3>
              <p className="text-[var(--color-text-secondary)] text-center mb-8 text-sm md:text-base">
                Describe a simple sales tool and we&apos;ll build you a working prototype.{" "}
                <span className="text-emerald-400 font-medium">Free.</span>
              </p>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Description */}
                  <div>
                    <label className="block text-xs font-medium text-[var(--color-text-muted)] mb-2 text-left uppercase tracking-wider">
                      What sales tool do you need?
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Example: I need a preview tool that helps prospects calculate their ROI and see how our product fits their workflow..."
                      rows={4}
                      className="w-full px-4 py-3 bg-[var(--color-bg-primary)] border border-[var(--color-border)] hover:border-emerald-500/30 rounded-xl text-white placeholder-[var(--color-text-muted)] focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all resize-none text-sm"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-medium text-[var(--color-text-muted)] mb-2 text-left uppercase tracking-wider">
                      Your work email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@yourcompany.com"
                      className="w-full px-4 py-3 bg-[var(--color-bg-primary)] border border-[var(--color-border)] hover:border-emerald-500/30 rounded-xl text-white placeholder-[var(--color-text-muted)] focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all text-sm"
                    />
                  </div>

                  {/* Error */}
                  {error && (
                    <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3">
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {error}
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Building...
                      </>
                    ) : (
                      <>
                        Build My Free Tool
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-[var(--color-text-muted)]">
                    We&apos;ll email your prototype link within 24-48 hours
                  </p>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-emerald-500/30">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">We&apos;re on it! 🚀</h4>
                  <p className="text-[var(--color-text-secondary)] text-sm">
                    Check your inbox at <span className="text-white font-medium">{email}</span>
                    <br />
                    <span className="text-emerald-400">Your prototype will be ready in 24-48 hours</span>
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
