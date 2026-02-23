'use client';

import { motion } from 'framer-motion';
import {
  FileText,
  Clock,
  Zap,
  Eye,
  RefreshCw,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { RequestStatus, getStatusColor } from '@/lib/workspace-types';

interface ProcessTimelineProps {
  currentStatus?: RequestStatus;
  compact?: boolean;
}

const stages = [
  {
    status: 'new' as RequestStatus,
    label: 'Submitted',
    icon: FileText,
    description: 'Your request is received and queued'
  },
  {
    status: 'processing' as RequestStatus,
    label: 'Building',
    icon: Zap,
    description: 'We are actively building your solution'
  },
  {
    status: 'review' as RequestStatus,
    label: 'Review',
    icon: Eye,
    description: 'Ready for your review and approval'
  },
  {
    status: 'completed' as RequestStatus,
    label: 'Done',
    icon: CheckCircle,
    description: 'Completed and delivered!'
  }
];

const statusOrder: RequestStatus[] = ['new', 'queued', 'processing', 'review', 'revision', 'final', 'completed'];

export default function ProcessTimeline({ currentStatus, compact = false }: ProcessTimelineProps) {
  const currentIndex = currentStatus ? statusOrder.indexOf(currentStatus) : -1;

  const getStageStatus = (stageStatus: RequestStatus) => {
    const stageIndex = statusOrder.indexOf(stageStatus);
    if (stageIndex < currentIndex) return 'completed';
    if (stageIndex === currentIndex) return 'current';
    return 'upcoming';
  };

  if (compact) {
    return (
      <div className="flex items-center gap-1 overflow-x-auto py-2">
        {stages.map((stage, index) => {
          const status = getStageStatus(stage.status);
          const Icon = stage.icon;
          
          return (
            <div key={stage.status} className="flex items-center">
              <div
                className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs whitespace-nowrap ${
                  status === 'completed' ? 'bg-green-500/20 text-green-400' :
                  status === 'current' ? 'bg-primary/20 text-primary' :
                  'bg-white/5 text-gray-500'
                }`}
              >
                <Icon className="w-3 h-3" />
                {stage.label}
              </div>
              {index < stages.length - 1 && (
                <ArrowRight className={`w-3 h-3 mx-1 ${
                  status === 'completed' ? 'text-green-400' : 'text-gray-600'
                }`} />
              )}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Connection line */}
      <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-white/10" />
      
      <div className="space-y-6">
        {stages.map((stage, index) => {
          const status = getStageStatus(stage.status);
          const Icon = stage.icon;
          
          return (
            <motion.div
              key={stage.status}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative flex items-start gap-4"
            >
              {/* Icon */}
              <div
                className={`relative z-10 w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                  status === 'completed' ? 'bg-green-500/20' :
                  status === 'current' ? 'bg-primary/20 ring-2 ring-primary/50' :
                  'bg-white/5'
                }`}
              >
                <Icon
                  className={`w-6 h-6 ${
                    status === 'completed' ? 'text-green-400' :
                    status === 'current' ? 'text-primary' :
                    'text-gray-500'
                  }`}
                />
              </div>

              {/* Content */}
              <div className="flex-1 pt-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className={`font-semibold ${
                    status === 'completed' ? 'text-green-400' :
                    status === 'current' ? 'text-white' :
                    'text-gray-500'
                  }`}>
                    {stage.label}
                  </h4>
                  {status === 'current' && (
                    <span className="px-2 py-0.5 rounded-full text-xs bg-primary/20 text-primary animate-pulse">
                      Current
                    </span>
                  )}
                  {status === 'completed' && (
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  )}
                </div>
                <p className={`text-sm ${
                  status === 'upcoming' ? 'text-gray-600' : 'text-gray-400'
                }`}>
                  {stage.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

