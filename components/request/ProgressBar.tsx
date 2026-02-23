'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface Step {
  id: number;
  title: string;
  shortTitle?: string;
}

interface ProgressBarProps {
  steps: Step[];
  currentStep: number;
  completedSteps: number[];
}

export default function ProgressBar({ steps, currentStep, completedSteps }: ProgressBarProps) {
  const progress = ((currentStep) / (steps.length - 1)) * 100;

  return (
    <div className="w-full">
      {/* Mobile: Simple progress bar */}
      <div className="sm:hidden space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-primary font-medium">
            Step {currentStep + 1} of {steps.length}
          </span>
          <span className="text-gray-400">
            {steps[currentStep].title}
          </span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Desktop: Step indicators */}
      <div className="hidden sm:block">
        <div className="relative">
          {/* Background line */}
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-white/10" />
          
          {/* Progress line */}
          <motion.div
            className="absolute top-5 left-0 h-0.5 bg-gradient-to-r from-primary to-accent"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />

          {/* Steps */}
          <div className="relative flex justify-between">
            {steps.map((step, index) => {
              const isCompleted = completedSteps.includes(index);
              const isCurrent = currentStep === index;
              const isPast = index < currentStep;

              return (
                <div key={step.id} className="flex flex-col items-center">
                  {/* Circle */}
                  <motion.div
                    className={`relative w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                      isCompleted || isPast
                        ? 'bg-gradient-to-br from-primary to-accent text-white'
                        : isCurrent
                          ? 'bg-primary text-white ring-4 ring-primary/30'
                          : 'bg-white/10 text-gray-400'
                    }`}
                    initial={{ scale: 0.8 }}
                    animate={{ 
                      scale: isCurrent ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {isCompleted ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      index + 1
                    )}
                    
                    {/* Pulse effect for current step */}
                    {isCurrent && (
                      <motion.div
                        className="absolute inset-0 rounded-full bg-primary"
                        initial={{ scale: 1, opacity: 0.5 }}
                        animate={{ scale: 1.5, opacity: 0 }}
                        transition={{ 
                          duration: 1.5, 
                          repeat: Infinity,
                          ease: 'easeOut'
                        }}
                      />
                    )}
                  </motion.div>

                  {/* Label */}
                  <span className={`mt-3 text-xs font-medium text-center max-w-[80px] ${
                    isCurrent 
                      ? 'text-primary' 
                      : isCompleted || isPast
                        ? 'text-gray-300'
                        : 'text-gray-500'
                  }`}>
                    {step.shortTitle || step.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

