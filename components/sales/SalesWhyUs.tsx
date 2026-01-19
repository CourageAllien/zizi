"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Target, Zap, RefreshCw, TrendingUp, Key } from "lucide-react";

const differentiators = [
  {
    icon: Target,
    title: "Sales-Obsessed",
    description: 'We don\'t build "apps." We build revenue. Every tool is designed to move prospects through your pipeline faster.',
  },
  {
    icon: Zap,
    title: "AI-Native Speed",
    description: "We're not a dev shop bolting on AI. We build with Claude, Cursor, and the latest AI tools — which means days, not weeks.",
  },
  {
    icon: RefreshCw,
    title: "Unlimited Revisions",
    description: "We don't stop until it closes deals. Hate the copy? Change it. Want a new flow? Done. No extra charges.",
  },
  {
    icon: TrendingUp,
    title: "Built for Scale",
    description: "Need one tool? Great. Need twenty? We've got you. Our subscription model means you can build your entire sales toolkit over time.",
  },
  {
    icon: Key,
    title: "You Own Everything",
    description: "Every tool we build is yours. Your domain. Your branding. Your data. No lock-in, no hostage situations.",
  },
];

export default function SalesWhyUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 bg-[var(--color-bg-primary)] relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[150px] -z-10" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-teal-500/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-sm font-medium text-emerald-400 mb-6">
            The Difference
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Why Sales Teams Choose Us
          </h2>
        </motion.div>

        {/* Differentiators Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {differentiators.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group ${index === 4 ? "md:col-span-2 lg:col-span-1" : ""}`}
              >
                <div className="h-full p-8 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] hover:border-emerald-500/30 rounded-2xl transition-all duration-300 hover:-translate-y-1">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-emerald-400" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-emerald-400 transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[var(--color-text-secondary)] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
