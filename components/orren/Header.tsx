"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function OrrenHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? "bg-white/95 backdrop-blur-sm border-b border-gray-200" : "bg-white"
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
            <span className="text-white font-bold text-lg">Z</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-sm text-gray-700 hover:text-black transition-colors">
              How It Works
            </a>
            <a href="#what-you-could-build" className="text-sm text-gray-700 hover:text-black transition-colors">
              What You Could Build
            </a>
            <a href="#pricing" className="text-sm text-gray-700 hover:text-black transition-colors">
              Pricing
            </a>
            <a href="#faq" className="text-sm text-gray-700 hover:text-black transition-colors">
              FAQ
            </a>
          </nav>
        </div>
        <div className="flex items-center gap-6">
          <Link
            href="/book"
            className="bg-gray-800 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-900 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}

