"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Header() {
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
        <a href="#" className="text-xl font-bold text-white">
          ZiziCo
        </a>

        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#how-it-works"
            className="text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors"
          >
            How It Works
          </a>
          <a
            href="#what-we-build"
            className="text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors"
          >
            What We Build
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
          <a
            href="https://calendly.com/courageoutbounder/ai-chat"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex text-sm font-medium text-[var(--color-text-secondary)] hover:text-white transition-colors"
          >
            Book a Call
          </a>
          <a
            href="/zizi/book"
            className="btn-primary text-sm"
          >
            Get Started
          </a>
        </div>
      </div>
    </motion.header>
  );
}
