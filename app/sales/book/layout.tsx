import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Sales Strategy Call — ZiziCo",
  description:
    "Book a 15-minute call to discuss your sales process and discover which AI-powered tools would have the biggest impact on your pipeline.",
};

export default function SalesBookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}


