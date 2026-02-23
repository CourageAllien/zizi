"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-white py-20 md:py-32">
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="mb-6">
          <span className="inline-block px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
            Lead Gen Tools
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6 leading-tight">
          Your next client is already looking for a reason to trust you.
          <br />
          Give them one.
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          We build done-for-you lead gen tools that attract your ideal clients,
          prove your expertise, and sell your high-ticket offer — before you ever
          get on a call.
        </p>

        {/* CTA Button */}
        <Link
          href="/zizi/book"
          className="inline-block bg-black text-white px-8 py-4 rounded-lg text-base font-medium hover:bg-gray-800 transition-colors"
        >
          Book a Strategy Call
        </Link>
      </div>
    </section>
  );
}

