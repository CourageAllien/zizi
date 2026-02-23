"use client";

import { motion } from "framer-motion";
import AnimateOnScroll from "../partner/AnimateOnScroll";
import { Check, X } from "lucide-react";

export default function WhoThisIsFor() {
  return (
    <section id="who-this-is-for" className="py-20 md:py-32 bg-[var(--color-bg-primary)]">
      <div className="max-w-4xl mx-auto px-6">
        <AnimateOnScroll>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
            Who This Is For
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-primary)]/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">
                This is for you if:
              </h3>
              <ul className="space-y-4">
                {[
                  "You have a proven high-ticket offer ($5k+)",
                  "You're tired of inconsistent, referral-dependent lead gen",
                  "You want to be seen as the authority in your space",
                  "You're ready to let a tool do the heavy lifting for you",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-[var(--color-primary)] flex-shrink-0 mt-0.5" />
                    <span className="text-[var(--color-text-secondary)]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">
                This is NOT for you if:
              </h3>
              <ul className="space-y-4">
                {[
                  "You don't have a clear offer yet",
                  "You're looking for a quick fix with no follow-through",
                  "You want to stay anonymous — these tools put your thinking out in the world",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <X className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
                    <span className="text-[var(--color-text-secondary)]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}

