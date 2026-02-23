"use client";

import { motion } from "framer-motion";
import AnimateOnScroll from "../partner/AnimateOnScroll";
import { Check } from "lucide-react";
import Link from "next/link";

export default function LeadGenPricing() {
  return (
    <section id="pricing" className="py-20 md:py-32 bg-[var(--color-bg-primary)]">
      <div className="max-w-4xl mx-auto px-6">
        <AnimateOnScroll>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 text-center">
            Pricing
          </h2>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.1}>
          <div className="bg-[var(--color-bg-secondary)] border-2 border-[var(--color-primary)] rounded-3xl p-8 md:p-12 mt-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-primary)]/10 rounded-full blur-3xl -z-10" />
            
            <div className="text-center mb-8">
              <div className="text-6xl md:text-7xl font-bold text-[var(--color-primary)] mb-2">
                $549
              </div>
              <div className="text-xl text-[var(--color-text-secondary)] mb-8">
                / month
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              {[
                "Unlimited builds (one active request at a time)",
                "Strategy included",
                "Full design and development",
                "Unlimited revisions per build",
                "Cancel anytime",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-[var(--color-primary)] flex-shrink-0 mt-0.5" />
                  <span className="text-[var(--color-text-secondary)] text-lg">{item}</span>
                </li>
              ))}
            </ul>

            <p className="text-center text-[var(--color-text-secondary)] mb-8">
              No contracts. No hidden fees. No per-project quotes.
              <br />
              Just a simple monthly partnership that pays for itself the first time it books you a call.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/subscribe"
                className="btn-primary text-center px-8 py-4"
              >
                Start for $549
              </Link>
              <Link
                href="/book"
                className="btn-secondary text-center px-8 py-4"
              >
                Book a Strategy Call First
              </Link>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}

