import Sidebar from '@/components/request/Sidebar';

export const metadata = {
  title: 'Request Portal — ZiziCo',
  description: 'Submit and track your build requests.',
};

export default function RequestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background-primary">
      <Sidebar userEmail="demo@example.com" planName="Growth" />
      
      {/* Main Content */}
      <main className="lg:ml-72 min-h-screen pt-16 lg:pt-0 pb-20 lg:pb-0">
        {children}
      </main>
    </div>
  );
}
