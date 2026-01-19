"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MailX, MonitorX, HelpCircle } from "lucide-react";

const painPoints = [
  {
    icon: MailX,
    stat: "94%",
    text: "Ignoring 94% of outreach",
  },
  {
    icon: MonitorX,
    stat: "Tomorrow",
    text: "Sitting through demos they forget by tomorrow",
  },
  {
    icon: HelpCircle,
    stat: "ROI?",
    text: 'Asking "what\'s the ROI?" and getting hand-wavy answers',
  },
];

export default function SalesProblem() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 bg-[var(--color-bg-primary)] relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-red-500/5 rounded-full blur-[150px] -z-10" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-orange-500/5 rounded-full blur-[120px] -z-10" />
      
      <div className="max-w-5xl mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Your prospects are drowning in{" "}
            <span className="text-red-400">generic sales pitches.</span>
          </h2>
          <p className="text-lg md:text-xl text-[var(--color-text-secondary)] max-w-3xl mx-auto leading-relaxed">
            Every founder and sales rep is sending the same cold emails. Booking the same demo calls. 
            Sharing the same one-pagers.
          </p>
        </motion.div>

        {/* Pain Points */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <p className="text-center text-[var(--color-text-secondary)] mb-8">
            Meanwhile, your prospects are:
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {painPoints.map((point, index) => {
              const Icon = point.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="p-6 bg-[var(--color-bg-secondary)] border border-red-500/20 hover:border-red-500/40 rounded-2xl text-center transition-all duration-300 group"
                >
                  <div className="w-14 h-14 rounded-xl bg-red-500/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-red-400" />
                  </div>
                  <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                    {point.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* The Solution Teaser */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center space-y-6"
        >
          <div className="p-8 bg-gradient-to-br from-[var(--color-bg-secondary)] to-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-2xl">
            <p className="text-lg md:text-xl text-[var(--color-text-secondary)] leading-relaxed mb-6">
              The sales teams winning right now? They&apos;re{" "}
              <span className="text-white font-medium">giving value before asking for anything</span>. 
              They&apos;re letting prospects{" "}
              <span className="text-white font-medium">experience the product</span>. 
              They&apos;re quantifying impact with{" "}
              <span className="text-emerald-400 font-medium">custom tools</span> — not slides.
            </p>
            
            <p className="text-xl md:text-2xl text-white font-medium">
              You know you need this. You just don&apos;t have time to build it.
            </p>
          </div>
          
          <p className="text-2xl md:text-3xl font-bold text-emerald-400">
            That&apos;s where we come in.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
