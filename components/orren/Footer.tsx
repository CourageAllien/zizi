"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function OrrenFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 text-black">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-4 gap-12"
        >
          <div className="md:col-span-2">
            <Link href="/" className="text-2xl font-bold text-gray-900 flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                <span className="text-white font-bold text-lg">Z</span>
              </div>
              ZiziCo
            </Link>
            <p className="text-gray-600 mt-4 max-w-md leading-relaxed">
              We build done-for-you lead gen tools that attract your ideal clients, prove your expertise, and sell your high-ticket offer — before you ever get on a call.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-6">Service</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="#how-it-works"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="#what-you-could-build"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  What You Could Build
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-6">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:hello@zizi.so"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  hello@zizi.so
                </a>
              </li>
              <li>
                <Link
                  href="/book"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Book a Strategy Call
                </Link>
              </li>
            </ul>
          </div>
        </motion.div>

        <div className="mt-16 pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {currentYear} ZiziCo. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

