"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Phone, Shield, Wrench, Calendar } from "lucide-react";

// Stripe payment link for starter plan
const STRIPE_STARTER_LINK = "https://buy.stripe.com/your-starter-link";

const trustBadges = [
  { icon: Wrench, text: "Unlimited builds" },
  { icon: Shield, text: "Maintained forever" },
  { icon: Calendar, text: "Cancel anytime" },
];

export default function SalesFinalCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 bg-[var(--color-bg-primary)] relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[200px] -z-10" />

      <div className="max-w-4xl mx-auto px-6 text-center" ref={ref}>
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
        >
          Ready to close more deals?
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg md:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-10"
        >
          Your competitors are still sending PDFs and hoping for the best.{" "}
          <span className="text-white">
            You could have custom tools closing deals by next week.
          </span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <a
            href={STRIPE_STARTER_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 flex items-center gap-2"
          >
            Subscribe — $2,500/mo
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="/sales/book"
            className="px-8 py-4 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] hover:border-emerald-500/30 text-white font-semibold rounded-xl transition-all flex items-center gap-2"
          >
            <Phone className="w-4 h-4" />
            Book an Intro Call
          </a>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-6 md:gap-8"
        >
          {trustBadges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <div key={index} className="flex items-center gap-2 text-[var(--color-text-secondary)]">
                <Icon className="w-4 h-4 text-emerald-400" />
                <span className="text-sm">{badge.text}</span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}


