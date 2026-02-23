"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-900 text-white text-xl font-bold hover:bg-gray-800 transition-colors">
          Z
        </Link>
        <Link
          href="/zizi/book"
          className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors"
        >
          Get started →
        </Link>
      </div>
    </header>
  );
}

