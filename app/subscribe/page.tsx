"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check } from "lucide-react";

export default function SubscribePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-4">
      <div className="fixed inset-0 bg-gradient-to-br from-[var(--color-primary)]/30 via-[#0a0a0a] to-[var(--color-accent)]/20 pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 max-w-2xl w-full"
      >
        <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-3xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Start Building Your Lead Gen Tools
            </h1>
            <p className="text-xl text-[var(--color-text-secondary)]">
              $549/month • Unlimited builds • Cancel anytime
            </p>
          </div>

          <div className="bg-[var(--color-bg-primary)] border border-[var(--color-primary)]/30 rounded-2xl p-6 mb-8">
            <div className="text-center mb-6">
              <div className="text-6xl font-bold text-[var(--color-primary)] mb-2">
                $549
              </div>
              <div className="text-lg text-[var(--color-text-secondary)] mb-6">
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
                  <span className="text-[var(--color-text-secondary)]">{item}</span>
                </li>
              ))}
            </ul>

            <div className="text-center">
              <p className="text-sm text-[var(--color-text-muted)] mb-6">
                No contracts. No hidden fees. No per-project quotes.
                <br />
                Just a simple monthly partnership that pays for itself the first time it books you a call.
              </p>
              <a
                href="https://buy.stripe.com/your-link-here"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full py-4 bg-[var(--color-primary)] text-white rounded-xl font-semibold hover:opacity-90 transition-opacity text-center"
              >
                Subscribe for $549/month
              </a>
              <p className="text-xs text-[var(--color-text-muted)] mt-4">
                You&apos;ll be redirected to Stripe to complete your subscription
              </p>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/book"
              className="text-[var(--color-primary)] hover:text-[var(--color-primary-light)] transition-colors"
            >
              Want to book a strategy call first? →
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

