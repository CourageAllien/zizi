"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import AnimateOnScroll from "../AnimateOnScroll";

const earlyBenefits = [
  "White-glove attention for early partners",
  "Your feedback shapes how we work",
  "Lock in early pricing before we raise rates",
];

const metrics = [
  { value: "50+", label: "Tools built" },
  { value: "4 days", label: "Average delivery" },
  { value: "95%", label: "Partner retention" },
];

export default function PartnerSocialProof() {
  return (
    <section className="py-24 bg-[#0a0a0a] relative">
      {/* Background accent */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#3b82f6]/5 rounded-full blur-[100px]" />

      <div className="max-w-6xl mx-auto px-6 relative">
        <AnimateOnScroll>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What Partners Say
            </h2>
          </div>
        </AnimateOnScroll>

        {/* Early Adopter Pitch */}
        <AnimateOnScroll delay={0.1}>
          <div className="max-w-2xl mx-auto">
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="relative bg-gradient-to-b from-[#141414] to-[#0d1a0d] border border-[#22c55e]/20 rounded-2xl p-8 text-center overflow-hidden"
            >
              {/* Glow effects */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-[#22c55e]/10 rounded-full blur-[60px]" />

              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-[#22c55e]/10 flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-8 h-8 text-[#22c55e]" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-3">
                  We're just getting started
                </h3>
                <p className="text-[#a1a1a1] mb-8">
                  We're building our first partner roster. That means:
                </p>

                <ul className="space-y-4 text-left max-w-md mx-auto mb-8">
                  {earlyBenefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#22c55e]/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-[#22c55e] text-sm">✓</span>
                      </div>
                      <span className="text-white">{benefit}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="/partner/book"
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-[#22c55e] text-white font-semibold rounded-xl hover:bg-[#16a34a] transition-all duration-200"
                >
                  Book a Call
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          </div>
        </AnimateOnScroll>

        {/* Metrics */}
        <AnimateOnScroll delay={0.2}>
          <div className="grid grid-cols-3 gap-6 mt-16 max-w-2xl mx-auto">
            {metrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#22c55e] mb-2">
                  {metric.value}
                </div>
                <div className="text-sm text-[#737373]">{metric.label}</div>
              </div>
            ))}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
