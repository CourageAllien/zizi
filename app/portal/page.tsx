'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  KeyRound, 
  ArrowRight, 
  Shield, 
  Users,
  AlertCircle 
} from 'lucide-react';
import { useWorkspace } from '@/lib/workspace-context';

export default function PortalLogin() {
  const router = useRouter();
  const { login } = useWorkspace();
  const [loginType, setLoginType] = useState<'client' | 'admin' | null>(null);
  const [accessCode, setAccessCode] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleClientLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const success = await login(email, accessCode);
    
    if (success) {
      router.push('/portal/workspace');
    } else {
      setError('Invalid access code. Please check and try again.');
    }
    setIsLoading(false);
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const success = await login('admin@zizi.so');
    
    if (success) {
      router.push('/portal/admin');
    } else {
      setError('Unable to login. Please try again.');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-primary/20 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-accent/20 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-background-primary/50 to-background-primary" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-display font-bold gradient-text">Zizi</span>
          </motion.div>
          <h1 className="text-2xl font-bold text-white mb-2">Welcome to Your Portal</h1>
          <p className="text-gray-400">Access your workspace or admin dashboard</p>
        </div>

        {/* Login Type Selection */}
        {!loginType && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <button
              onClick={() => setLoginType('client')}
              className="w-full glass rounded-2xl p-6 text-left hover:bg-white/10 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Users className="w-7 h-7 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white">Client Access</h3>
                  <p className="text-sm text-gray-400">Enter your workspace with access code</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </button>

            <button
              onClick={() => setLoginType('admin')}
              className="w-full glass rounded-2xl p-6 text-left hover:bg-white/10 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Shield className="w-7 h-7 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white">Admin Access</h3>
                  <p className="text-sm text-gray-400">Manage all client workspaces</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-accent group-hover:translate-x-1 transition-all" />
              </div>
            </button>
          </motion.div>
        )}

        {/* Client Login Form */}
        {loginType === 'client' && (
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onSubmit={handleClientLogin}
            className="glass rounded-2xl p-8"
          >
            <button
              type="button"
              onClick={() => { setLoginType(null); setError(''); }}
              className="text-sm text-gray-400 hover:text-white mb-6 flex items-center gap-1"
            >
              ← Back to options
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <KeyRound className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Enter Your Workspace</h2>
                <p className="text-sm text-gray-400">Use the access code we provided</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Access Code
                </label>
                <input
                  type="text"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
                  placeholder="e.g., ACME01"
                  className="input-field text-center text-2xl tracking-[0.3em] font-mono uppercase"
                  maxLength={8}
                  required
                />
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 rounded-lg p-3"
                >
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </motion.div>
              )}

              <button
                type="submit"
                disabled={isLoading || !accessCode}
                className="w-full btn-primary py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <div className="spinner" />
                ) : (
                  <>
                    Access Workspace
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>

            <p className="text-center text-sm text-gray-500 mt-6">
              Don't have an access code?{' '}
              <a href="/zizi/book" className="text-primary hover:underline">
                Book a call
              </a>
            </p>
          </motion.form>
        )}

        {/* Admin Login Form */}
        {loginType === 'admin' && (
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onSubmit={handleAdminLogin}
            className="glass rounded-2xl p-8"
          >
            <button
              type="button"
              onClick={() => { setLoginType(null); setError(''); }}
              className="text-sm text-gray-400 hover:text-white mb-6 flex items-center gap-1"
            >
              ← Back to options
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                <Shield className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Admin Dashboard</h2>
                <p className="text-sm text-gray-400">Manage all workspaces</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-accent/10 border border-accent/20 rounded-xl p-4">
                <p className="text-sm text-gray-300">
                  <span className="font-medium text-accent">Demo Mode:</span> Click below to access the admin dashboard. In production, this would require authentication.
                </p>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 rounded-lg p-3"
                >
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </motion.div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-accent to-accent-dark text-white py-4 rounded-xl text-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <div className="spinner" />
                ) : (
                  <>
                    Enter Admin Dashboard
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </motion.form>
        )}

        {/* Help Text */}
        <p className="text-center text-sm text-gray-500 mt-8">
          Need help?{' '}
          <a href="mailto:support@zizi.so" className="text-primary hover:underline">
            Contact support
          </a>
        </p>
      </motion.div>
    </div>
  );
}
