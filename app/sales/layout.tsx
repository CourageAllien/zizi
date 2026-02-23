import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ZiziCo — AI-Powered Sales Tools",
  description:
    "Helping salespeople close more deals with custom AI-powered sales assets and tools. Preview tools. Interactive demos. Proposal generators. Delivered in 48-72 hours.",
  openGraph: {
    title: "ZiziCo — AI-Powered Sales Tools",
    description:
      "Helping salespeople close more deals with custom AI-powered sales assets and tools. Preview tools. Interactive demos. Proposal generators. Delivered in 48-72 hours.",
    url: "https://zizi.so/sales",
    siteName: "ZiziCo",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZiziCo — AI-Powered Sales Tools",
    description:
      "Helping salespeople close more deals with custom AI-powered sales assets and tools.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function SalesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

