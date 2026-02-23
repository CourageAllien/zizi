"use client";

import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-[1.1] tracking-tight">
          Your competitors are still cold pitching.
          <br className="hidden sm:block" />
          <span className="sm:ml-2">You could be sending them a tool that sells for you.</span>
        </h2>
        <p className="text-xl sm:text-2xl text-gray-600 mb-12 font-normal">
          Start for $549. Cancel anytime. First tool live in weeks.
        </p>
        <Link
          href="/subscribe"
          className="inline-block bg-gray-900 text-white px-8 py-3.5 rounded-lg text-base font-medium hover:bg-gray-800 transition-colors shadow-sm"
        >
          Let's Build Your First Tool
        </Link>
      </div>
    </section>
  );
}

