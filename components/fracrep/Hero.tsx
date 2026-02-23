"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-white pt-16 pb-24 md:pt-24 md:pb-32">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 text-center">
        {/* Badge */}
        <div className="mb-8">
          <span className="inline-block px-4 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
            Lead Gen Tools
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-[1.1] tracking-tight">
          Your next client is already looking for a reason to trust you.
          <br className="hidden sm:block" />
          <span className="sm:ml-2">Give them one.</span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed font-normal">
          We build done-for-you lead gen tools that attract your ideal clients,
          prove your expertise, and sell your high-ticket offer — before you ever
          get on a call.
        </p>

        {/* CTA Button */}
        <Link
          href="/zizi/book"
          className="inline-block bg-gray-900 text-white px-8 py-3.5 rounded-lg text-base font-medium hover:bg-gray-800 transition-colors shadow-sm"
        >
          Book a Strategy Call
        </Link>
      </div>
    </section>
  );
}

