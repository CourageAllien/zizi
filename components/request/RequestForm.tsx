'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { requestFormSchema, RequestFormData } from '@/lib/schemas/request-schema';
import { RequestTemplate } from '@/lib/request-templates';

import ProgressBar from './ProgressBar';
import Step1ToolType from './Step1ToolType';
import Step2Details from './Step2Details';
import Step3Branding from './Step3Branding';
import Step4Integrations from './Step4Integrations';
import Step5Review from './Step5Review';

const STEPS = [
  { id: 1, title: 'Tool Type', shortTitle: 'Type' },
  { id: 2, title: 'Details', shortTitle: 'Details' },
  { id: 3, title: 'Branding & Hosting', shortTitle: 'Branding' },
  { id: 4, title: 'Integrations & Urgency', shortTitle: 'Timeline' },
  { id: 5, title: 'Review & Submit', shortTitle: 'Review' },
];

// Fields to validate at each step
const STEP_FIELDS: Record<number, (keyof RequestFormData)[]> = {
  0: ['requestType', 'otherRequestType'],
  1: ['description', 'targetAudience', 'goals', 'otherGoal'],
  2: ['brandingOption', 'websiteUrl', 'hostingOption'],
  3: ['urgency', 'deadline', 'urgencyReason', 'integrations', 'otherIntegration'],
  4: [], // Review step - all fields
};

interface RequestFormProps {
  template?: RequestTemplate | null;
  userId?: string;
  userEmail?: string;
}

export default function RequestForm({ template, userId = 'demo-user', userEmail = 'demo@example.com' }: RequestFormProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<RequestFormData>({
    resolver: zodResolver(requestFormSchema) as never,
    mode: 'onChange',
    defaultValues: {
      requestType: undefined,
      otherRequestType: '',
      description: '',
      targetAudience: '',
      goals: [],
      otherGoal: '',
      examples: '',
      content: '',
      brandingOption: undefined,
      websiteUrl: '',
      hostingOption: undefined,
      integrations: [],
      otherIntegration: '',
      urgency: 'standard',
      deadline: '',
      urgencyReason: '',
      additionalNotes: '',
      files: [],
    },
  });

  // Apply template if provided
  useEffect(() => {
    if (template?.defaultValues) {
      Object.entries(template.defaultValues).forEach(([key, value]) => {
        if (value !== undefined) {
          form.setValue(key as keyof RequestFormData, value as never);
        }
      });
    }
  }, [template, form]);

  const validateCurrentStep = async (): Promise<boolean> => {
    const fieldsToValidate = STEP_FIELDS[currentStep];
    
    if (fieldsToValidate.length === 0) {
      // For review step, validate all
      const result = await form.trigger();
      return result;
    }

    const result = await form.trigger(fieldsToValidate);
    return result;
  };

  const handleNext = async () => {
    const isValid = await validateCurrentStep();
    
    if (isValid) {
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps(prev => [...prev, currentStep]);
      }
      
      if (currentStep < STEPS.length - 1) {
        setCurrentStep(prev => prev + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToStep = (step: number) => {
    if (step >= 0 && step < STEPS.length) {
      setCurrentStep(step);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async (data: RequestFormData) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          userId,
          userEmail,
        }),
      });

      const result = await response.json();

      if (result.success) {
        router.push(`/request/success?id=${result.requestId}`);
      } else {
        throw new Error(result.error || 'Failed to submit request');
      }
    } catch (error) {
      console.error('Submit error:', error);
      // Show error to user
      alert('Failed to submit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLastStep = currentStep === STEPS.length - 1;

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8 md:mb-12">
        <ProgressBar 
          steps={STEPS} 
          currentStep={currentStep} 
          completedSteps={completedSteps}
        />
      </div>

      {/* Form Card */}
      <motion.div
        className="glass rounded-3xl p-6 md:p-10"
        layout
      >
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          {/* Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentStep === 0 && <Step1ToolType form={form} />}
              {currentStep === 1 && <Step2Details form={form} />}
              {currentStep === 2 && <Step3Branding form={form} />}
              {currentStep === 3 && <Step4Integrations form={form} />}
              {currentStep === 4 && <Step5Review form={form} onGoToStep={goToStep} />}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-10 pt-6 border-t border-white/10">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStep === 0}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-300"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>

            {isLastStep ? (
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-semibold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Submit Request
                  </>
                )}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-2 px-8 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-light transition-all"
              >
                Next
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </form>
      </motion.div>

      {/* Keyboard shortcut hint */}
      <p className="text-center text-sm text-gray-500 mt-6">
        Press <kbd className="px-2 py-1 rounded bg-white/5 text-gray-400">Enter</kbd> to continue
      </p>
    </div>
  );
}

