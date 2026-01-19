"use client";

import { motion } from "framer-motion";
import { Zap, RefreshCw, Users } from "lucide-react";
import AnimateOnScroll from "../AnimateOnScroll";

const pillars = [
  {
    icon: Zap,
    title: "Fast Builds",
    description:
      "New campaign? New tool in 48-72 hours. Not weeks. Not months.",
  },
  {
    icon: RefreshCw,
    title: "Always On",
    description:
      "We're not done after one build. We keep building, optimizing, and supporting.",
  },
  {
    icon: Users,
    title: "True Partnership",
    description:
      "Weekly syncs. Slack access. We're part of your team, not an outside vendor.",
  },
];

export default function PartnerSolution() {
  return (
    <section className="py-24 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-6">
        <AnimateOnScroll>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              A partner, not a vendor
            </h2>
            <p className="text-lg text-[#a1a1a1] max-w-2xl mx-auto">
              We embed with your team and build the sales assets you need —
              campaign after campaign.
            </p>
          </div>
        </AnimateOnScroll>

        {/* Value Pillars */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {pillars.map((pillar, index) => (
            <AnimateOnScroll key={index} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                className="bg-gradient-to-b from-[#141414] to-[#0a0a0a] border border-[#262626] rounded-2xl p-8 text-center group hover:border-[#22c55e]/30 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#22c55e]/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-[#22c55e]/20 transition-colors">
                  <pillar.icon className="w-8 h-8 text-[#22c55e]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {pillar.title}
                </h3>
                <p className="text-[#a1a1a1] leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            </AnimateOnScroll>
          ))}
        </div>

        {/* Callout Box */}
        <AnimateOnScroll delay={0.3}>
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#22c55e]/50 to-[#3b82f6]/50 rounded-2xl blur opacity-30" />
            <div className="relative bg-[#141414] border border-[#22c55e]/20 rounded-2xl p-8 text-center">
              <p className="text-lg md:text-xl text-white font-medium">
                Every marketing campaign. Every sales push. Every product
                launch.{" "}
                <span className="text-[#22c55e]">
                  We build the assets that convert.
                </span>
              </p>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
