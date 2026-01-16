"use client";

import { motion } from "framer-motion";

const features = [
  "Unlimited AI system builds",
  "Unlimited maintenance & updates",
  "Direct Slack access to our team",
  "48-hour turnaround on requests",
  "Dedicated project manager",
  "Priority support",
  "No contracts — cancel anytime",
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 md:py-32 bg-[var(--color-bg-secondary)]">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/30 rounded-full text-sm font-medium text-[var(--color-primary)] mb-6">
            Pricing
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6">
            Simple, predictable pricing
          </h2>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-xl mx-auto">
            One plan. Everything included. No surprises.
          </p>
        </motion.div>

        {/* Main Pricing Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative bg-[var(--color-bg-tertiary)] rounded-3xl p-10 md:p-12 border border-[var(--color-border)] overflow-hidden"
        >
          {/* Glow effect */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-primary)]/20 rounded-full blur-[100px] -z-0" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[var(--color-accent)]/20 rounded-full blur-[80px] -z-0" />

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-10 pb-10 border-b border-[var(--color-border)]">
              <div>
                <p className="text-[var(--color-text-secondary)] text-sm font-medium mb-3">
                  Monthly Subscription
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl md:text-6xl font-bold text-white">$2,199</span>
                  <span className="text-[var(--color-text-muted)] text-lg">/month</span>
                </div>
                <p className="text-[var(--color-text-muted)] text-sm mt-3">
                  Pause or cancel anytime. No contracts.
                </p>
              </div>
              <a
                href="/zizi/book"
                className="btn-primary text-base px-8 py-4 text-center animate-pulse-glow"
              >
                Get Started Today
              </a>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-primary)]/20 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-[var(--color-primary)]"
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
                  <span className="text-[var(--color-text-secondary)]">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Custom Builds CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 p-8 rounded-2xl bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] text-center"
        >
          <h3 className="text-xl font-semibold text-white mb-3">
            Need a one-time custom build?
          </h3>
          <p className="text-[var(--color-text-secondary)] mb-6 max-w-lg mx-auto">
            We also take on custom projects. Tell us what you need and we&apos;ll scope it out together.
          </p>
          <a
            href="https://calendly.com/courageoutbounder/ai-chat"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center gap-2"
          >
            Contact Us for Custom Builds
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
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
