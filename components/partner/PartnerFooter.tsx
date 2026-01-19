"use client";

import { motion } from "framer-motion";
import { Mail, Twitter, Linkedin, Calendar } from "lucide-react";

const productLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "What We Build", href: "#what-we-build" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

const contactLinks = [
  { label: "hello@zizi.so", href: "mailto:hello@zizi.so", icon: Mail },
  { label: "Twitter / X", href: "https://twitter.com/zizico", icon: Twitter },
  { label: "LinkedIn", href: "https://linkedin.com/company/zizico", icon: Linkedin },
  { label: "Book a Call", href: "/partner/book", icon: Calendar },
];

export default function PartnerFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-4 gap-12"
        >
          {/* Brand */}
          <div className="md:col-span-2">
            <a href="/partner" className="text-2xl font-bold text-white">
              ZiziCo
            </a>
            <p className="text-[#a1a1a1] mt-4 max-w-md leading-relaxed">
              Your AI-powered sales & marketing partner. We build the tools
              and assets that help you convert more leads — campaign after
              campaign.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold text-white mb-6">Product</h4>
            <ul className="space-y-4">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[#a1a1a1] hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Links */}
          <div>
            <h4 className="font-semibold text-white mb-6">Contact</h4>
            <ul className="space-y-4">
              {contactLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-[#a1a1a1] hover:text-white transition-colors inline-flex items-center gap-2"
                  >
                    <link.icon className="w-4 h-4" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#737373]">
            © {currentYear} ZiziCo. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-sm text-[#737373] hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm text-[#737373] hover:text-white transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
