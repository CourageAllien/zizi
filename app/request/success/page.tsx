'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  CheckCircle2, 
  Clock, 
  Hammer, 
  RefreshCw,
  ArrowRight,
  PlusCircle,
  LayoutDashboard,
  Sparkles,
  Calendar
} from 'lucide-react';
import { format, addDays } from 'date-fns';

function SuccessContent() {
  const searchParams = useSearchParams();
  const requestId = searchParams.get('id') || 'REQ-XXXXXX';
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const estimatedDelivery = format(addDays(new Date(), 3), 'MMMM d, yyyy');

  const steps = [
    {
      icon: Clock,
      title: 'Review',
      description: "We'll review your request and reach out if we have questions.",
      time: 'Within 4 hours',
      color: '#06B6D4',
    },
    {
      icon: Hammer,
      title: 'Build',
      description: "Once confirmed, we start building. You'll get a preview link when ready.",
      time: '48-72 hours',
      color: '#8B5CF6',
    },
    {
      icon: RefreshCw,
      title: 'Revise',
      description: 'Review it, tell us what to change. We iterate until you love it.',
      time: 'Unlimited revisions',
      color: '#22C55E',
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      {/* Confetti effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full"
              style={{
                backgroundColor: ['#06B6D4', '#8B5CF6', '#22C55E', '#EAB308', '#EC4899'][i % 5],
                left: `${Math.random() * 100}%`,
                top: -20,
              }}
              initial={{ y: 0, opacity: 1, rotate: 0 }}
              animate={{ 
                y: '100vh', 
                opacity: 0, 
                rotate: Math.random() * 720 - 360 
              }}
              transition={{ 
                duration: 2 + Math.random() * 2, 
                delay: Math.random() * 0.5,
                ease: 'linear' 
              }}
            />
          ))}
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl"
      >
        {/* Success Card */}
        <div className="glass rounded-3xl p-8 md:p-12 text-center">
          {/* Animated checkmark */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 10, stiffness: 100 }}
            className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/30"
          >
            <motion.div
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <CheckCircle2 className="w-12 h-12 text-white" />
            </motion.div>
          </motion.div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 flex items-center justify-center gap-2">
            Request Submitted!
            <Sparkles className="w-8 h-8 text-yellow-400" />
          </h1>

          <p className="text-gray-400 text-lg mb-6">
            We've received your request and will start working on it soon.
          </p>

          {/* Request ID */}
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <span className="text-gray-400">Request ID:</span>
            <span className="text-primary font-mono font-semibold">{requestId}</span>
          </div>

          {/* Timeline */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-white mb-6">What happens next</h2>
            <div className="space-y-4">
              {steps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-4 text-left p-4 rounded-xl bg-white/5"
                >
                  <div 
                    className="p-3 rounded-xl flex-shrink-0"
                    style={{ backgroundColor: `${step.color}15` }}
                  >
                    <step.icon className="w-6 h-6" style={{ color: step.color }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-white">{step.title}</h3>
                      <span className="text-sm text-gray-500">{step.time}</span>
                    </div>
                    <p className="text-sm text-gray-400">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Estimated Delivery */}
          <div className="flex items-center justify-center gap-2 text-gray-400 mb-8 p-4 rounded-xl bg-accent/5 border border-accent/20">
            <Calendar className="w-5 h-5 text-accent" />
            <span>Estimated delivery:</span>
            <span className="text-white font-semibold">{estimatedDelivery}</span>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href={`/request/${requestId}`}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-primary text-white font-semibold hover:bg-primary-light transition-colors"
            >
              Track Your Request
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/request/new"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white/5 text-white hover:bg-white/10 transition-colors"
            >
              <PlusCircle className="w-5 h-5" />
              Submit Another
            </Link>
          </div>

          {/* Back to dashboard */}
          <Link
            href="/request"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mt-6 transition-colors"
          >
            <LayoutDashboard className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </div>

        {/* Note */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Need to add details? Reply to the confirmation email or message us directly.
        </p>
      </motion.div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner" />
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}

