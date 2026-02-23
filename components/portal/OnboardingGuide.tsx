'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  FileText,
  Clock,
  Eye,
  CheckCircle,
  Zap,
  Timer,
  ArrowRight,
  X,
  Lightbulb,
  MessageSquare,
  HelpCircle
} from 'lucide-react';

interface OnboardingGuideProps {
  onDismiss: () => void;
  onCreateRequest: () => void;
}

export default function OnboardingGuide({ onDismiss, onCreateRequest }: OnboardingGuideProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      icon: Lightbulb,
      title: 'Welcome to Your Workspace! 🎉',
      description: "This is where all your AI builds come to life. Let's give you a quick tour of how it works.",
      color: '#8B5CF6'
    },
    {
      icon: FileText,
      title: 'Step 1: Submit a Request',
      description: 'Describe what you want to build. Be as detailed as possible - the more context, the better the result. Choose between Simple (1-2 days) or Complex (5-7 days) builds.',
      color: '#06B6D4'
    },
    {
      icon: Zap,
      title: 'Step 2: We Build It',
      description: "Once submitted, you'll see your request move through our pipeline. Watch real-time progress updates as we build your solution.",
      color: '#F59E0B'
    },
    {
      icon: Eye,
      title: 'Step 3: Review & Approve',
      description: "When your build is ready, you'll be notified. Review the deliverables and either approve or request changes - we'll make it right.",
      color: '#10B981'
    },
    {
      icon: CheckCircle,
      title: 'Step 4: Done!',
      description: "Once approved, your build moves to the Done column. You can submit as many requests as you need - there's no limit!",
      color: '#22C55E'
    }
  ];

  const currentStepData = steps[currentStep];
  const Icon = currentStepData.icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-lg glass rounded-2xl p-8 relative overflow-hidden"
      >
        {/* Background glow */}
        <div 
          className="absolute inset-0 opacity-20 blur-3xl"
          style={{ backgroundColor: currentStepData.color }}
        />

        {/* Dismiss button */}
        <button
          onClick={onDismiss}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="relative z-10">
          {/* Progress dots */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentStep 
                    ? 'w-8 bg-white' 
                    : index < currentStep 
                      ? 'bg-white/50' 
                      : 'bg-white/20'
                }`}
              />
            ))}
          </div>

          {/* Icon */}
          <motion.div
            key={currentStep}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center"
            style={{ backgroundColor: `${currentStepData.color}20` }}
          >
            <Icon 
              className="w-10 h-10" 
              style={{ color: currentStepData.color }}
            />
          </motion.div>

          {/* Text */}
          <motion.div
            key={`text-${currentStep}`}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-3">
              {currentStepData.title}
            </h2>
            <p className="text-gray-400 leading-relaxed">
              {currentStepData.description}
            </p>
          </motion.div>

          {/* Quick Info Cards - Show on first step */}
          {currentStep === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-2 gap-3 mb-8"
            >
              <div className="bg-green-500/10 rounded-xl p-3 text-center">
                <Timer className="w-5 h-5 text-green-400 mx-auto mb-1" />
                <p className="text-xs text-green-400 font-medium">Simple Builds</p>
                <p className="text-lg font-bold text-white">1-2 days</p>
              </div>
              <div className="bg-amber-500/10 rounded-xl p-3 text-center">
                <Zap className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                <p className="text-xs text-amber-400 font-medium">Complex Builds</p>
                <p className="text-lg font-bold text-white">5-7 days</p>
              </div>
            </motion.div>
          )}

          {/* Navigation */}
          <div className="flex gap-3">
            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="flex-1 btn-secondary"
              >
                Back
              </button>
            )}
            
            {currentStep < steps.length - 1 ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="flex-1 btn-primary flex items-center justify-center gap-2"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => {
                  onDismiss();
                  onCreateRequest();
                }}
                className="flex-1 btn-primary flex items-center justify-center gap-2"
              >
                Create My First Request
                <Sparkles className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Skip link */}
          {currentStep < steps.length - 1 && (
            <button
              onClick={onDismiss}
              className="w-full text-center text-sm text-gray-500 hover:text-gray-300 mt-4 transition-colors"
            >
              Skip tour
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}


