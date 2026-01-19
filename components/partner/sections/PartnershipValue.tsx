"use client";

import { motion } from "framer-motion";
import { X, Check, Rocket, Brain, TrendingUp } from "lucide-react";
import AnimateOnScroll from "../AnimateOnScroll";

const alternatives = [
  { label: "One-time freelancers", result: "Gone after delivery" },
  { label: "Expensive agencies", result: "$20K+ per project" },
  { label: "Internal developers", result: "Weeks of back-and-forth" },
  { label: "DIY no-code", result: "Amateur results, your time wasted" },
];

const partnership = [
  { label: "Always available", result: "New asset? 48-72 hours." },
  { label: "Predictable cost", result: "$2,500/mo for unlimited requests" },
  { label: "Continuous improvement", result: "We optimize what we build" },
  { label: "True partnership", result: "Weekly calls, Slack, embedded support" },
];

const valueCards = [
  {
    icon: Rocket,
    title: "Campaign-Ready",
    description:
      "Every campaign needs assets. We're always ready to build them.",
  },
  {
    icon: Brain,
    title: "Never Start Over",
    description:
      "We know your brand, your voice, your tools. No re-explaining.",
  },
  {
    icon: TrendingUp,
    title: "Compounding Value",
    description:
      "Each asset builds on the last. Your system gets stronger every month.",
  },
];

export default function PartnershipValue() {
  return (
    <section className="py-24 bg-[#0a0a0a] relative">
      {/* Background accent */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#22c55e]/5 rounded-full blur-[120px]" />

      <div className="max-w-6xl mx-auto px-6 relative">
        <AnimateOnScroll>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Partner With Us?
            </h2>
            <p className="text-lg text-[#a1a1a1] max-w-2xl mx-auto">
              A subscription that grows with your campaigns
            </p>
          </div>
        </AnimateOnScroll>

        {/* Comparison */}
        <AnimateOnScroll delay={0.1}>
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {/* The Alternative */}
            <div className="bg-[#141414] border border-[#262626] rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-[#737373] mb-6 flex items-center gap-2">
                <X className="w-5 h-5 text-red-400" />
                The Alternative
              </h3>
              <div className="space-y-4">
                {alternatives.map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-[#262626] last:border-0">
                    <span className="text-[#a1a1a1]">{item.label}</span>
                    <span className="text-red-400 text-sm">{item.result}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Partnership */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="bg-gradient-to-b from-[#141414] to-[#0d1a0d] border border-[#22c55e]/30 rounded-2xl p-6 relative overflow-hidden"
            >
              {/* Glow effect */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#22c55e]/20 rounded-full blur-[60px]" />

              <h3 className="text-lg font-semibold text-[#22c55e] mb-6 flex items-center gap-2 relative">
                <Check className="w-5 h-5" />
                Partnership
              </h3>
              <div className="space-y-4 relative">
                {partnership.map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-[#22c55e]/10 last:border-0">
                    <span className="text-white">{item.label}</span>
                    <span className="text-[#22c55e] text-sm">{item.result}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </AnimateOnScroll>

        {/* Value Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {valueCards.map((card, index) => (
            <AnimateOnScroll key={index} delay={0.2 + index * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                className="bg-[#141414] border border-[#262626] rounded-xl p-6 text-center group hover:border-[#22c55e]/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[#22c55e]/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#22c55e]/20 transition-colors">
                  <card.icon className="w-6 h-6 text-[#22c55e]" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  {card.title}
                </h4>
                <p className="text-[#a1a1a1] text-sm leading-relaxed">
                  {card.description}
                </p>
              </motion.div>
            </AnimateOnScroll>
          ))}
        </div>

        {/* Pull Quote */}
        <AnimateOnScroll delay={0.5}>
          <div className="text-center">
            <p className="text-xl md:text-2xl font-medium text-white">
              Stop scrambling before every launch.{" "}
              <span className="text-[#22c55e]">
                Have a team that's always ready.
              </span>
            </p>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
