"use client";

import { motion } from "framer-motion";

const problems = [
  {
    pain: "You know AI could help your business",
    detail: "But figuring out where to start feels like a full-time job",
  },
  {
    pain: "You've tried ChatGPT for a few things",
    detail: "It works... sometimes. But it's not a system. It's just you, copy-pasting.",
  },
  {
    pain: "You don't have an AI team",
    detail: "Hiring is slow, expensive, and you're not even sure what role to hire for",
  },
  {
    pain: "You've talked to agencies",
    detail: "$50K for a 'discovery phase' and a roadmap you could have drawn yourself",
  },
  {
    pain: "Your team is drowning in repetitive work",
    detail: "Data entry, report generation, email responses, follow-ups...",
  },
];

export default function Problem() {
  return (
    <section className="py-24 md:py-32 bg-[var(--color-bg-secondary)] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[var(--color-accent)]/5 to-transparent" />

      <div className="max-w-5xl mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <span className="inline-block px-4 py-2 bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/30 rounded-full text-sm font-medium text-[var(--color-accent)] mb-6">
            Sound familiar?
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6">
            You know AI could transform your business.
          </h2>
          <p className="text-xl text-[var(--color-text-muted)]">
            But getting there? That&apos;s the hard part.
          </p>
        </motion.div>

        <div className="grid gap-4 md:gap-6">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex items-start gap-5 p-6 rounded-2xl bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] hover:border-[var(--color-primary)]/30 transition-all cursor-default"
            >
              <span className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] text-white text-sm font-bold flex items-center justify-center">
                {index + 1}
              </span>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[var(--color-primary)] transition-colors">
                  {problem.pain}
                </h3>
                <p className="text-[var(--color-text-secondary)]">{problem.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 pt-12 border-t border-[var(--color-border)]"
        >
          <p className="text-xl md:text-2xl text-[var(--color-text-secondary)] max-w-2xl">
            You don&apos;t need another tool. You don&apos;t need a consultant. 
            <span className="text-white font-medium"> You need someone who just builds the thing.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}


