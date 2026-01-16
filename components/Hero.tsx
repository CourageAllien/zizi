"use client";

import { useState } from "react";
import { motion } from "framer-motion";

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

export default function Hero() {
  const [appDescription, setAppDescription] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!appDescription.trim()) {
      setError("Please describe what you want us to build");
      return;
    }

    if (!email.trim()) {
      setError("Please enter your company email");
      return;
    }

    if (!isCompanyEmail(email)) {
      setError("Please use your company email (no Gmail, Yahoo, Outlook, etc.)");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/prototype-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: appDescription, email }),
      });

      if (!response.ok) throw new Error("Failed to submit");

      setIsSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 bg-[var(--color-bg-primary)]">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[var(--color-primary)]/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[var(--color-accent)]/10 rounded-full blur-[100px] -z-10" />

      <div className="max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/30 rounded-full text-sm font-medium text-[var(--color-primary)] mb-8">
            AI Operations for Growing Companies
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-8"
        >
          Your AI ops team
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-[var(--color-text-secondary)] max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          We build AI systems that complement the work you are doing and helps add revenue.
          <br className="hidden md:block" />
          <span className="text-[var(--color-primary)]">Unlimited builds. Maintained forever.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="/zizi/book"
            className="btn-primary text-base px-8 py-4"
          >
            Get Started
          </a>
          <a
            href="#how-it-works"
            className="btn-secondary text-base px-8 py-4 flex items-center gap-2"
          >
            See How It Works
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </a>
        </motion.div>

        {/* Proof is in the Pudding - Build Request Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-24"
        >
          <div className="max-w-xl mx-auto">
            {/* Card Container */}
            <div className="relative">
              {/* Glow effect behind card */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[var(--color-primary)]/20 via-[var(--color-accent)]/20 to-[var(--color-primary)]/20 rounded-3xl blur-xl opacity-60" />
              
              {/* Main Card */}
              <div className="relative bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-2xl p-8 backdrop-blur-sm">
                {/* Badge */}
                <div className="flex justify-center mb-6">
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-[var(--color-primary)]/10 to-[var(--color-accent)]/10 border border-[var(--color-primary)]/30 rounded-full text-sm font-medium text-[var(--color-primary)]">
                    <span className="w-2 h-2 bg-[var(--color-primary)] rounded-full animate-pulse" />
                    Free Prototype
                  </span>
                </div>

                {/* Heading */}
                <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-3">
                  The proof is in the pudding
                </h3>
                <p className="text-[var(--color-text-secondary)] text-center mb-8 text-sm md:text-base">
                  Describe a simple tool and we&apos;ll build you a working prototype in{" "}
                  <span className="text-[var(--color-primary)] font-semibold">30 minutes</span>. Free.
                </p>

                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Description textarea */}
                    <div>
                      <label className="block text-xs font-medium text-[var(--color-text-muted)] mb-2 text-left uppercase tracking-wider">
                        What do you want us to build?
                      </label>
                      <textarea
                        value={appDescription}
                        onChange={(e) => setAppDescription(e.target.value)}
                        placeholder="e.g., A dashboard that shows my team's daily sales metrics with charts..."
                        rows={3}
                        className="w-full px-4 py-3 bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-xl text-white placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]/50 transition-all resize-none text-sm"
                      />
                    </div>

                    {/* Email input */}
                    <div>
                      <label className="block text-xs font-medium text-[var(--color-text-muted)] mb-2 text-left uppercase tracking-wider">
                        Your work email
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@yourcompany.com"
                        className="w-full px-4 py-3 bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-xl text-white placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]/50 transition-all text-sm"
                      />
                      <p className="text-xs text-[var(--color-text-muted)] mt-1.5 text-left">
                        Company email only — no Gmail, Yahoo, or personal accounts
                      </p>
                    </div>

                    {/* Error message */}
                    {error && (
                      <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {error}
                      </div>
                    )}

                    {/* Submit button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] hover:from-[var(--color-primary-light)] hover:to-[var(--color-primary)] text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-[var(--color-primary)]/20 hover:shadow-[var(--color-primary)]/40"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Building...
                        </>
                      ) : (
                        <>
                          Build My Prototype
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center mx-auto mb-5 shadow-lg shadow-[var(--color-primary)]/30">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">We&apos;re on it! 🚀</h4>
                    <p className="text-[var(--color-text-secondary)] text-sm">
                      Check your inbox at <span className="text-white font-medium">{email}</span>
                      <br />
                      <span className="text-[var(--color-primary)]">Prototype ready in ~30 minutes</span>
                    </p>
                  </motion.div>
                )}

                {/* Footer note */}
                {!isSubmitted && (
                  <p className="text-center text-xs text-[var(--color-text-muted)] mt-6">
                    We&apos;ll email your prototype link within 30 min during business hours
                  </p>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
