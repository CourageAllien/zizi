"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-black">Z</span>
            <span className="text-sm text-gray-600">
              Lead Gen Tools
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
            <Link href="#how-it-works" className="hover:text-black transition-colors">
              How It Works
            </Link>
            <Link href="#what-you-could-build" className="hover:text-black transition-colors">
              What You Could Build
            </Link>
            <Link href="#pricing" className="hover:text-black transition-colors">
              Pricing
            </Link>
            <Link href="#faq" className="hover:text-black transition-colors">
              FAQ
            </Link>
            <Link href="/zizi/book" className="hover:text-black transition-colors">
              Book a Call
            </Link>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">
            Built for high-ticket coaches, consultants, and service businesses.
          </p>
        </div>
      </div>
    </footer>
  );
}

