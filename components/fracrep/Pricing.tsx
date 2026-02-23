"use client";

import Link from "next/link";

export default function Pricing() {
  return (
    <section className="bg-white py-20 md:py-32">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-8">
          Pricing
        </h2>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 md:p-12 mb-8">
          <div className="text-5xl font-bold text-black mb-6">$549</div>
          <div className="text-lg text-gray-600 mb-2">/ month</div>
          <ul className="space-y-4 mt-8 text-lg text-gray-700">
            <li className="flex items-start">
              <span className="mr-3">→</span>
              <span>Unlimited builds (one active request at a time)</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3">→</span>
              <span>Strategy included</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3">→</span>
              <span>Full design and development</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3">→</span>
              <span>Unlimited revisions per build</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3">→</span>
              <span>Cancel anytime</span>
            </li>
          </ul>
        </div>
        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          No contracts. No hidden fees. No per-project quotes. Just a simple
          monthly partnership that pays for itself the first time it books you a
          call.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/subscribe"
            className="inline-block bg-black text-white px-8 py-4 rounded-lg text-base font-medium hover:bg-gray-800 transition-colors text-center"
          >
            Start for $549
          </Link>
          <Link
            href="/zizi/book"
            className="inline-block bg-white text-black border-2 border-black px-8 py-4 rounded-lg text-base font-medium hover:bg-gray-50 transition-colors text-center"
          >
            Book a Strategy Call First
          </Link>
        </div>
      </div>
    </section>
  );
}

