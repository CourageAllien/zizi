"use client";

import { motion } from "framer-motion";

const timeline = [
  {
    day: "Day 1",
    title: "Kickoff & First Request",
    items: [
      "Quick onboarding call (30 min)",
      "Slack channel setup",
      "Submit your first request",
      "We start working immediately",
    ],
  },
  {
    day: "Days 2-3",
    title: "Design & Scope",
    items: [
      "We analyze your workflow",
      "Design the solution architecture",
      "Present a clear plan for approval",
      "You give feedback, we refine",
    ],
  },
  {
    day: "Days 4-7",
    title: "Build & Ship",
    items: [
      "Development in progress",
      "Daily async updates in Slack",
      "Testing with your real data",
      "Deploy to production",
    ],
  },
  {
    day: "Ongoing",
    title: "Maintain & Improve",
    items: [
      "We monitor for issues",
      "Fix bugs as they appear",
      "Update when APIs change",
      "Add improvements you request",
    ],
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 md:py-32 bg-[var(--color-bg-primary)]">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/30 rounded-full text-sm font-medium text-[var(--color-accent)] mb-6">
            The Journey
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6">
            From kickoff to autopilot
          </h2>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-xl mx-auto">
            Here&apos;s exactly what happens after you sign up
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--color-primary)] via-[var(--color-accent)] to-[var(--color-primary)]" />

          <div className="space-y-8 md:space-y-0">
            {timeline.map((phase, index) => (
              <motion.div
                key={phase.day}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative md:flex md:items-start ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } md:pb-16`}
              >
                {/* Center dot */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] border-4 border-[var(--color-bg-primary)] z-10" />

                <div
                  className={`md:w-1/2 ${
                    index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"
                  }`}
                >
                  <div
                    className={`bg-[var(--color-bg-secondary)] p-8 rounded-2xl border border-[var(--color-border)] ${
                      index % 2 === 0 ? "md:ml-auto" : ""
                    } max-w-md`}
                  >
                    <span className="inline-block px-3 py-1 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white text-xs font-semibold rounded-full mb-4">
                      {phase.day}
                    </span>
                    <h3 className="text-xl font-semibold text-white mb-5">{phase.title}</h3>
                    <ul
                      className={`space-y-3 ${
                        index % 2 === 0 ? "md:text-right" : ""
                      }`}
                    >
                      {phase.items.map((item, i) => (
                        <li
                          key={i}
                          className={`flex items-center gap-3 text-sm text-[var(--color-text-secondary)] ${
                            index % 2 === 0 ? "md:justify-end" : ""
                          }`}
                        >
                          {index % 2 !== 0 && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
                          )}
                          {item}
                          {index % 2 === 0 && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


