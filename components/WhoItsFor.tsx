"use client";

import { motion } from "framer-motion";

const bestFor = [
  "Startups (seed to Series B) with 10-100 employees",
  "Companies spending 20+ hours/week on repetitive work",
  "Teams who want to prototype AI features before building in-house",
  "Founders who know AI could help but don't have time to figure it out",
  "Product teams testing new features before committing dev resources",
];

const notFor = [
  "Enterprise companies with complex compliance requirements",
  "Companies who want to build in-house (we help, we don't replace)",
  "Anyone expecting magic — AI is powerful but not instant",
];

export default function WhoItsFor() {
  return (
    <section className="py-24 md:py-32 bg-[var(--color-bg-secondary)]">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/30 rounded-full text-sm font-medium text-[var(--color-primary)] mb-6">
            Fit Check
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6">
            Is ZiziCo right for you?
          </h2>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-xl mx-auto">
            We want to be honest about who we work best with
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-[var(--color-bg-tertiary)] border border-[var(--color-primary)]/30 rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white flex items-center justify-center">
                <svg
                  className="w-6 h-6"
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
              </span>
              <h3 className="text-xl font-semibold text-white">Best for</h3>
            </div>
            <ul className="space-y-4">
              {bestFor.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-[var(--color-text-secondary)]">
                  <span className="w-2 h-2 rounded-full bg-[var(--color-primary)] mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-[var(--color-bg-tertiary)] border border-red-500/30 rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-600 text-white flex items-center justify-center">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </span>
              <h3 className="text-xl font-semibold text-white">Not for</h3>
            </div>
            <ul className="space-y-4">
              {notFor.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-[var(--color-text-secondary)]">
                  <span className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
