"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-black">
          Z
        </Link>
        <Link
          href="/zizi/book"
          className="text-sm font-medium text-black hover:opacity-70 transition-opacity"
        >
          Get started→
        </Link>
      </div>
    </header>
  );
}

