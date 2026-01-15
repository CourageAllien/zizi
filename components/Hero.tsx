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
            href="#pricing"
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
          className="mt-20 pt-12 border-t border-[var(--color-border)]"
        >
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-2xl">⚡</span>
              <h3 className="text-xl md:text-2xl font-bold text-white">
                The proof is in the pudding
              </h3>
            </div>
            <p className="text-[var(--color-text-secondary)] mb-8">
              Describe a simple app and we&apos;ll build you a working prototype in{" "}
              <span className="text-[var(--color-primary)] font-semibold">30 minutes</span>. 
              Free. No strings attached.
            </p>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <textarea
                    value={appDescription}
                    onChange={(e) => setAppDescription(e.target.value)}
                    placeholder="Describe the app you want us to build... (e.g., 'A dashboard that shows my team's daily sales metrics with charts')"
                    rows={4}
                    className="input-field resize-none text-left"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your company email (no Gmail, Yahoo, etc.)"
                    className="input-field"
                  />
                </div>

                {error && (
                  <p className="text-red-400 text-sm">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full text-base py-4 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Build My Prototype
                    </>
                  )}
                </button>

                <p className="text-xs text-[var(--color-text-muted)]">
                  We&apos;ll email you a link to your prototype within 30 minutes during business hours.
                </p>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[var(--color-bg-tertiary)] rounded-2xl p-8 border border-[var(--color-primary)]/30"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-white mb-2">We&apos;re on it! 🚀</h4>
                <p className="text-[var(--color-text-secondary)]">
                  Check your inbox at <span className="text-white font-medium">{email}</span>.
                  <br />
                  Your prototype will be ready within 30 minutes.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
