"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function LeadGenHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-1 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#1a1a1a]/95 backdrop-blur-lg"
          : "bg-[#1a1a1a]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
            <span className="text-white font-bold text-lg">Z</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#how-it-works"
              className="text-sm text-white hover:text-gray-300 transition-colors"
            >
              How It Works
            </a>
            <a
              href="#what-you-could-build"
              className="text-sm text-white hover:text-gray-300 transition-colors"
            >
              What You Could Build
            </a>
            <a
              href="#pricing"
              className="text-sm text-white hover:text-gray-300 transition-colors"
            >
              Pricing
            </a>
            <a
              href="#faq"
              className="text-sm text-white hover:text-gray-300 transition-colors"
            >
              FAQ
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
    </motion.header>
  );
}
