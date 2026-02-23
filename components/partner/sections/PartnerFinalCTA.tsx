"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import AnimateOnScroll from "../AnimateOnScroll";

export default function PartnerFinalCTA() {
  return (
    <section className="py-24 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#22c55e]/5 rounded-full blur-[120px]" />
      </div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-4xl mx-auto px-6 relative">
        <AnimateOnScroll>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to stop scrambling?
            </h2>
            <p className="text-lg md:text-xl text-[#a1a1a1] max-w-2xl mx-auto">
              Every campaign needs assets. Let us build them for you — starting
              today.
            </p>
          </div>
        </AnimateOnScroll>

        {/* Two Paths */}
        <AnimateOnScroll delay={0.1}>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Trial Path */}
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-[#141414] border border-[#262626] rounded-2xl p-8 text-center group hover:border-[#22c55e]/30 transition-all duration-300"
            >
              <h3 className="text-xl font-semibold text-white mb-2">
                Start with a trial
              </h3>
              <p className="text-[#a1a1a1] mb-6">
                One build. $750. See if we're the right fit.
              </p>
              <a
                href="#trial-form"
                className="inline-flex items-center gap-2 px-6 py-3 text-[#22c55e] border border-[#22c55e]/30 rounded-xl font-medium hover:bg-[#22c55e]/10 transition-all duration-200"
              >
                Start Trial Build
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>

            {/* Partnership Path */}
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-gradient-to-b from-[#141414] to-[#0d1a0d] border border-[#22c55e]/30 rounded-2xl p-8 text-center relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#22c55e]/10 rounded-full blur-[40px]" />
              <div className="relative">
                <h3 className="text-xl font-semibold text-white mb-2">
                  Become a partner
                </h3>
                <p className="text-[#a1a1a1] mb-6">
                  $2,500/month. Your always-on sales asset team.
                </p>
                <a
                  href="/partner/book"
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-[#22c55e] text-white rounded-xl font-medium hover:bg-[#16a34a] transition-all duration-200"
                >
                  Book a Call
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          </div>
        </AnimateOnScroll>

        {/* Reassurance */}
        <AnimateOnScroll delay={0.2}>
          <p className="text-center text-[#737373]">
            No contracts. No lock-in. Just great work, fast.
          </p>
        </AnimateOnScroll>
      </div>
    </section>
  );
}

