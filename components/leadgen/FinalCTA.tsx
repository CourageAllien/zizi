"use client";

import { motion } from "framer-motion";
import { AnimateOnScroll } from "../partner/AnimateOnScroll";
import Link from "next/link";

export default function LeadGenFinalCTA() {
  return (
    <section className="py-20 md:py-32 bg-[var(--color-bg-primary)]">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <AnimateOnScroll>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Your competitors are still cold pitching.
            <br />
            You could be sending them a tool that sells for you.
          </h2>
          <p className="text-xl text-[var(--color-text-secondary)] mb-12 mt-6">
            Start for $549. Cancel anytime. First tool live in weeks.
          </p>
          <Link
            href="/subscribe"
            className="btn-primary text-lg px-10 py-5 inline-block"
          >
            Let&apos;s Build Your First Tool
          </Link>
        </AnimateOnScroll>
      </div>
    </section>
  );
}

