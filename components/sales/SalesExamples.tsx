"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Clock, TrendingUp, Calendar, FileText } from "lucide-react";

const examples = [
  {
    icon: TrendingUp,
    title: "Preview Tool for a B2B SaaS",
    problem: 'Prospects kept asking "what\'s the ROI?" and "how do we compare to others?" on sales calls. Reps gave vague answers. Deals stalled.',
    solution: "A preview tool that lets prospects input their team size, current costs, and time spent on manual tasks — then shows (1) how the product fits their workflow, (2) projected savings over 12 months, and (3) how they compare to industry benchmarks.",
    results: [
      "47% of preview tool users booked a demo",
      "Close rate increased 28%",
      "Sales cycle shortened because prospects came pre-educated",
    ],
    buildTime: "3 days",
  },
  {
    icon: FileText,
    title: "Sales Maturity Assessment for a Consulting Firm",
    problem: "The founder was spending 45 minutes on every discovery call asking the same questions.",
    solution: "A 12-question assessment that scores prospects on sales maturity, identifies gaps, and generates a personalized report — before the first call.",
    results: [
      "Discovery calls dropped to 20 minutes",
      "Founder knew exactly what to pitch before prospects said a word",
    ],
    buildTime: "2 days",
  },
  {
    icon: Calendar,
    title: "Interactive Demo for a Workflow Tool",
    problem: 'Prospects wanted to "see it in action" but the product required onboarding to understand.',
    solution: "A guided sandbox where prospects could complete a sample workflow themselves, with tooltips and a progress bar.",
    results: [
      "Prospects came to demo calls already sold",
      "Sales cycle shortened by 40%",
    ],
    buildTime: "5 days",
  },
  {
    icon: Clock,
    title: "Proposal Generator for an Agency",
    problem: "Custom proposals took 3-4 hours each. Half the deals went cold waiting.",
    solution: "An intake form that feeds into an AI-powered proposal generator. Client info in, branded proposal out in 2 minutes.",
    results: [
      "Proposals sent same-day",
      "Win rate increased 22%",
    ],
    buildTime: "4 days",
  },
];

export default function SalesExamples() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="examples" className="py-24 md:py-32 bg-[var(--color-bg-primary)] relative overflow-hidden scroll-mt-20">
      {/* Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[150px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-500/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-sm font-medium text-emerald-400 mb-6">
            Case Studies
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            See It In Action
          </h2>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-xl mx-auto">
            Here&apos;s what we&apos;ve built for sales teams like yours.
          </p>
        </motion.div>

        {/* Examples Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {examples.map((example, index) => {
            const Icon = example.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="h-full p-8 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] hover:border-emerald-500/30 rounded-2xl transition-all duration-300">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-emerald-400 transition-colors">
                        {example.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-emerald-400" />
                        <span className="text-sm text-emerald-400 font-medium">
                          Built in {example.buildTime}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Problem */}
                  <div className="mb-4">
                    <p className="text-xs text-red-400 uppercase tracking-wider font-medium mb-2">
                      The Problem
                    </p>
                    <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                      {example.problem}
                    </p>
                  </div>

                  {/* Solution */}
                  <div className="mb-4">
                    <p className="text-xs text-emerald-400 uppercase tracking-wider font-medium mb-2">
                      What We Built
                    </p>
                    <p className="text-white text-sm leading-relaxed">
                      {example.solution}
                    </p>
                  </div>

                  {/* Results */}
                  <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                    <p className="text-xs text-emerald-400 uppercase tracking-wider font-medium mb-3">
                      The Result
                    </p>
                    <ul className="space-y-2">
                      {example.results.map((result, resultIndex) => (
                        <li key={resultIndex} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                          <span className="text-white text-sm">{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
