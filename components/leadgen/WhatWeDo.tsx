"use client";

import { motion } from "framer-motion";
import AnimateOnScroll from "../partner/AnimateOnScroll";
import { Check } from "lucide-react";

export default function WhatWeDo() {
  return (
    <section id="what-we-do" className="py-20 md:py-32 bg-[var(--color-bg-primary)]">
      <div className="max-w-4xl mx-auto px-6">
        <AnimateOnScroll>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 text-center">
            What We Do
          </h2>
          <p className="text-xl text-[var(--color-text-secondary)] text-center mb-12 leading-relaxed">
            We are a dedicated tool-building partner for high-ticket coaches, consultants, and service businesses.
          </p>
          <p className="text-lg text-white text-center mb-8 font-semibold">
            You tell us what you need.
            <br />
            We build it.
            <br />
            You give it away.
            <br />
            It brings in leads.
          </p>
          <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-2xl p-8 mt-12">
            <p className="text-lg font-semibold text-white mb-6">
              Every month, you get:
            </p>
            <ul className="space-y-4">
              {[
                "Unlimited tool builds (one active request at a time)",
                "Strategy included — we figure out what to build and why",
                "Full design and development handled for you",
                "Conversion-focused — every tool is built to move people toward your paid offer",
                "Iterations and refinements as you learn what works",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-[var(--color-primary)] flex-shrink-0 mt-0.5" />
                  <span className="text-[var(--color-text-secondary)]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}

