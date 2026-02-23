"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Compass } from "lucide-react";

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
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-1 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#1a1a1a]/95 backdrop-blur-lg"
            : "bg-[#1a1a1a]"
        } rounded-lg max-w-7xl w-[calc(100%-2rem)]`}
      >
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a
                href="#how-it-works"
                className="text-sm text-white hover:text-gray-300 transition-colors"
              >
                Product
              </a>
              <a
                href="#what-you-could-build"
                className="text-sm text-white hover:text-gray-300 transition-colors"
              >
                Marketplace
              </a>
              <a
                href="#pricing"
                className="text-sm text-white hover:text-gray-300 transition-colors"
              >
                Pricing
              </a>
            </nav>
          </div>
          <Link
            href="/book"
            className="bg-white text-black px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </motion.header>
    </>
  );
}
