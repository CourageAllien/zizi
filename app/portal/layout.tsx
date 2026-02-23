import { WorkspaceProvider } from '@/lib/workspace-context';

export const metadata = {
  title: 'ZiziCo Portal — Workspace Management',
  description: 'Manage your AI builds and track progress in real-time.',
};

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WorkspaceProvider>
      <div className="min-h-screen bg-background-primary">
        {children}
      </div>
    </WorkspaceProvider>
  );
}

