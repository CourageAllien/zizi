'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import RequestForm from '@/components/request/RequestForm';
import TemplatesModal from '@/components/request/TemplatesModal';
import { RequestTemplate } from '@/lib/request-templates';

export default function NewRequestPage() {
  const [showTemplates, setShowTemplates] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState<RequestTemplate | null>(null);
  const [formKey, setFormKey] = useState(0);

  const handleSelectTemplate = (template: RequestTemplate | null) => {
    setSelectedTemplate(template);
    setFormKey(prev => prev + 1); // Force form to reinitialize with new template
    setShowTemplates(false);
  };

  return (
    <div className="min-h-screen p-6 lg:p-10">
      {/* Header */}
      <div className="mb-8">
        <Link 
          href="/request"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Submit a New Request
          </h1>
          <p className="text-gray-400">
            Tell us what you need and we'll build it for you.
            {selectedTemplate && (
              <span className="ml-2 text-primary">
                Using template: {selectedTemplate.name}
              </span>
            )}
          </p>
        </motion.div>
      </div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <RequestForm 
          key={formKey}
          template={selectedTemplate}
          userId="demo-user"
          userEmail="demo@example.com"
        />
      </motion.div>

      {/* Templates Modal */}
      <TemplatesModal
        isOpen={showTemplates}
        onClose={() => setShowTemplates(false)}
        onSelectTemplate={handleSelectTemplate}
      />
    </div>
  );
}
