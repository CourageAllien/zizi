"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Zap, Users, MessageSquare } from "lucide-react";

const benefits = [
  {
    icon: Users,
    text: "No developers needed",
  },
  {
    icon: MessageSquare,
    text: "No project managers",
  },
  {
    icon: Zap,
    text: "No endless back-and-forth",
  },
];

export default function SalesSolution() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 bg-[var(--color-bg-secondary)] relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[150px] -z-10" />
      
      <div className="max-w-5xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Badge */}
          <span className="inline-block px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-sm font-medium text-emerald-400 mb-8">
            The Solution
          </span>

          {/* Header */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            We build your{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              unfair sales advantage.
            </span>
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl text-[var(--color-text-secondary)] max-w-3xl mx-auto leading-relaxed mb-10">
            Tell us who you&apos;re selling to. We build custom AI-powered tools that convert prospects 
            into customers — <span className="text-emerald-400 font-medium">delivered in 48-72 hours</span>, not weeks.
          </p>

          {/* Benefits */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-2 px-5 py-3 bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-full"
                >
                  <Icon className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm text-[var(--color-text-secondary)]">{benefit.text}</span>
                </motion.div>
              );
            })}
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-2xl md:text-3xl font-bold text-white"
          >
            Just sales tools that work.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
