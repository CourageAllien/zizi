'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  BarChart3, 
  ClipboardCheck, 
  Play, 
  FileText, 
  TrendingUp, 
  Magnet, 
  Layout, 
  Target,
  FileQuestion,
  ArrowRight
} from 'lucide-react';
import { RequestTemplate, requestTemplates } from '@/lib/request-templates';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BarChart3,
  ClipboardCheck,
  Play,
  FileText,
  TrendingUp,
  Magnet,
  Layout,
  Target,
};

interface TemplatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (template: RequestTemplate | null) => void;
}

export default function TemplatesModal({ isOpen, onClose, onSelectTemplate }: TemplatesModalProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (template: RequestTemplate) => {
    setSelectedId(template.id);
    setTimeout(() => {
      onSelectTemplate(template);
      onClose();
      setSelectedId(null);
    }, 200);
  };

  const handleStartBlank = () => {
    onSelectTemplate(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-3xl md:max-h-[85vh] bg-background-secondary rounded-2xl border border-white/10 shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div>
                <h2 className="text-xl font-bold text-white">Start with a template</h2>
                <p className="text-gray-400 text-sm mt-1">
                  Save time by starting with a pre-filled request, then customize.
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Templates Grid */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {requestTemplates.map((template) => {
                  const Icon = iconMap[template.icon] || FileQuestion;
                  const isSelected = selectedId === template.id;

                  return (
                    <motion.button
                      key={template.id}
                      onClick={() => handleSelect(template)}
                      className={`p-5 rounded-xl text-left transition-all group ${
                        isSelected
                          ? 'bg-primary/20 border-2 border-primary'
                          : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20'
                      }`}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl transition-colors ${
                          isSelected ? 'bg-primary/30' : 'bg-white/5 group-hover:bg-white/10'
                        }`}>
                          <Icon className={`w-6 h-6 ${
                            isSelected ? 'text-primary' : 'text-gray-400 group-hover:text-gray-300'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <h3 className={`font-semibold mb-1 ${
                            isSelected ? 'text-primary' : 'text-white'
                          }`}>
                            {template.name}
                          </h3>
                          <p className="text-sm text-gray-400 line-clamp-2">
                            {template.description}
                          </p>
                        </div>
                        <ArrowRight className={`w-5 h-5 flex-shrink-0 transition-all ${
                          isSelected 
                            ? 'text-primary translate-x-1' 
                            : 'text-gray-600 group-hover:text-gray-400 group-hover:translate-x-1'
                        }`} />
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10">
              <button
                onClick={handleStartBlank}
                className="w-full py-4 rounded-xl border-2 border-dashed border-white/20 text-gray-300 hover:border-white/40 hover:text-white hover:bg-white/5 transition-all flex items-center justify-center gap-2"
              >
                <FileQuestion className="w-5 h-5" />
                Start from scratch
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}


