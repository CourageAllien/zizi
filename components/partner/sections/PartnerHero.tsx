"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function PartnerHero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 bg-[#0a0a0a]">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-[#22c55e]/8 rounded-full blur-[150px] -z-10" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#3b82f6]/8 rounded-full blur-[120px] -z-10" />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-[#22c55e]/5 rounded-full blur-[100px] -z-10" />

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#22c55e]/10 border border-[#22c55e]/30 rounded-full text-sm font-medium text-[#22c55e] mb-8">
            <Sparkles className="w-4 h-4" />
            Your Sales & Marketing Partner
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-8 leading-[1.1]"
        >
          We'll help you build{" "}
          <span className="bg-gradient-to-r from-[#22c55e] to-[#4ade80] bg-clip-text text-transparent">
            AI-powered sales assets and tools
          </span>{" "}
          for your marketing and sales campaigns
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-[#a1a1a1] max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          Preview tools. Interactive demos. Proposal generators. Campaign
          assets. We build what you need to convert more leads — and keep
          building as your campaigns evolve.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
        >
          <a
            href="#trial-form"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-[#22c55e] text-white font-semibold rounded-xl hover:bg-[#16a34a] transition-all duration-300 shadow-lg shadow-[#22c55e]/25 hover:shadow-[#22c55e]/40"
          >
            Start Trial — $750
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="/partner/book"
            className="inline-flex items-center gap-2 px-8 py-4 text-white font-medium border border-white/20 rounded-xl hover:bg-white/5 transition-all duration-300"
          >
            Book a Call
          </a>
        </motion.div>

        {/* Trust Line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-sm text-[#737373]"
        >
          Try us risk-free. Love the first build?{" "}
          <span className="text-[#22c55e]">
            Become a partner at $2,500/mo.
          </span>
        </motion.p>

        {/* Visual Element - Abstract Shapes */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 relative"
        >
          <div className="relative mx-auto max-w-4xl">
            {/* Mockup Cards */}
            <div className="grid grid-cols-3 gap-4">
              {/* Card 1 - Calculator Preview */}
              <div className="bg-[#141414] border border-[#262626] rounded-xl p-4 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="h-2 w-16 bg-[#22c55e]/30 rounded mb-3" />
                <div className="space-y-2">
                  <div className="h-6 bg-[#262626] rounded" />
                  <div className="h-6 bg-[#262626] rounded w-3/4" />
                </div>
                <div className="mt-4 h-8 bg-[#22c55e]/20 rounded-lg flex items-center justify-center">
                  <span className="text-xs text-[#22c55e]">Calculate ROI</span>
                </div>
              </div>

              {/* Card 2 - Demo Preview */}
              <div className="bg-[#141414] border border-[#262626] rounded-xl p-4 transform scale-110 hover:scale-115 transition-transform duration-300 shadow-2xl z-10">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500" />
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gradient-to-r from-[#22c55e]/30 to-transparent rounded" />
                  <div className="h-4 bg-[#262626] rounded w-5/6" />
                  <div className="h-4 bg-[#262626] rounded w-2/3" />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="h-12 bg-[#262626] rounded" />
                  <div className="h-12 bg-[#22c55e]/20 rounded" />
                </div>
              </div>

              {/* Card 3 - Landing Page Preview */}
              <div className="bg-[#141414] border border-[#262626] rounded-xl p-4 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="h-8 bg-gradient-to-r from-[#3b82f6]/20 to-[#22c55e]/20 rounded mb-3" />
                <div className="space-y-2">
                  <div className="h-3 bg-[#262626] rounded" />
                  <div className="h-3 bg-[#262626] rounded w-4/5" />
                </div>
                <div className="mt-4 flex gap-2">
                  <div className="flex-1 h-6 bg-[#22c55e]/30 rounded" />
                  <div className="flex-1 h-6 bg-[#262626] rounded" />
                </div>
              </div>
            </div>

            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent pointer-events-none" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

