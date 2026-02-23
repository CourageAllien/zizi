'use client';

import { UseFormReturn } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, AlertCircle } from 'lucide-react';
import { RequestFormData, GOAL_OPTIONS } from '@/lib/schemas/request-schema';

interface Step2Props {
  form: UseFormReturn<RequestFormData>;
}

export default function Step2Details({ form }: Step2Props) {
  const { register, watch, setValue, formState: { errors } } = form;
  const goals = watch('goals') || [];
  const otherGoal = watch('otherGoal');
  const description = watch('description') || '';

  const toggleGoal = (value: string) => {
    const currentGoals = [...goals];
    const index = currentGoals.indexOf(value);
    if (index > -1) {
      currentGoals.splice(index, 1);
    } else {
      currentGoals.push(value);
    }
    setValue('goals', currentGoals, { shouldValidate: true });
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
          Tell us the details
        </h2>
        <p className="text-gray-400 text-lg">
          The more context you provide, the better we can build.
        </p>
      </div>

      {/* Section A: Description */}
      <div className="space-y-3">
        <label className="block text-lg font-semibold text-white">
          Describe what you need <span className="text-red-400">*</span>
        </label>
        <div className="relative">
          <textarea
            {...register('description')}
            rows={8}
            placeholder={`Be as specific as possible. What should the tool do? What inputs and outputs? What's the user journey?

Example: I need a preview tool that lets prospects input their team size, current tools, and hours spent on manual tasks. It should show them projected ROI, how our product fits their workflow, and how they compare to industry benchmarks. End with email capture and demo booking.`}
            className={`w-full p-4 rounded-xl bg-white/5 border text-white placeholder-gray-500 resize-none focus:outline-none focus:ring-1 transition-all ${
              errors.description 
                ? 'border-red-400 focus:border-red-400 focus:ring-red-400' 
                : 'border-white/10 focus:border-primary focus:ring-primary'
            }`}
          />
          <div className="absolute bottom-3 right-3 text-sm text-gray-500">
            {description.length} / 50 min
          </div>
        </div>
        {errors.description && (
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-red-400"
          >
            <AlertCircle className="w-4 h-4" />
            {errors.description.message}
          </motion.p>
        )}
      </div>

      {/* Section B: Target Audience */}
      <div className="space-y-3">
        <label className="block text-lg font-semibold text-white">
          Who is this for? <span className="text-red-400">*</span>
        </label>
        <textarea
          {...register('targetAudience')}
          rows={4}
          placeholder={`Describe your prospect. Who will use this tool? What do they care about? What's their pain point?

Example: Marketing directors at B2B SaaS companies with 50-200 employees. They need to prove ROI to their CFO and are frustrated by manual reporting.`}
          className={`w-full p-4 rounded-xl bg-white/5 border text-white placeholder-gray-500 resize-none focus:outline-none focus:ring-1 transition-all ${
            errors.targetAudience 
              ? 'border-red-400 focus:border-red-400 focus:ring-red-400' 
              : 'border-white/10 focus:border-primary focus:ring-primary'
          }`}
        />
        {errors.targetAudience && (
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-red-400"
          >
            <AlertCircle className="w-4 h-4" />
            {errors.targetAudience.message}
          </motion.p>
        )}
      </div>

      {/* Section C: Goals */}
      <div className="space-y-4">
        <label className="block text-lg font-semibold text-white">
          What's the goal of this tool? <span className="text-red-400">*</span>
        </label>
        <p className="text-gray-400 text-sm">Select at least one</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {GOAL_OPTIONS.map((goal) => {
            const isSelected = goals.includes(goal.value);
            return (
              <motion.button
                key={goal.value}
                type="button"
                onClick={() => toggleGoal(goal.value)}
                className={`flex items-center gap-3 p-4 rounded-xl text-left transition-all ${
                  isSelected
                    ? 'bg-primary/10 border-2 border-primary'
                    : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20'
                }`}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                  isSelected ? 'bg-primary' : 'bg-white/10'
                }`}>
                  {isSelected && <Check className="w-3 h-3 text-white" />}
                </div>
                <span className={isSelected ? 'text-primary' : 'text-gray-300'}>
                  {goal.label}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Other goal input */}
        <AnimatePresence>
          {goals.includes('other') && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <input
                type="text"
                value={otherGoal || ''}
                onChange={(e) => setValue('otherGoal', e.target.value, { shouldValidate: true })}
                placeholder="Describe your goal..."
                className="w-full mt-3 p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
              {errors.otherGoal && (
                <p className="mt-2 text-sm text-red-400">{errors.otherGoal.message}</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {errors.goals && (
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-red-400"
          >
            <AlertCircle className="w-4 h-4" />
            {errors.goals.message}
          </motion.p>
        )}
      </div>

      {/* Section D: Examples & References */}
      <div className="space-y-3">
        <label className="block text-lg font-semibold text-white">
          Do you have examples or references?
          <span className="text-gray-500 text-sm font-normal ml-2">Optional</span>
        </label>
        <p className="text-gray-400 text-sm">
          Links to similar tools, competitor examples, screenshots, or sketches.
        </p>
        <textarea
          {...register('examples')}
          rows={4}
          placeholder="Paste links or describe examples..."
          className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 resize-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
        />
      </div>

      {/* Section E: Content to Include */}
      <div className="space-y-3">
        <label className="block text-lg font-semibold text-white">
          Any specific copy or content?
          <span className="text-gray-500 text-sm font-normal ml-2">Optional</span>
        </label>
        <p className="text-gray-400 text-sm">
          Stats, testimonials, pricing details, or specific messaging to include.
        </p>
        <textarea
          {...register('content')}
          rows={4}
          placeholder="Paste or describe content to include..."
          className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 resize-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
        />
      </div>
    </div>
  );
}


