'use client';

import { UseFormReturn } from 'react-hook-form';
import { motion } from 'framer-motion';
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
  Edit2,
  Check,
  ChevronDown,
  ChevronUp,
  X,
  FileIcon,
  AlertTriangle
} from 'lucide-react';
import { useState } from 'react';
import { 
  RequestFormData, 
  REQUEST_TYPES,
  GOAL_OPTIONS,
  BRANDING_OPTIONS,
  HOSTING_OPTIONS,
  INTEGRATION_OPTIONS,
  URGENCY_OPTIONS
} from '@/lib/schemas/request-schema';
import { format } from 'date-fns';

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

interface Step5Props {
  form: UseFormReturn<RequestFormData>;
  onGoToStep: (step: number) => void;
}

interface SectionProps {
  title: string;
  onEdit: () => void;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function ReviewSection({ title, onEdit, children, defaultOpen = false }: SectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
      >
        <span className="font-semibold text-white">{title}</span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onEdit(); }}
            className="flex items-center gap-1 px-3 py-1 rounded-lg bg-primary/10 text-primary text-sm hover:bg-primary/20 transition-colors"
          >
            <Edit2 className="w-3 h-3" />
            Edit
          </button>
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </div>
      </button>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="px-4 pb-4 pt-2 border-t border-white/5"
        >
          {children}
        </motion.div>
      )}
    </div>
  );
}

function Badge({ children, color = 'gray' }: { children: React.ReactNode; color?: string }) {
  const colorClasses: Record<string, string> = {
    gray: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
    primary: 'bg-primary/10 text-primary border-primary/20',
    accent: 'bg-accent/10 text-accent border-accent/20',
    yellow: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    red: 'bg-red-500/10 text-red-400 border-red-500/20',
    green: 'bg-green-500/10 text-green-400 border-green-500/20',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${colorClasses[color]}`}>
      {children}
    </span>
  );
}

export default function Step5Review({ form, onGoToStep }: Step5Props) {
  const { watch, setValue } = form;
  const values = watch();

  // Get display values
  const requestTypeInfo = REQUEST_TYPES.find(t => t.value === values.requestType);
  const RequestIcon = requestTypeInfo ? (iconMap[requestTypeInfo.icon] || PlusCircle) : PlusCircle;
  
  const brandingInfo = BRANDING_OPTIONS.find(b => b.value === values.brandingOption);
  const hostingInfo = HOSTING_OPTIONS.find(h => h.value === values.hostingOption);
  const urgencyInfo = URGENCY_OPTIONS.find(u => u.value === values.urgency);

  const selectedGoals = GOAL_OPTIONS.filter(g => values.goals?.includes(g.value));
  const selectedIntegrations = INTEGRATION_OPTIONS.filter(i => values.integrations?.includes(i.value));

  const removeFile = (fileId: string) => {
    const currentFiles = values.files || [];
    setValue('files', currentFiles.filter(f => f.id !== fileId), { shouldValidate: true });
  };

  const getUrgencyColor = () => {
    switch (values.urgency) {
      case 'urgent': return 'red';
      case 'priority': return 'yellow';
      case 'standard': return 'primary';
      default: return 'gray';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
          Review your request
        </h2>
        <p className="text-gray-400 text-lg">
          Make sure everything looks right before submitting.
        </p>
      </div>

      {/* Review Sections */}
      <div className="space-y-4">
        {/* Tool Type */}
        <ReviewSection title="Tool Type" onEdit={() => onGoToStep(0)} defaultOpen>
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-primary/10">
              <RequestIcon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold text-white">
                {requestTypeInfo?.label || 'Other'}
              </h4>
              <p className="text-sm text-gray-400">
                {requestTypeInfo?.description || values.otherRequestType}
              </p>
            </div>
          </div>
        </ReviewSection>

        {/* Details */}
        <ReviewSection title="Details" onEdit={() => onGoToStep(1)} defaultOpen>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Description</label>
              <p className="text-gray-300 whitespace-pre-wrap">
                {values.description?.length > 300 
                  ? `${values.description.substring(0, 300)}...`
                  : values.description
                }
              </p>
            </div>
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Target Audience</label>
              <p className="text-gray-300">{values.targetAudience}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500 mb-2 block">Goals</label>
              <div className="flex flex-wrap gap-2">
                {selectedGoals.map(goal => (
                  <Badge key={goal.value} color="primary">{goal.label}</Badge>
                ))}
                {values.otherGoal && (
                  <Badge color="accent">{values.otherGoal}</Badge>
                )}
              </div>
            </div>
            {values.examples && (
              <div>
                <label className="text-sm text-gray-500 mb-1 block">Examples/References</label>
                <p className="text-gray-300">{values.examples}</p>
              </div>
            )}
          </div>
        </ReviewSection>

        {/* Branding & Hosting */}
        <ReviewSection title="Branding & Hosting" onEdit={() => onGoToStep(2)}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Branding</label>
              <p className="text-gray-300 font-medium">{brandingInfo?.label}</p>
              <p className="text-sm text-gray-500">{brandingInfo?.description}</p>
              {values.websiteUrl && (
                <p className="text-sm text-primary mt-1">{values.websiteUrl}</p>
              )}
            </div>
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Hosting</label>
              <p className="text-gray-300 font-medium">{hostingInfo?.label}</p>
              <p className="text-sm text-gray-500">{hostingInfo?.description}</p>
            </div>
          </div>
        </ReviewSection>

        {/* Integrations & Timeline */}
        <ReviewSection title="Integrations & Timeline" onEdit={() => onGoToStep(3)}>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-500 mb-2 block">Integrations</label>
              <div className="flex flex-wrap gap-2">
                {selectedIntegrations.length > 0 ? (
                  selectedIntegrations.map(int => (
                    <Badge key={int.value}>{int.label}</Badge>
                  ))
                ) : (
                  <span className="text-gray-500 text-sm">No integrations selected</span>
                )}
                {values.otherIntegration && (
                  <Badge color="accent">{values.otherIntegration}</Badge>
                )}
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Urgency</label>
              <Badge color={getUrgencyColor()}>
                {urgencyInfo?.label} — {urgencyInfo?.description}
              </Badge>
              {values.deadline && (
                <p className="text-sm text-red-400 mt-2">
                  Deadline: {format(new Date(values.deadline), 'MMMM d, yyyy')}
                </p>
              )}
              {values.urgencyReason && (
                <p className="text-sm text-gray-400 mt-1">
                  Reason: {values.urgencyReason}
                </p>
              )}
            </div>
            {values.additionalNotes && (
              <div>
                <label className="text-sm text-gray-500 mb-1 block">Additional Notes</label>
                <p className="text-gray-300">{values.additionalNotes}</p>
              </div>
            )}
          </div>
        </ReviewSection>

        {/* Uploaded Files */}
        {values.files && values.files.length > 0 && (
          <ReviewSection title={`Uploaded Files (${values.files.length})`} onEdit={() => onGoToStep(1)}>
            <div className="space-y-2">
              {values.files.map(file => (
                <div 
                  key={file.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-white/5"
                >
                  <div className="flex items-center gap-3">
                    <FileIcon className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-300">{file.name}</p>
                      <p className="text-xs text-gray-500">
                        {(file.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(file.id)}
                    className="p-1 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </ReviewSection>
        )}
      </div>

      {/* Important Notice */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start gap-3 p-4 rounded-xl bg-accent/5 border border-accent/20"
      >
        <AlertTriangle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
        <div className="text-sm">
          <p className="text-gray-300 font-medium mb-1">Before you submit</p>
          <p className="text-gray-400">
            By submitting, you're adding this to your request queue. We'll start working on it 
            based on your plan's active request limit and the urgency level selected.
          </p>
        </div>
      </motion.div>

      {/* Success indicators */}
      <div className="flex flex-wrap gap-4 justify-center text-sm">
        <div className="flex items-center gap-2 text-green-400">
          <Check className="w-4 h-4" />
          All required fields completed
        </div>
        <div className="flex items-center gap-2 text-green-400">
          <Check className="w-4 h-4" />
          Ready to submit
        </div>
      </div>
    </div>
  );
}


