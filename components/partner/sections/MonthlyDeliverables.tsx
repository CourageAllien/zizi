"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import AnimateOnScroll from "../AnimateOnScroll";

const deliverables = [
  {
    title: "New builds as you need them",
    description:
      "Calculators, landing pages, demos, lead magnets — whatever your campaigns require.",
  },
  {
    title: "Optimization & A/B testing",
    description:
      "We don't just build and forget. We test, tweak, and improve.",
  },
  {
    title: "Performance reporting",
    description:
      "Monthly report on what's working, what's not, and what to build next.",
  },
  {
    title: "Weekly strategy sync",
    description:
      "30-minute call to plan builds, review results, and align on priorities.",
  },
  {
    title: "Dedicated Slack channel",
    description: "Quick questions, urgent requests, async communication.",
  },
  {
    title: "Unlimited revisions",
    description: "We iterate until you love it. No extra charges.",
  },
  {
    title: "You own everything",
    description: "Code, designs, assets — 100% yours. No lock-in.",
  },
];

export default function MonthlyDeliverables() {
  return (
    <section className="py-24 bg-[#0a0a0a] relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#141414]/20 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 relative">
        <AnimateOnScroll>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What You Get Every Month
            </h2>
            <p className="text-lg text-[#a1a1a1] max-w-2xl mx-auto">
              Not just builds. A complete sales asset function.
            </p>
          </div>
        </AnimateOnScroll>

        {/* Deliverables Grid */}
        <div className="grid md:grid-cols-2 gap-4 mb-12">
          {deliverables.map((item, index) => (
            <AnimateOnScroll key={index} delay={index * 0.05}>
              <motion.div
                whileHover={{ x: 4 }}
                className="flex items-start gap-4 bg-[#141414] border border-[#262626] rounded-xl p-5 group hover:border-[#22c55e]/30 transition-all duration-300"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#22c55e]/10 flex items-center justify-center group-hover:bg-[#22c55e]/20 transition-colors">
                  <Check className="w-4 h-4 text-[#22c55e]" />
                </div>
                <div>
                  <h4 className="text-base font-semibold text-white mb-1">
                    {item.title}
                  </h4>
                  <p className="text-sm text-[#a1a1a1] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            </AnimateOnScroll>
          ))}
        </div>

        {/* Bottom Note */}
        <AnimateOnScroll delay={0.4}>
          <div className="text-center">
            <p className="text-[#a1a1a1] text-lg">
              Think of us as{" "}
              <span className="text-white font-medium">
                your sales asset team
              </span>{" "}
              — without the hiring, managing, or overhead.
            </p>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}

