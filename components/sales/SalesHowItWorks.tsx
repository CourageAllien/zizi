"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CreditCard, MessageSquarePlus, Zap, RefreshCw } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Subscribe",
    description: "Pick a plan that fits your pipeline. Get instant access to your request board.",
    icon: CreditCard,
  },
  {
    number: "02",
    title: "Request",
    description: "Tell us what you need. ROI calculator? Interactive demo? Lead magnet? Add as many requests as you want to your queue.",
    icon: MessageSquarePlus,
  },
  {
    number: "03",
    title: "Receive",
    description: "We build it with AI-native speed. Most requests delivered in 48-72 hours.",
    icon: Zap,
  },
  {
    number: "04",
    title: "Revise",
    description: "Not perfect? Unlimited revisions until you love it. We don't stop until it closes deals.",
    icon: RefreshCw,
  },
];

export default function SalesHowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-[var(--color-bg-primary)] relative overflow-hidden scroll-mt-20">
      {/* Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[150px] -z-10" />
      
      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-sm font-medium text-emerald-400 mb-6">
            Simple Process
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            How It Works
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent -translate-y-1/2" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="relative"
                >
                  <div className="h-full p-6 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-2xl hover:border-emerald-500/30 transition-all duration-300 group">
                    {/* Icon Container */}
                    <div className="relative mb-6">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-6 h-6 text-emerald-400" />
                      </div>
                      {/* Step Number Badge */}
                      <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center text-xs font-bold text-white shadow-lg shadow-emerald-500/30">
                        {index + 1}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-xl font-semibold text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}


