"use client";

import { motion } from "framer-motion";

export default function Hero() {
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

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-24 pt-12 border-t border-[var(--color-border)]"
        >
          <p className="text-sm text-[var(--color-text-muted)] mb-6">
            Trusted by forward-thinking teams
          </p>
          <div className="flex items-center justify-center gap-12 text-[var(--color-text-muted)]">
            <span className="text-xl font-semibold">Company</span>
            <span className="text-xl font-semibold">Startup</span>
            <span className="text-xl font-semibold">Agency</span>
            <span className="hidden sm:block text-xl font-semibold">Studio</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
