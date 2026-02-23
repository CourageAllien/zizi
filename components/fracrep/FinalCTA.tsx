"use client";

import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="bg-white py-20 md:py-32">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
          Your competitors are still cold pitching.
          <br />
          You could be sending them a tool that sells for you.
        </h2>
        <p className="text-lg md:text-xl text-gray-600 mb-10">
          Start for $549. Cancel anytime. First tool live in weeks.
        </p>
        <Link
          href="/subscribe"
          className="inline-block bg-black text-white px-8 py-4 rounded-lg text-base font-medium hover:bg-gray-800 transition-colors"
        >
          Let's Build Your First Tool
        </Link>
      </div>
    </section>
  );
}

