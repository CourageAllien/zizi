"use client";

import { Mail, Phone, Twitter, Linkedin } from "lucide-react";

const productLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "What We Build", href: "#what-we-build" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

const contactLinks = [
  { label: "Email Us", href: "mailto:hello@zizi.so", icon: Mail },
  { label: "Book a Call", href: "/sales/book", icon: Phone },
  { label: "Twitter", href: "https://twitter.com/zizico", icon: Twitter },
  { label: "LinkedIn", href: "https://linkedin.com/company/zizico", icon: Linkedin },
];

export default function SalesFooter() {
  const scrollToSection = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="py-16 bg-[var(--color-bg-primary)] border-t border-[var(--color-border)]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">Z</span>
              </div>
              <span className="text-xl font-bold text-white">ZiziCo</span>
              <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/30 rounded text-xs font-medium text-emerald-400">
                Sales
              </span>
            </div>
            <p className="text-[var(--color-text-secondary)] text-sm max-w-sm mb-4">
              AI-powered sales tools that help you close more deals. Preview tools, interactive demos, proposal generators — delivered in 48-72 hours.
            </p>
            <p className="text-[var(--color-text-muted)] text-sm">
              Built by AI-native builders who ship fast.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-[var(--color-text-secondary)] hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              {contactLinks.map((link) => {
                const Icon = link.icon;
                const isExternal = link.href.startsWith("http") || link.href.startsWith("mailto:");
                const isInternalPage = link.href.startsWith("/");
                
                if (isInternalPage) {
                  return (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-white text-sm transition-colors"
                      >
                        <Icon className="w-4 h-4" />
                        {link.label}
                      </a>
                    </li>
                  );
                }
                
                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-white text-sm transition-colors"
                      target={isExternal && !link.href.startsWith("mailto:") ? "_blank" : undefined}
                      rel={isExternal && !link.href.startsWith("mailto:") ? "noopener noreferrer" : undefined}
                    >
                      <Icon className="w-4 h-4" />
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[var(--color-border)]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[var(--color-text-muted)] text-sm">
              © {new Date().getFullYear()} ZiziCo. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="/privacy"
                className="text-[var(--color-text-muted)] hover:text-white text-sm transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="text-[var(--color-text-muted)] hover:text-white text-sm transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
