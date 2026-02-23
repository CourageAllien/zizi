'use client';

import Link from 'next/link';
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
  Clock,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { ClientRequest, REQUEST_STATUS_CONFIG, REQUEST_TYPES } from '@/lib/schemas/request-schema';

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

interface RequestCardProps {
  request: ClientRequest;
  compact?: boolean;
}

export default function RequestCard({ request, compact = false }: RequestCardProps) {
  const typeInfo = REQUEST_TYPES.find(t => t.value === request.requestType);
  const TypeIcon = typeInfo ? (iconMap[typeInfo.icon] || PlusCircle) : PlusCircle;
  const statusConfig = REQUEST_STATUS_CONFIG[request.status];

  const createdDate = new Date(request.createdAt);
  const estimatedDelivery = request.estimatedDelivery ? new Date(request.estimatedDelivery) : null;

  if (compact) {
    return (
      <Link href={`/request/${request.id}`}>
        <motion.div
          className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group"
          whileHover={{ x: 4 }}
        >
          <div className="p-2 rounded-lg bg-white/5">
            <TypeIcon className="w-5 h-5 text-gray-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {typeInfo?.label || 'Custom Request'}
            </p>
            <p className="text-xs text-gray-500">{request.id}</p>
          </div>
          <span 
            className="px-2.5 py-1 rounded-full text-xs font-medium"
            style={{ 
              backgroundColor: statusConfig.bgColor, 
              color: statusConfig.color 
            }}
          >
            {statusConfig.label}
          </span>
          <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-gray-400 transition-colors" />
        </motion.div>
      </Link>
    );
  }

  return (
    <Link href={`/request/${request.id}`}>
      <motion.div
        className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group"
        whileHover={{ y: -2 }}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div 
              className="p-3 rounded-xl"
              style={{ backgroundColor: `${statusConfig.color}15` }}
            >
              <TypeIcon className="w-6 h-6" style={{ color: statusConfig.color }} />
            </div>
            <div>
              <h3 className="font-semibold text-white group-hover:text-primary transition-colors">
                {typeInfo?.label || 'Custom Request'}
              </h3>
              <p className="text-sm text-gray-500">{request.id}</p>
            </div>
          </div>
          <span 
            className="px-3 py-1.5 rounded-full text-xs font-semibold"
            style={{ 
              backgroundColor: statusConfig.bgColor, 
              color: statusConfig.color 
            }}
          >
            {statusConfig.label}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-400 text-sm line-clamp-2 mb-4">
          {request.description.substring(0, 150)}...
        </p>

        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>{formatDistanceToNow(createdDate, { addSuffix: true })}</span>
          </div>
          
          {estimatedDelivery && request.status !== 'completed' && (
            <div className="flex items-center gap-1.5">
              <span className="text-gray-600">•</span>
              <span>ETA: {format(estimatedDelivery, 'MMM d')}</span>
            </div>
          )}

          {request.previewUrl && (
            <div className="flex items-center gap-1.5 text-primary">
              <ExternalLink className="w-4 h-4" />
              <span>Preview available</span>
            </div>
          )}
        </div>

        {/* Action hint */}
        <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {request.goals.slice(0, 2).map(goal => (
              <span 
                key={goal}
                className="px-2 py-1 rounded-md bg-white/5 text-xs text-gray-400"
              >
                {goal.replace(/-/g, ' ')}
              </span>
            ))}
            {request.goals.length > 2 && (
              <span className="text-xs text-gray-500">+{request.goals.length - 2}</span>
            )}
          </div>
          <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-primary group-hover:translate-x-1 transition-all" />
        </div>
      </motion.div>
    </Link>
  );
}


