"use client";

import Link from "next/link";

export default function Pricing() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-10 tracking-tight">
          Pricing
        </h2>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 sm:p-12 mb-10">
          <div className="text-6xl sm:text-7xl font-bold text-gray-900 mb-2 tracking-tight">$549</div>
          <div className="text-xl sm:text-2xl text-gray-600 mb-8">/ month</div>
          <ul className="space-y-4 text-lg sm:text-xl text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-gray-900 mt-0.5">→</span>
              <span>Unlimited builds (one active request at a time)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gray-900 mt-0.5">→</span>
              <span>Strategy included</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gray-900 mt-0.5">→</span>
              <span>Full design and development</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gray-900 mt-0.5">→</span>
              <span>Unlimited revisions per build</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gray-900 mt-0.5">→</span>
              <span>Cancel anytime</span>
            </li>
          </ul>
        </div>
        <p className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-10">
          No contracts. No hidden fees. No per-project quotes. Just a simple
          monthly partnership that pays for itself the first time it books you a
          call.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/subscribe"
            className="inline-block bg-gray-900 text-white px-8 py-3.5 rounded-lg text-base font-medium hover:bg-gray-800 transition-colors text-center shadow-sm"
          >
            Start for $549
          </Link>
          <Link
            href="/zizi/book"
            className="inline-block bg-white text-gray-900 border-2 border-gray-900 px-8 py-3.5 rounded-lg text-base font-medium hover:bg-gray-50 transition-colors text-center"
          >
            Book a Strategy Call First
          </Link>
        </div>
      </div>
    </section>
  );
}

