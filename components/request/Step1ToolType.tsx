'use client';

import { UseFormReturn } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  ClipboardCheck, 
  Play, 
  FileText, 
  TrendingUp, 
  Magnet, 
  Layout, 
  Users, 
  Target, 
  Zap, 
  PlusCircle,
  Check
} from 'lucide-react';
import { RequestFormData, REQUEST_TYPES } from '@/lib/schemas/request-schema';

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BarChart3,
  ClipboardCheck,
  Play,
  FileText,
  TrendingUp,
  Magnet,
  Layout,
  Users,
  Target,
  Zap,
  PlusCircle,
};

interface Step1Props {
  form: UseFormReturn<RequestFormData>;
}

export default function Step1ToolType({ form }: Step1Props) {
  const { watch, setValue, formState: { errors } } = form;
  const selectedType = watch('requestType');
  const otherDescription = watch('otherRequestType');

  const handleSelect = (value: string) => {
    setValue('requestType', value as RequestFormData['requestType'], { shouldValidate: true });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
          What do you want us to build?
        </h2>
        <p className="text-gray-400 text-lg">
          Select the type of tool, or choose "Other" if you don't see a match.
        </p>
      </div>

      {/* Tool Type Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {REQUEST_TYPES.map((type) => {
          const Icon = iconMap[type.icon] || PlusCircle;
          const isSelected = selectedType === type.value;

          return (
            <motion.button
              key={type.value}
              type="button"
              onClick={() => handleSelect(type.value)}
              className={`relative p-5 rounded-2xl text-left transition-all duration-300 group ${
                isSelected
                  ? 'bg-primary/10 border-2 border-primary shadow-lg shadow-primary/20'
                  : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20'
              }`}
              whileHover={{ scale: 1.02 }}
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
                  isSelected 
                    ? 'bg-primary/20' 
                    : 'bg-white/5 group-hover:bg-white/10'
                }`}>
                  <Icon className={`w-6 h-6 ${
                    isSelected ? 'text-primary' : 'text-gray-400 group-hover:text-gray-300'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`font-semibold mb-1 ${
                    isSelected ? 'text-primary' : 'text-white'
                  }`}>
                    {type.label}
                  </h3>
                  <p className="text-sm text-gray-400 line-clamp-2">
                    {type.description}
                  </p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Other description field */}
      <AnimatePresence>
        {selectedType === 'other' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tell us what you need
              </label>
              <textarea
                value={otherDescription || ''}
                onChange={(e) => setValue('otherRequestType', e.target.value, { shouldValidate: true })}
                placeholder="Describe the tool or feature you have in mind..."
                className="w-full h-32 p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 resize-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
              {errors.otherRequestType && (
                <p className="mt-2 text-sm text-red-400">{errors.otherRequestType.message}</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Validation error */}
      {errors.requestType && (
        <p className="text-center text-sm text-red-400">{errors.requestType.message}</p>
      )}
    </div>
  );
}

