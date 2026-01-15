import type { Metadata } from "next";
import { Outfit, Syne, Fira_Code } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
});

export const metadata: Metadata = {
  title: "Zizi — Your AI Ops Team",
  description:
    "We build AI systems that complement the work you are doing and helps add revenue. Unlimited builds. Maintained forever.",
  openGraph: {
    title: "Zizi — Your AI Ops Team",
    description:
      "We build AI systems that complement the work you are doing and helps add revenue. Unlimited builds. Maintained forever.",
    url: "https://zizi.so",
    siteName: "Zizi",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zizi — Your AI Ops Team",
    description:
      "We build AI systems that complement the work you are doing and helps add revenue.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <body
        className={`${outfit.variable} ${syne.variable} ${firaCode.variable} font-sans antialiased`}
      >
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
