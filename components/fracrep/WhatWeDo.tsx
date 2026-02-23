"use client";

export default function WhatWeDo() {
  return (
    <section className="bg-white py-20 md:py-32">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-8">
          What We Do
        </h2>
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            We are a dedicated tool-building partner for high-ticket coaches,
            consultants, and service businesses.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            You tell us what you need.
            <br />
            We build it.
            <br />
            You give it away.
            <br />
            It brings in leads.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-4 font-medium">
            Every month, you get:
          </p>
          <ul className="space-y-3 text-lg text-gray-700">
            <li className="flex items-start">
              <span className="mr-3">→</span>
              <span>
                Unlimited tool builds (one active request at a time)
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-3">→</span>
              <span>
                Strategy included — we figure out what to build and why
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-3">→</span>
              <span>Full design and development handled for you</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3">→</span>
              <span>
                Conversion-focused — every tool is built to move people toward
                your paid offer
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-3">→</span>
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

