"use client";

import AnimateOnScroll from "../partner/AnimateOnScroll";
import { Check } from "lucide-react";
import Link from "next/link";

export default function LeadGenPricing() {
  return (
    <section id="pricing" className="py-20 md:py-32 bg-white text-black">
      <div className="max-w-4xl mx-auto px-6">
        <AnimateOnScroll>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center text-gray-900">
            Pricing
          </h2>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.1}>
          <div className="bg-gray-50 border-2 border-gray-900 rounded-3xl p-8 md:p-12 mt-12">
            <div className="text-center mb-8">
              <div className="text-6xl md:text-7xl font-bold text-gray-900 mb-2">
                $549
              </div>
              <div className="text-xl text-gray-700 mb-8">
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
                  <Check className="w-6 h-6 text-gray-900 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-lg">{item}</span>
                </li>
              ))}
            </ul>

            <p className="text-center text-gray-700 mb-8">
              No contracts. No hidden fees. No per-project quotes.
              <br />
              Just a simple monthly partnership that pays for itself the first time it books you a call.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/subscribe"
                className="bg-gray-800 text-white text-center px-8 py-4 rounded-lg font-medium hover:bg-gray-900 transition-colors"
              >
                Start for $549
              </Link>
              <Link
                href="/book"
                className="bg-white border-2 border-gray-800 text-gray-900 text-center px-8 py-4 rounded-lg font-medium hover:bg-gray-50 transition-colors"
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

