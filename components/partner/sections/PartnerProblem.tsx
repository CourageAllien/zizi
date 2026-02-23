"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, DollarSign, RefreshCw } from "lucide-react";
import AnimateOnScroll from "../AnimateOnScroll";

const problems = [
  {
    icon: Calendar,
    title: "New campaign, same scramble",
    description:
      "Every launch needs landing pages, calculators, lead magnets. Your team scrambles every time.",
  },
  {
    icon: Clock,
    title: "Developers are too slow",
    description:
      "Request a simple calculator. Wait 3 weeks. Get something that doesn't quite work.",
  },
  {
    icon: DollarSign,
    title: "Agencies are too expensive",
    description:
      "$20K for a landing page and a calculator? And they disappear after delivery?",
  },
  {
    icon: RefreshCw,
    title: "It never ends",
    description:
      "You need assets for THIS campaign. Then the next one. Then the next. It's constant.",
  },
];

export default function PartnerProblem() {
  return (
    <section className="py-24 bg-[#0a0a0a] relative">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#141414]/30 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 relative">
        <AnimateOnScroll>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Sound familiar?
            </h2>
            <p className="text-lg text-[#a1a1a1] max-w-2xl mx-auto">
              Every campaign needs assets. But building them is a nightmare.
            </p>
          </div>
        </AnimateOnScroll>

        {/* Problem Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {problems.map((problem, index) => (
            <AnimateOnScroll key={index} delay={index * 0.1}>
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                className="bg-[#141414] border border-[#262626] rounded-2xl p-6 group hover:border-[#22c55e]/30 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center group-hover:bg-[#22c55e]/10 transition-colors">
                    <problem.icon className="w-6 h-6 text-red-400 group-hover:text-[#22c55e] transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {problem.title}
                    </h3>
                    <p className="text-[#a1a1a1] leading-relaxed">
                      {problem.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimateOnScroll>
          ))}
        </div>

        {/* Closing Statement */}
        <AnimateOnScroll delay={0.4}>
          <div className="text-center">
            <p className="text-xl md:text-2xl font-medium text-white max-w-3xl mx-auto">
              You don't need a vendor.{" "}
              <span className="text-[#22c55e]">
                You need a partner who's always building with you.
              </span>
            </p>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}

