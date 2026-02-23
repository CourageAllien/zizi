"use client";

import AnimateOnScroll from "../partner/AnimateOnScroll";
import Link from "next/link";

export default function LeadGenFinalCTA() {
  return (
    <section className="py-20 md:py-32 bg-white text-black">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <AnimateOnScroll>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Your competitors are still cold pitching.
            <br />
            You could be sending them a tool that sells for you.
          </h2>
          <p className="text-xl text-gray-700 mb-12 mt-6">
            Start for $549. Cancel anytime. First tool live in weeks.
          </p>
          <Link
            href="/subscribe"
            className="bg-black text-white px-10 py-5 rounded-lg text-lg font-medium hover:bg-gray-900 transition-colors inline-block"
          >
            Let&apos;s Build Your First Tool
          </Link>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
