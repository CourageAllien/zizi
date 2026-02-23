"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-900 text-white text-xl font-bold">
              Z
            </div>
            <span className="text-sm text-gray-600">
              Lead Gen Tools
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
            <Link href="#how-it-works" className="hover:text-gray-900 transition-colors">
              How It Works
            </Link>
            <Link href="#what-you-could-build" className="hover:text-gray-900 transition-colors">
              What You Could Build
            </Link>
            <Link href="#pricing" className="hover:text-gray-900 transition-colors">
              Pricing
            </Link>
            <Link href="#faq" className="hover:text-gray-900 transition-colors">
              FAQ
            </Link>
            <Link href="/zizi/book" className="hover:text-gray-900 transition-colors">
              Book a Call
            </Link>
          </div>
        </div>
        <div className="mt-10 pt-8 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">
            Built for high-ticket coaches, consultants, and service businesses.
          </p>
        </div>
      </div>
    </footer>
  );
}

