"use client";

import { motion } from "framer-motion";
import AnimateOnScroll from "../partner/AnimateOnScroll";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: "1",
    title: "Strategy Session",
    description: "We start with a 60-minute call to understand your offer, your ideal client, and the moment they need to experience before they hire you. We figure out exactly what to build.",
  },
  {
    number: "2",
    title: "We Build It",
    description: "You get a fully functional, branded tool — assessment, calculator, audit, scorecard, diagnostic — built to reflect your methodology and positioned around your offer. Typically live within 2–3 weeks.",
  },
  {
    number: "3",
    title: "You Deploy It",
    description: "Share it on LinkedIn. Add it to your website. Send it to cold prospects. Use it as a conversation starter. We show you how to get it in front of the right people.",
  },
  {
    number: "4",
    title: "We Iterate",
    description: "Once it's live, we watch what's working and refine. When you're ready, we build the next one. You stay one request at a time — we stay focused on what moves the needle for you.",
  },
];

export default function LeadGenHowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-32 bg-[var(--color-bg-secondary)]">
      <div className="max-w-6xl mx-auto px-6">
        <AnimateOnScroll>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 text-center">
            How It Works
          </h2>
        </AnimateOnScroll>

        <div className="mt-16 space-y-8">
          {steps.map((step, index) => (
            <AnimateOnScroll key={index} delay={index * 0.1}>
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-[var(--color-primary)]/20 border border-[var(--color-primary)]/50 flex items-center justify-center">
                    <span className="text-2xl font-bold text-[var(--color-primary)]">{step.number}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-3">
                    STEP {step.number} — {step.title}
                  </h3>
                  <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
                    {step.description}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 mt-20">
                    <ArrowRight className="w-6 h-6 text-[var(--color-primary)] rotate-90" />
                  </div>
                )}
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

