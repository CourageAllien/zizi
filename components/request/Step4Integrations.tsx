'use client';

import { UseFormReturn } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Calendar, AlertCircle } from 'lucide-react';
import { RequestFormData, INTEGRATION_OPTIONS, URGENCY_OPTIONS } from '@/lib/schemas/request-schema';
import { format } from 'date-fns';

interface Step4Props {
  form: UseFormReturn<RequestFormData>;
}

export default function Step4Integrations({ form }: Step4Props) {
  const { register, watch, setValue, formState: { errors } } = form;
  const integrations = watch('integrations') || [];
  const urgency = watch('urgency');
  const deadline = watch('deadline');

  const toggleIntegration = (value: string) => {
    const current = [...integrations];
    const index = current.indexOf(value);
    
    // If selecting 'none', clear all others
    if (value === 'none') {
      if (index > -1) {
        current.splice(index, 1);
      } else {
        setValue('integrations', ['none'], { shouldValidate: true });
        return;
      }
    } else {
      // Remove 'none' if selecting something else
      const noneIndex = current.indexOf('none');
      if (noneIndex > -1) {
        current.splice(noneIndex, 1);
      }
      
      if (index > -1) {
        current.splice(index, 1);
      } else {
        current.push(value);
      }
    }
    
    setValue('integrations', current, { shouldValidate: true });
  };

  // Get minimum date (today)
  const minDate = format(new Date(), 'yyyy-MM-dd');

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
          Integrations & Timeline
        </h2>
        <p className="text-gray-400 text-lg">
          Where should leads go and when do you need this?
        </p>
      </div>

      {/* Section A: Integrations */}
      <div className="space-y-4">
        <div>
          <label className="block text-lg font-semibold text-white mb-1">
            Any integrations needed?
            <span className="text-gray-500 text-sm font-normal ml-2">Optional</span>
          </label>
          <p className="text-gray-400 text-sm">Where should leads or data go?</p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {INTEGRATION_OPTIONS.map((option) => {
            const isSelected = integrations.includes(option.value);
            return (
              <motion.button
                key={option.value}
                type="button"
                onClick={() => toggleIntegration(option.value)}
                className={`flex items-center gap-3 p-4 rounded-xl text-left transition-all ${
                  isSelected
                    ? 'bg-primary/10 border-2 border-primary'
                    : 'bg-white/5 border border-white/10 hover:bg-white/10'
                }`}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 transition-colors ${
                  isSelected ? 'bg-primary' : 'bg-white/10'
                }`}>
                  {isSelected && <Check className="w-3 h-3 text-white" />}
                </div>
                <span className={`text-sm ${isSelected ? 'text-primary' : 'text-gray-300'}`}>
                  {option.label}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Other integration input */}
        <AnimatePresence>
          {integrations.includes('other') && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <input
                {...register('otherIntegration')}
                type="text"
                placeholder="What other integrations do you need?"
                className="w-full mt-3 p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
              {errors.otherIntegration && (
                <p className="mt-2 text-sm text-red-400">{errors.otherIntegration.message}</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Section B: Urgency */}
      <div className="space-y-4">
        <label className="block text-lg font-semibold text-white">
          How urgent is this? <span className="text-red-400">*</span>
        </label>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {URGENCY_OPTIONS.map((option) => {
            const isSelected = urgency === option.value;
            const isUrgent = option.value === 'urgent';
            const isPriority = option.value === 'priority';

            return (
              <motion.button
                key={option.value}
                type="button"
                onClick={() => setValue('urgency', option.value as RequestFormData['urgency'], { shouldValidate: true })}
                className={`relative p-5 rounded-2xl text-left transition-all ${
                  isSelected
                    ? isUrgent 
                      ? 'bg-red-500/10 border-2 border-red-500'
                      : isPriority
                        ? 'bg-yellow-500/10 border-2 border-yellow-500'
                        : 'bg-primary/10 border-2 border-primary'
                    : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20'
                }`}
                whileTap={{ scale: 0.98 }}
              >
                {/* Selected indicator */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className={`absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center ${
                        isUrgent ? 'bg-red-500' : isPriority ? 'bg-yellow-500' : 'bg-primary'
                      }`}
                    >
                      <Check className="w-4 h-4 text-white" />
                    </motion.div>
                  )}
                </AnimatePresence>

                <h3 className={`font-semibold mb-1 ${
                  isSelected 
                    ? isUrgent 
                      ? 'text-red-400' 
                      : isPriority 
                        ? 'text-yellow-400' 
                        : 'text-primary'
                    : 'text-white'
                }`}>
                  {option.label}
                </h3>
                <p className="text-sm text-gray-400">
                  {option.description}
                </p>
              </motion.button>
            );
          })}
        </div>

        {errors.urgency && (
          <p className="text-sm text-red-400">{errors.urgency.message}</p>
        )}

        {/* Urgent fields */}
        <AnimatePresence>
          {urgency === 'urgent' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-4 space-y-4 p-4 rounded-xl bg-red-500/5 border border-red-500/20">
                <div className="flex items-center gap-2 text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  Urgent requests require additional details
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Deadline date <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      value={deadline || ''}
                      onChange={(e) => setValue('deadline', e.target.value, { shouldValidate: true })}
                      min={minDate}
                      className="w-full pl-12 p-4 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400 transition-all [color-scheme:dark]"
                    />
                  </div>
                  {errors.deadline && (
                    <p className="mt-2 text-sm text-red-400">{errors.deadline.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Why is this urgent? <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    {...register('urgencyReason')}
                    rows={3}
                    placeholder="e.g., Product launch on Jan 20th, board meeting, conference..."
                    className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 resize-none focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400 transition-all"
                  />
                  {errors.urgencyReason && (
                    <p className="mt-2 text-sm text-red-400">{errors.urgencyReason.message}</p>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Section C: Additional Notes */}
      <div className="space-y-3">
        <label className="block text-lg font-semibold text-white">
          Anything else we should know?
          <span className="text-gray-500 text-sm font-normal ml-2">Optional</span>
        </label>
        <textarea
          {...register('additionalNotes')}
          rows={4}
          placeholder="Context, constraints, concerns — anything that helps us deliver exactly what you need."
          className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 resize-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
        />
      </div>
    </div>
  );
}


