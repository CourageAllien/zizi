"use client";

export default function WhatWeDo() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-10 tracking-tight">
          What We Do
        </h2>
        <div className="space-y-6 text-lg sm:text-xl text-gray-700 leading-relaxed">
          <p>
            We are a dedicated tool-building partner for high-ticket coaches,
            consultants, and service businesses.
          </p>
          <p>
            You tell us what you need.
            <br />
            We build it.
            <br />
            You give it away.
            <br />
            It brings in leads.
          </p>
          <p className="font-semibold text-gray-900 pt-2">
            Every month, you get:
          </p>
          <ul className="space-y-4 text-lg sm:text-xl text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-gray-900 mt-0.5">→</span>
              <span>
                Unlimited tool builds (one active request at a time)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gray-900 mt-0.5">→</span>
              <span>
                Strategy included — we figure out what to build and why
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gray-900 mt-0.5">→</span>
              <span>Full design and development handled for you</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gray-900 mt-0.5">→</span>
              <span>
                Conversion-focused — every tool is built to move people toward
                your paid offer
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gray-900 mt-0.5">→</span>
              <span>
                Iterations and refinements as you learn what works
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

