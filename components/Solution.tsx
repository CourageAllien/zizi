"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Tell us what you need",
    description:
      "A new AI system, a feature prototype, or just an idea you want to test. Submit through Slack, email, or our portal.",
  },
  {
    number: "02",
    title: "We design the solution",
    description:
      "Within 48 hours, you get a clear plan: what we'll build, how it'll work, and what you need to provide.",
  },
  {
    number: "03",
    title: "We build it — fast",
    description:
      "Prototypes in days, not months. Test features before you commit. Ship working software your team can learn from.",
  },
  {
    number: "04",
    title: "We maintain it forever",
    description:
      "Things break. APIs change. We fix it. No extra charges. Your systems keep running, you keep focused on growth.",
  },
];

export default function Solution() {
  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-[var(--color-bg-primary)]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/30 rounded-full text-sm font-medium text-[var(--color-primary)] mb-6">
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6">
            From problem to solution
            <br />
            <span className="text-[var(--color-text-muted)]">in days, not months</span>
          </h2>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-xl mx-auto">
            We handle everything — from understanding your workflow to building, deploying, and
            maintaining your AI systems.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-8 rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] hover:border-[var(--color-primary)]/30 transition-all card-hover"
            >
              <span className="block text-5xl font-bold text-[var(--color-primary)]/20 mb-6 group-hover:text-[var(--color-primary)]/40 transition-colors">
                {step.number}
              </span>
              <h3 className="text-xl font-semibold text-white mb-4">{step.title}</h3>
              <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

