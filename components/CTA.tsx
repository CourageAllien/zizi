"use client";

import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-[var(--color-bg-secondary)]">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/10 via-transparent to-[var(--color-accent)]/10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-primary)]/10 rounded-full blur-[150px]" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-8">
            Ready to add AI
            <br />
            <span className="gradient-text">to your workflow?</span>
          </h2>
          <p className="text-xl text-[var(--color-text-secondary)] max-w-xl mx-auto mb-12">
            Join the companies shipping AI systems in days, not months.
            <br />
            Start today. No commitment.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/zizi/book"
              className="btn-primary text-base px-10 py-4"
            >
              Get Started — $2,199/mo
            </a>
            <a
              href="https://calendly.com/courageoutbounder/ai-chat"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-text-secondary)] hover:text-white transition-colors px-8 py-4 text-base flex items-center gap-2"
            >
              Book an intro call
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
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 pt-10 border-t border-[var(--color-border)]"
          >
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-sm text-[var(--color-text-muted)]">
              <span className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-[var(--color-primary)]"
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
                Unlimited builds
              </span>
              <span className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-[var(--color-primary)]"
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
                Maintained forever
              </span>
              <span className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-[var(--color-primary)]"
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
                Cancel anytime
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}


