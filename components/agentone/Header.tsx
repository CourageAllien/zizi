"use client";

import { Globe } from "lucide-react";
import Link from "next/link";

export default function AgentOneHeader() {
  return (
    <header className="bg-[#1a1a1a] text-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
            <Globe className="w-6 h-6 text-white" />
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#product" className="text-sm hover:text-gray-300 transition-colors">
              Product
            </a>
            <a href="#marketplace" className="text-sm hover:text-gray-300 transition-colors">
              Marketplace
            </a>
            <a href="#pricing" className="text-sm hover:text-gray-300 transition-colors">
              Pricing
            </a>
          </nav>
        </div>
        <Link
          href="/book"
          className="bg-black text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-900 transition-colors"
        >
          Get Started
        </Link>
      </div>
    </header>
  );
}

