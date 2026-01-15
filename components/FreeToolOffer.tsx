"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function FreeToolOffer() {
  const [formData, setFormData] = useState({
    domain: "",
    email: "",
    jobTitle: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call - replace with actual submission logic
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-[var(--color-bg-primary)] to-[var(--color-bg-secondary)] relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--color-primary)]/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[var(--color-accent)]/5 rounded-full blur-[100px]" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-[var(--color-primary)]/20 to-[var(--color-accent)]/20 border border-[var(--color-primary)]/30 rounded-full text-sm font-medium text-[var(--color-primary)] mb-6">
            ✨ Free AI Tool — No Strings Attached
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6">
            See what we can build for you
            <br />
            <span className="gradient-text">in minutes, not weeks</span>
          </h2>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            Drop your details below and we&apos;ll build a custom AI tool tailored to your company
            and role — completely free. Then we&apos;ll hop on a quick 10-minute call to show you
            how to use it.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-[var(--color-bg-tertiary)] rounded-3xl p-8 md:p-12 border border-[var(--color-border)] relative overflow-hidden"
        >
          {/* Glow effect */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-[var(--color-primary)]/20 rounded-full blur-[80px] -z-0" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-[var(--color-accent)]/20 rounded-full blur-[60px] -z-0" />

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label
                    htmlFor="domain"
                    className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2"
                  >
                    Company Website
                  </label>
                  <input
                    type="text"
                    id="domain"
                    name="domain"
                    value={formData.domain}
                    onChange={handleChange}
                    placeholder="yourcompany.com"
                    required
                    className="input-field"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2"
                  >
                    Work Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                    required
                    className="input-field"
                  />
                </div>

                <div>
                  <label
                    htmlFor="jobTitle"
                    className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2"
                  >
                    Your Role
                  </label>
                  <input
                    type="text"
                    id="jobTitle"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    placeholder="e.g. Head of Sales"
                    required
                    className="input-field"
                  />
                </div>
              </div>

              <div className="flex flex-col items-center gap-4 pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full md:w-auto text-base px-10 py-4 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner" />
                      Building your tool...
                    </>
                  ) : (
                    <>
                      Build My Free AI Tool
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </>
                  )}
                </button>

                <p className="text-sm text-[var(--color-text-muted)] text-center">
                  We&apos;ll analyze your company, build a custom tool, and schedule a 10-min demo.
                  <br />
                  <span className="text-[var(--color-primary)]">No credit card. No commitment.</span>
                </p>
              </div>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="relative z-10 text-center py-8"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                We&apos;re building your tool now! 🎉
              </h3>
              <p className="text-[var(--color-text-secondary)] max-w-md mx-auto mb-6">
                Check your inbox at <span className="text-white font-medium">{formData.email}</span>.
                We&apos;ll send you access to your custom AI tool along with a link to schedule your
                10-minute walkthrough.
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-[var(--color-primary)]">
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Building in progress...
              </div>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 grid grid-cols-3 gap-8 text-center"
        >
          <div>
            <div className="text-3xl font-bold text-white mb-2">1</div>
            <p className="text-sm text-[var(--color-text-muted)]">
              Drop your details
            </p>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-2">2</div>
            <p className="text-sm text-[var(--color-text-muted)]">
              We build your tool
            </p>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-2">3</div>
            <p className="text-sm text-[var(--color-text-muted)]">
              10-min demo call
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
