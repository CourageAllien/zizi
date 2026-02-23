"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="px-6 sm:px-10 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-[#2563EB] flex items-center justify-center">
            <span className="text-white font-bold text-lg leading-none">Z</span>
          </div>
          <span className="text-[#111827] font-semibold text-lg hidden sm:block">ZiziCo</span>
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#how-it-works" className="text-sm text-[#4B5563] hover:text-[#111827] transition-colors">
            How It Works
          </a>
          <a href="#what-you-could-build" className="text-sm text-[#4B5563] hover:text-[#111827] transition-colors">
            What You Could Build
          </a>
          <a href="#pricing" className="text-sm text-[#4B5563] hover:text-[#111827] transition-colors">
            Pricing
          </a>
          <a href="#faq" className="text-sm text-[#4B5563] hover:text-[#111827] transition-colors">
            FAQ
          </a>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <Link
            href="/zizi/book"
            className="hidden sm:inline-flex px-5 py-2 text-sm font-medium text-white bg-[#2563EB] rounded-md hover:bg-[#1D4ED8] transition-colors"
          >
            Get Started
          </Link>
          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-[#4B5563] hover:text-[#111827]"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              {mobileOpen ? (
                <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              ) : (
                <>
                  <path d="M3 5H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M3 10H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M3 15H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-6 py-4 space-y-3">
          <a href="#how-it-works" onClick={() => setMobileOpen(false)} className="block text-sm text-[#4B5563] hover:text-[#111827]">How It Works</a>
          <a href="#what-you-could-build" onClick={() => setMobileOpen(false)} className="block text-sm text-[#4B5563] hover:text-[#111827]">What You Could Build</a>
          <a href="#pricing" onClick={() => setMobileOpen(false)} className="block text-sm text-[#4B5563] hover:text-[#111827]">Pricing</a>
          <a href="#faq" onClick={() => setMobileOpen(false)} className="block text-sm text-[#4B5563] hover:text-[#111827]">FAQ</a>
          <Link href="/zizi/book" className="block text-sm font-medium text-[#2563EB]">Get Started →</Link>
        </div>
      )}
    </header>
  );
}
