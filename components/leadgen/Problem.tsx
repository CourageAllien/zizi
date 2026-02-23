"use client";

import { motion } from "framer-motion";
import { AnimateOnScroll } from "../partner/AnimateOnScroll";

export default function LeadGenProblem() {
  return (
    <section id="problem" className="py-20 md:py-32 bg-[var(--color-bg-primary)]">
      <div className="max-w-4xl mx-auto px-6">
        <AnimateOnScroll>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 text-center">
            The Problem
          </h2>
          <p className="text-xl md:text-2xl text-[var(--color-text-secondary)] text-center mb-12 leading-relaxed">
            Your best clients didn&apos;t find you because of a cold DM.
            <br />
            They found you because something made them trust you first.
          </p>
          <p className="text-lg text-[var(--color-text-secondary)] text-center max-w-2xl mx-auto leading-relaxed">
            But right now, your lead gen relies on referrals you can&apos;t control, content that takes hours to produce, and sales calls with people who aren&apos;t sure you&apos;re the right fit yet.
          </p>
          <p className="text-xl md:text-2xl font-semibold text-[var(--color-primary)] text-center mt-12">
            There&apos;s a better way to show up.
          </p>
        </AnimateOnScroll>
      </div>
    </section>
  );
}

