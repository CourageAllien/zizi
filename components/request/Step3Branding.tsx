'use client';

import { UseFormReturn } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Palette, 
  Globe, 
  Sparkles, 
  EyeOff,
  Server,
  Code,
  Upload,
  HelpCircle,
  Check,
  Star
} from 'lucide-react';
import { RequestFormData, BRANDING_OPTIONS, HOSTING_OPTIONS } from '@/lib/schemas/request-schema';

const brandingIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'use-existing': Palette,
  'match-website': Globe,
  'start-fresh': Sparkles,
  'white-label': EyeOff,
};

const hostingIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'host-for-me': Server,
  'embed': Code,
  'my-domain': Upload,
  'not-sure': HelpCircle,
};

interface Step3Props {
  form: UseFormReturn<RequestFormData>;
}

export default function Step3Branding({ form }: Step3Props) {
  const { watch, setValue, register, formState: { errors } } = form;
  const brandingOption = watch('brandingOption');
  const hostingOption = watch('hostingOption');
  const websiteUrl = watch('websiteUrl');

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
          Branding & Hosting
        </h2>
        <p className="text-gray-400 text-lg">
          How should it look and where should it live?
        </p>
      </div>

      {/* Section A: Branding */}
      <div className="space-y-4">
        <label className="block text-lg font-semibold text-white">
          Branding requirements <span className="text-red-400">*</span>
        </label>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {BRANDING_OPTIONS.map((option) => {
            const Icon = brandingIcons[option.value];
            const isSelected = brandingOption === option.value;

            return (
              <motion.button
                key={option.value}
                type="button"
                onClick={() => setValue('brandingOption', option.value as RequestFormData['brandingOption'], { shouldValidate: true })}
                className={`relative p-5 rounded-2xl text-left transition-all ${
                  isSelected
                    ? 'bg-primary/10 border-2 border-primary'
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
                      className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center"
                    >
                      <Check className="w-4 h-4 text-white" />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl transition-colors ${
                    isSelected ? 'bg-primary/20' : 'bg-white/5'
                  }`}>
                    <Icon className={`w-6 h-6 ${
                      isSelected ? 'text-primary' : 'text-gray-400'
                    }`} />
                  </div>
                  <div>
                    <h3 className={`font-semibold mb-1 ${
                      isSelected ? 'text-primary' : 'text-white'
                    }`}>
                      {option.label}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {option.description}
                    </p>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {errors.brandingOption && (
          <p className="text-sm text-red-400">{errors.brandingOption.message}</p>
        )}

        {/* Conditional fields based on branding option */}
        <AnimatePresence>
          {brandingOption === 'match-website' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Website URL <span className="text-red-400">*</span>
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-4 rounded-l-xl bg-white/5 border border-r-0 border-white/10 text-gray-400 text-sm">
                    https://
                  </span>
                  <input
                    type="text"
                    value={(websiteUrl || '').replace(/^https?:\/\//, '')}
                    onChange={(e) => {
                      const value = e.target.value.replace(/^https?:\/\//, '');
                      setValue('websiteUrl', value ? `https://${value}` : '', { shouldValidate: true });
                    }}
                    placeholder="yourcompany.com"
                    className="flex-1 p-4 rounded-r-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>
                {errors.websiteUrl && (
                  <p className="mt-2 text-sm text-red-400">{errors.websiteUrl.message}</p>
                )}
              </div>
            </motion.div>
          )}

          {brandingOption === 'use-existing' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-4 p-4 rounded-xl bg-primary/5 border border-primary/20">
                <p className="text-sm text-gray-300">
                  <span className="text-primary font-medium">Tip:</span> You can upload brand assets (logo, style guide, etc.) in the final review step.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Section B: Hosting */}
      <div className="space-y-4">
        <label className="block text-lg font-semibold text-white">
          Where should this live? <span className="text-red-400">*</span>
        </label>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {HOSTING_OPTIONS.map((option) => {
            const Icon = hostingIcons[option.value];
            const isSelected = hostingOption === option.value;

            return (
              <motion.button
                key={option.value}
                type="button"
                onClick={() => setValue('hostingOption', option.value as RequestFormData['hostingOption'], { shouldValidate: true })}
                className={`relative p-5 rounded-2xl text-left transition-all ${
                  isSelected
                    ? 'bg-primary/10 border-2 border-primary'
                    : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20'
                }`}
                whileTap={{ scale: 0.98 }}
              >
                {/* Popular badge */}
                {'popular' in option && option.popular && (
                  <div className="absolute -top-2 left-4 px-2 py-0.5 rounded-full bg-accent text-white text-xs font-medium flex items-center gap-1">
                    <Star className="w-3 h-3" /> Most Popular
                  </div>
                )}

                {/* Selected indicator */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center"
                    >
                      <Check className="w-4 h-4 text-white" />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl transition-colors ${
                    isSelected ? 'bg-primary/20' : 'bg-white/5'
                  }`}>
                    <Icon className={`w-6 h-6 ${
                      isSelected ? 'text-primary' : 'text-gray-400'
                    }`} />
                  </div>
                  <div>
                    <h3 className={`font-semibold mb-1 ${
                      isSelected ? 'text-primary' : 'text-white'
                    }`}>
                      {option.label}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {option.description}
                    </p>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {errors.hostingOption && (
          <p className="text-sm text-red-400">{errors.hostingOption.message}</p>
        )}
      </div>
    </div>
  );
}
