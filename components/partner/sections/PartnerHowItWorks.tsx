"use client";

import { motion } from "framer-motion";
import { MessageSquare, Rocket, ThumbsUp, Building, LineChart, Headphones, ArrowDown } from "lucide-react";
import AnimateOnScroll from "../AnimateOnScroll";

const trialSteps = [
  {
    icon: MessageSquare,
    step: "1",
    title: "Tell us what you need",
    description:
      "Describe the tool or asset. A calculator, demo, landing page — whatever your campaign needs.",
  },
  {
    icon: Rocket,
    step: "2",
    title: "We build it",
    description:
      "In 5-7 days, you get a fully functional, branded asset ready to deploy.",
  },
  {
    icon: ThumbsUp,
    step: "3",
    title: "You decide",
    description:
      "Love it? Let's talk partnership. Not convinced? No pressure.",
  },
];

const partnershipSteps = [
  {
    icon: Building,
    step: "4",
    title: "Ongoing builds",
    description:
      "Every month, we build new assets for your campaigns. Calculators, demos, landing pages, lead magnets.",
  },
  {
    icon: LineChart,
    step: "5",
    title: "Continuous optimization",
    description:
      "We don't just build and leave. We optimize, A/B test, and improve what's working.",
  },
  {
    icon: Headphones,
    step: "6",
    title: "True embedded support",
    description:
      "Weekly syncs. Slack channel. We're your always-on sales asset team.",
  },
];

export default function PartnerHowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-[#0a0a0a] scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <AnimateOnScroll>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-lg text-[#a1a1a1] max-w-2xl mx-auto">
              Start with a trial build. Love it? Become a partner.
            </p>
          </div>
        </AnimateOnScroll>

        {/* Phase 1: Trial */}
        <AnimateOnScroll delay={0.1}>
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="px-4 py-2 bg-[#262626] rounded-lg">
                <span className="text-sm font-semibold text-[#a1a1a1]">
                  PHASE 1
                </span>
              </div>
              <h3 className="text-xl font-semibold text-white">Trial — $750</h3>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {trialSteps.map((step, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -4 }}
                  className="relative bg-[#141414] border border-[#262626] rounded-2xl p-6 group hover:border-[#737373]/50 transition-all duration-300"
                >
                  <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-[#262626] flex items-center justify-center text-sm font-bold text-white">
                    {step.step}
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-[#262626] flex items-center justify-center mb-4 group-hover:bg-[#333] transition-colors">
                    <step.icon className="w-6 h-6 text-[#a1a1a1]" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    {step.title}
                  </h4>
                  <p className="text-[#a1a1a1] text-sm leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimateOnScroll>

        {/* Arrow Separator */}
        <AnimateOnScroll delay={0.2}>
          <div className="flex justify-center my-12">
            <div className="flex flex-col items-center gap-2 text-[#22c55e]">
              <ArrowDown className="w-8 h-8 animate-bounce" />
              <span className="text-sm font-medium">Love it?</span>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Phase 2: Partnership */}
        <AnimateOnScroll delay={0.3}>
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="px-4 py-2 bg-[#22c55e]/20 rounded-lg">
                <span className="text-sm font-semibold text-[#22c55e]">
                  PHASE 2
                </span>
              </div>
              <h3 className="text-xl font-semibold text-white">
                Partnership — $2,500/mo
              </h3>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {partnershipSteps.map((step, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -4 }}
                  className="relative bg-gradient-to-b from-[#141414] to-[#0d1a0d] border border-[#22c55e]/20 rounded-2xl p-6 group hover:border-[#22c55e]/40 transition-all duration-300"
                >
                  <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-[#22c55e] flex items-center justify-center text-sm font-bold text-white">
                    {step.step}
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-[#22c55e]/10 flex items-center justify-center mb-4 group-hover:bg-[#22c55e]/20 transition-colors">
                    <step.icon className="w-6 h-6 text-[#22c55e]" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    {step.title}
                  </h4>
                  <p className="text-[#a1a1a1] text-sm leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}

