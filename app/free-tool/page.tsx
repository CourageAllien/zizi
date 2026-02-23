"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

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

export default function FreeToolPage() {
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
    <div className="min-h-screen bg-[var(--color-bg-primary)] flex flex-col">
      {/* Header */}
      <header className="py-6 px-6 border-b border-[var(--color-border)]">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-white">
            ZiziCo
          </Link>
          <Link
            href="/zizi/book"
            className="btn-primary text-sm px-6 py-2"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center py-16 px-6">
        <div className="w-full max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors mb-8"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to home
            </Link>

            {/* Badge */}
            <div className="flex justify-center mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-[var(--color-primary)]/10 to-[var(--color-accent)]/10 border border-[var(--color-primary)]/30 rounded-full text-sm font-medium text-[var(--color-primary)]">
                <span className="w-2 h-2 bg-[var(--color-primary)] rounded-full animate-pulse" />
                Free Prototype
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Get a free AI tool
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)]">
              Describe a simple tool and we&apos;ll build you a working prototype in{" "}
              <span className="text-[var(--color-primary)] font-semibold">30 minutes</span>.
              <br />
              Free. No strings attached.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* Card Container */}
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[var(--color-primary)]/20 via-[var(--color-accent)]/20 to-[var(--color-primary)]/20 rounded-3xl blur-xl opacity-60" />

              {/* Main Card */}
              <div className="relative bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-2xl p-8 md:p-10">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Description textarea */}
                    <div>
                      <label className="block text-xs font-medium text-[var(--color-text-muted)] mb-2 uppercase tracking-wider">
                        What do you want us to build?
                      </label>
                      <textarea
                        value={appDescription}
                        onChange={(e) => setAppDescription(e.target.value)}
                        placeholder="e.g., A dashboard that shows my team's daily sales metrics with charts..."
                        rows={4}
                        className="w-full px-4 py-3 bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-xl text-white placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]/50 transition-all resize-none text-sm"
                      />
                    </div>

                    {/* Email input */}
                    <div>
                      <label className="block text-xs font-medium text-[var(--color-text-muted)] mb-2 uppercase tracking-wider">
                        Your work email
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@yourcompany.com"
                        className="w-full px-4 py-3 bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-xl text-white placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]/50 transition-all text-sm"
                      />
                      <p className="text-xs text-[var(--color-text-muted)] mt-1.5">
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
                      className="w-full py-4 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] hover:from-[var(--color-primary-light)] hover:to-[var(--color-primary)] text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-[var(--color-primary)]/20 hover:shadow-[var(--color-primary)]/40"
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
                          Build My Free Tool
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </>
                      )}
                    </button>

                    <p className="text-center text-xs text-[var(--color-text-muted)]">
                      We&apos;ll email your prototype link within 30 min during business hours
                    </p>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[var(--color-primary)]/30">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-3">We&apos;re on it! 🚀</h2>
                    <p className="text-[var(--color-text-secondary)] mb-6">
                      Check your inbox at <span className="text-white font-medium">{email}</span>
                      <br />
                      <span className="text-[var(--color-primary)]">Your prototype will be ready in ~30 minutes</span>
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Link
                        href="/zizi/book"
                        className="btn-primary px-6 py-3"
                      >
                        Book a Discovery Call
                      </Link>
                      <Link href="/" className="btn-secondary px-6 py-3">
                        Back to Home
                      </Link>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Steps */}
            <div className="mt-10 grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="w-10 h-10 rounded-full bg-[var(--color-primary)]/20 flex items-center justify-center mx-auto mb-3">
                  <span className="text-[var(--color-primary)] font-bold">1</span>
                </div>
                <p className="text-sm text-[var(--color-text-muted)]">Describe your tool</p>
              </div>
              <div>
                <div className="w-10 h-10 rounded-full bg-[var(--color-primary)]/20 flex items-center justify-center mx-auto mb-3">
                  <span className="text-[var(--color-primary)] font-bold">2</span>
                </div>
                <p className="text-sm text-[var(--color-text-muted)]">We build it</p>
              </div>
              <div>
                <div className="w-10 h-10 rounded-full bg-[var(--color-primary)]/20 flex items-center justify-center mx-auto mb-3">
                  <span className="text-[var(--color-primary)] font-bold">3</span>
                </div>
                <p className="text-sm text-[var(--color-text-muted)]">Get your prototype</p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}


