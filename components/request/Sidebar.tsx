'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  LayoutDashboard, 
  PlusCircle, 
  List, 
  CheckCircle2,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Shield
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/request', icon: LayoutDashboard },
  { label: 'New Request', href: '/request/new', icon: PlusCircle },
  { label: 'My Requests', href: '/request/list', icon: List },
  { label: 'Completed', href: '/request/list?status=completed', icon: CheckCircle2 },
];

const adminNavItems: NavItem[] = [
  { label: 'Admin', href: '/request/admin', icon: Shield },
];

interface SidebarProps {
  userEmail?: string;
  planName?: string;
}

export default function Sidebar({ userEmail = 'demo@example.com', planName = 'Growth' }: SidebarProps) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/request') {
      return pathname === '/request';
    }
    return pathname.startsWith(href.split('?')[0]);
  };

  const getPlanColor = (plan: string) => {
    switch (plan.toLowerCase()) {
      case 'starter': return 'bg-gray-500/20 text-gray-400';
      case 'growth': return 'bg-primary/20 text-primary';
      case 'scale': return 'bg-accent/20 text-accent';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:scale-105 transition-transform">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-display font-bold gradient-text">ZiziCo</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                active
                  ? 'bg-primary/10 text-primary'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className={`w-5 h-5 ${active ? 'text-primary' : 'text-gray-500 group-hover:text-gray-300'}`} />
              <span className="flex-1 font-medium">{item.label}</span>
              {item.badge && (
                <span className="px-2 py-0.5 rounded-full bg-primary text-white text-xs font-medium">
                  {item.badge}
                </span>
              )}
              {active && (
                <ChevronRight className="w-4 h-4 text-primary" />
              )}
            </Link>
          );
        })}

        {/* Admin Section */}
        <div className="pt-4 mt-4 border-t border-white/10">
          <span className="px-4 text-xs font-medium uppercase text-gray-500 tracking-wider">Admin</span>
          <div className="mt-2 space-y-1">
            {adminNavItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                    active
                      ? 'bg-accent/10 text-accent'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${active ? 'text-accent' : 'text-gray-500 group-hover:text-gray-300'}`} />
                  <span className="flex-1 font-medium">{item.label}</span>
                  {active && (
                    <ChevronRight className="w-4 h-4 text-accent" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-white/10">
        <div className="p-4 rounded-xl bg-white/5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <span className="text-lg font-semibold text-primary">
                {userEmail.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{userEmail}</p>
              <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${getPlanColor(planName)}`}>
                {planName}
              </span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Link
              href="/request/settings"
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors text-sm"
            >
              <Settings className="w-4 h-4" />
              Settings
            </Link>
            <button
              onClick={() => {/* Handle logout */}}
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition-colors text-sm"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-72 h-screen bg-background-secondary border-r border-white/10 fixed left-0 top-0">
        <SidebarContent />
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-background-secondary/95 backdrop-blur-lg border-b border-white/10 z-40 flex items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-display font-bold gradient-text">ZiziCo</span>
        </Link>
        <button
          onClick={() => setIsMobileOpen(true)}
          className="p-2 rounded-lg hover:bg-white/5 text-gray-400"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-80 bg-background-secondary border-r border-white/10 z-50"
            >
              <button
                onClick={() => setIsMobileOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/5 text-gray-400"
              >
                <X className="w-5 h-5" />
              </button>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-background-secondary/95 backdrop-blur-lg border-t border-white/10 z-40 flex items-center justify-around px-2">
        {navItems.slice(0, 4).map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                active ? 'text-primary' : 'text-gray-500'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label.split(' ')[0]}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}

