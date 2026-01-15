"use client";

import { motion } from "framer-motion";

const comparisons = [
  {
    tried: "Traditional AI Agency",
    happened: "$50K+ for a 'discovery phase' and months of planning before any code is written",
    zizi: "We skip the fluff. You get working tools in days, not months.",
  },
  {
    tried: "Freelance Developer",
    happened: "Great for one project, but then they're gone. Who maintains it?",
    zizi: "We're your ongoing team. We build, maintain, and improve — forever.",
  },
  {
    tried: "No-Code/n8n Shop",
    happened: "Duct tape and bubble gum. Works until it doesn't. Then you're stuck.",
    zizi: "We use real code when needed, no-code when smart. Whatever gets you the best result.",
  },
  {
    tried: "Hire In-House",
    happened: "$150K+ salary, 3-6 months to hire, and you're not sure what role you need",
    zizi: "Skip the hiring. Get a team's worth of output for a fraction of the cost.",
  },
];

export default function Differentiation() {
  return (
    <section className="py-24 md:py-32 bg-[var(--color-bg-primary)]">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/30 rounded-full text-sm font-medium text-[var(--color-primary)] mb-6">
            Why ZiziCo
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            Not an agency. Not a freelancer.
          </h2>
          <p className="text-xl text-[var(--color-text-muted)]">Something better.</p>
        </motion.div>

        <div className="grid gap-6">
          {comparisons.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group grid md:grid-cols-3 gap-6 p-6 rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] hover:border-[var(--color-primary)]/30 transition-all"
            >
              <div className="space-y-2">
                <span className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">
                  What you tried
                </span>
                <p className="font-semibold text-white">{item.tried}</p>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-medium text-red-400 uppercase tracking-wider">
                  What happened
                </span>
                <p className="text-[var(--color-text-secondary)] text-sm">{item.happened}</p>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-medium text-[var(--color-primary)] uppercase tracking-wider">
                  The ZiziCo way
                </span>
                <p className="text-sm font-medium text-white">{item.zizi}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
