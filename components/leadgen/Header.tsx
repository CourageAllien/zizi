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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[var(--color-bg-primary)]/90 backdrop-blur-lg border-b border-[var(--color-border)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-white">
          ZiziCo
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#how-it-works"
            className="text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors"
          >
            How It Works
          </a>
          <a
            href="#what-you-could-build"
            className="text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors"
          >
            What You Could Build
          </a>
          <a
            href="#pricing"
            className="text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors"
          >
            Pricing
          </a>
          <a
            href="#faq"
            className="text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors"
          >
            FAQ
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/book"
            className="btn-primary text-sm"
          >
            Book a Strategy Call
          </Link>
        </div>
      </div>
    </motion.header>
  );
}

