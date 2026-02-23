"use client";

import Link from "next/link";

export default function WhatSiriShouldBe() {
  return (
    <section className="bg-[#fafafa] text-black py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              What Siri + AI should be.
            </h2>
            <Link
              href="#how-it-works"
              className="inline-block bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-900 transition-colors mb-6"
            >
              See how it works
            </Link>
          </div>
          <div>
            <p className="text-lg text-gray-700 leading-relaxed">
              We&apos;re building the first AI assistant that acts instead of talks — controls your home, organizes your life, and automates your work.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

