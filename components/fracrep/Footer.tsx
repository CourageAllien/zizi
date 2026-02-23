"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-3xl mx-auto px-6 sm:px-10 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Logo + tagline */}
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-2">
              <div className="w-7 h-7 rounded-md bg-[#2563EB] flex items-center justify-center">
                <span className="text-white font-bold text-sm leading-none">Z</span>
              </div>
              <span className="text-[#111827] font-semibold text-base">ZiziCo</span>
            </Link>
            <p className="text-sm text-[#9CA3AF]">
              Lead gen tools for high-ticket businesses.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
            <div>
              <p className="text-xs uppercase tracking-wider text-[#9CA3AF] font-medium mb-3">Service</p>
              <div className="space-y-2">
                <a href="#how-it-works" className="block text-sm text-[#4B5563] hover:text-[#111827] transition-colors">How It Works</a>
                <a href="#what-you-could-build" className="block text-sm text-[#4B5563] hover:text-[#111827] transition-colors">What You Could Build</a>
                <a href="#pricing" className="block text-sm text-[#4B5563] hover:text-[#111827] transition-colors">Pricing</a>
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-[#9CA3AF] font-medium mb-3">Support</p>
              <div className="space-y-2">
                <a href="#faq" className="block text-sm text-[#4B5563] hover:text-[#111827] transition-colors">FAQ</a>
                <Link href="/zizi/book" className="block text-sm text-[#4B5563] hover:text-[#111827] transition-colors">Book a Call</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-gray-200">
          <p className="text-xs text-[#9CA3AF]">
            © {new Date().getFullYear()} ZiziCo. Built for high-ticket coaches, consultants, and service businesses.
          </p>
        </div>
      </div>
    </footer>
  );
}
