import { ToastProvider } from "@/components/socials/Toast";

export const metadata = {
  title: "Social Content Generator — ZiziCo",
  description: "AI-powered social media content for every platform. Generate engaging posts for LinkedIn, Twitter, Instagram, Facebook, and TikTok.",
};

export default function SocialsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ToastProvider>
      <div className="min-h-screen bg-background-primary">
        {children}
      </div>
    </ToastProvider>
  );
}


