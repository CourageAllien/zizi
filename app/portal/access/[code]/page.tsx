'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Sparkles, KeyRound, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { useWorkspace } from '@/lib/workspace-context';

export default function DirectAccessPage() {
  const router = useRouter();
  const params = useParams();
  const { login, isDataLoaded } = useWorkspace();
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [hasAttempted, setHasAttempted] = useState(false);

  // Get code from URL
  const urlCode = params.code as string;

  useEffect(() => {
    // Wait for data to be loaded from localStorage before attempting login
    if (isDataLoaded && urlCode && !hasAttempted) {
      setHasAttempted(true);
      attemptAutoLogin(urlCode.toUpperCase());
    }
  }, [isDataLoaded, urlCode, hasAttempted]);

  const attemptAutoLogin = async (code: string) => {
    setIsLoading(true);
    setError('');
    
    // Small delay for UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const success = await login('', code);
    
    if (success) {
      router.push('/portal/workspace');
    } else {
      setIsLoading(false);
      setAccessCode(code);
      setError('This access code is invalid or expired. Please check your email for the correct code.');
    }
  };

  const handleManualLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessCode) return;
    
    setIsLoading(true);
    setError('');
    
    const success = await login('', accessCode.toUpperCase());
    
    if (success) {
      router.push('/portal/workspace');
    } else {
      setIsLoading(false);
      setError('Invalid access code. Please check and try again.');
    }
  };

  // Loading state while auto-login attempts
  if (isLoading && !error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-primary/20 via-transparent to-transparent rounded-full blur-3xl" />
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-accent/20 via-transparent to-transparent rounded-full blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center relative z-10"
        >
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-display font-bold gradient-text">Zizi</span>
          </div>
          
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <p className="text-gray-400">Accessing your workspace...</p>
          </div>
        </motion.div>
      </div>
    );
  }

  // Manual login form (shown if auto-login fails)
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
          <h1 className="text-2xl font-bold text-white mb-2">Access Your Workspace</h1>
          <p className="text-gray-400">Enter your access code to continue</p>
        </div>

        {/* Login Form */}
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onSubmit={handleManualLogin}
          className="glass rounded-2xl p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <KeyRound className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">Enter Access Code</h2>
              <p className="text-sm text-gray-400">Check your email for the code</p>
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
                placeholder="e.g., AC3K7N-M2PQ"
                className="input-field text-center text-xl tracking-[0.2em] font-mono uppercase"
                maxLength={12}
                required
              />
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 rounded-lg p-3"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isLoading || !accessCode}
              className="w-full btn-primary py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
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
