'use client';

import { useState, useEffect, use } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowLeft,
  Clock,
  CheckCircle2,
  Eye,
  RefreshCw,
  Hammer,
  Send,
  ExternalLink,
  Calendar,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Rocket
} from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { 
  ClientRequest, 
  REQUEST_STATUS_CONFIG, 
  REQUEST_TYPES,
  BRANDING_OPTIONS,
  HOSTING_OPTIONS,
  GOAL_OPTIONS,
  INTEGRATION_OPTIONS
} from '@/lib/schemas/request-schema';
import RevisionRequest from '@/components/request/RevisionRequest';

interface TimelineStep {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  status: 'completed' | 'current' | 'pending';
  date?: string;
}

function getTimelineSteps(request: ClientRequest): TimelineStep[] {
  const statusOrder = ['queued', 'in-progress', 'ready-for-review', 'completed'];
  const currentIndex = statusOrder.indexOf(request.status);

  return [
    {
      id: 'submitted',
      label: 'Submitted',
      icon: Send,
      status: 'completed',
      date: request.createdAt,
    },
    {
      id: 'in-review',
      label: 'In Review',
      icon: Eye,
      status: currentIndex >= 0 ? 'completed' : 'pending',
      date: request.startedAt,
    },
    {
      id: 'building',
      label: 'Building',
      icon: Hammer,
      status: currentIndex >= 1 ? (currentIndex === 1 ? 'current' : 'completed') : 'pending',
      date: request.startedAt,
    },
    {
      id: 'review',
      label: 'Ready for Review',
      icon: CheckCircle2,
      status: currentIndex >= 2 ? (currentIndex === 2 ? 'current' : 'completed') : 'pending',
    },
    {
      id: 'completed',
      label: 'Completed',
      icon: Rocket,
      status: currentIndex >= 3 ? 'completed' : 'pending',
      date: request.completedAt,
    },
  ];
}

export default function RequestDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [request, setRequest] = useState<ClientRequest | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedSections, setExpandedSections] = useState<string[]>(['details']);
  const [showRevisionModal, setShowRevisionModal] = useState(false);

  useEffect(() => {
    fetchRequest();
  }, [id]);

  const fetchRequest = async () => {
    try {
      const res = await fetch(`/api/requests/${id}`);
      const data = await res.json();
      
      if (data.success) {
        setRequest(data.request);
      }
    } catch (error) {
      console.error('Error fetching request:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  if (isLoading) {
    return (
      <div className="p-6 lg:p-10">
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-48 bg-white/10 rounded-lg" />
          <div className="h-64 bg-white/10 rounded-2xl" />
          <div className="h-96 bg-white/10 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="p-6 lg:p-10 text-center py-20">
        <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-white mb-2">Request Not Found</h2>
        <p className="text-gray-400 mb-6">The request you're looking for doesn't exist.</p>
        <Link 
          href="/request"
          className="inline-flex items-center gap-2 text-primary hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
      </div>
    );
  }

  const statusConfig = REQUEST_STATUS_CONFIG[request.status];
  const typeInfo = REQUEST_TYPES.find(t => t.value === request.requestType);
  const brandingInfo = BRANDING_OPTIONS.find(b => b.value === request.brandingOption);
  const hostingInfo = HOSTING_OPTIONS.find(h => h.value === request.hostingOption);
  const timelineSteps = getTimelineSteps(request);

  const selectedGoals = GOAL_OPTIONS.filter(g => request.goals?.includes(g.value));
  const selectedIntegrations = INTEGRATION_OPTIONS.filter(i => request.integrations?.includes(i.value));

  const isReadyForReview = request.status === 'ready-for-review';
  const isCompleted = request.status === 'completed';

  return (
    <div className="p-6 lg:p-10">
      {/* Header */}
      <Link 
        href="/request"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1 space-y-6">
          {/* Request Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl p-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-bold text-white">
                    {typeInfo?.label || 'Custom Request'}
                  </h1>
                  <span 
                    className="px-3 py-1.5 rounded-full text-sm font-semibold"
                    style={{ 
                      backgroundColor: statusConfig.bgColor, 
                      color: statusConfig.color 
                    }}
                  >
                    {statusConfig.label}
                  </span>
                </div>
                <p className="text-gray-400 font-mono">{request.id}</p>
              </div>
              
              <div className="flex gap-2">
                {request.previewUrl && (
                  <a
                    href={request.previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Preview
                  </a>
                )}
                {isCompleted && request.liveUrl && (
                  <a
                    href={request.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-colors"
                  >
                    <Rocket className="w-4 h-4" />
                    View Live
                  </a>
                )}
              </div>
            </div>

            {/* Timeline */}
            <div className="flex items-center justify-between overflow-x-auto pb-2">
              {timelineSteps.map((step, index) => (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center min-w-[80px]">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                      step.status === 'completed' 
                        ? 'bg-green-500/20 text-green-400'
                        : step.status === 'current'
                          ? 'bg-primary/20 text-primary ring-2 ring-primary'
                          : 'bg-white/10 text-gray-500'
                    }`}>
                      <step.icon className="w-5 h-5" />
                    </div>
                    <span className={`text-xs font-medium text-center ${
                      step.status === 'completed' 
                        ? 'text-green-400'
                        : step.status === 'current'
                          ? 'text-primary'
                          : 'text-gray-500'
                    }`}>
                      {step.label}
                    </span>
                    {step.date && (
                      <span className="text-xs text-gray-600 mt-1">
                        {format(new Date(step.date), 'MMM d')}
                      </span>
                    )}
                  </div>
                  {index < timelineSteps.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-2 ${
                      step.status === 'completed' ? 'bg-green-500/30' : 'bg-white/10'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Actions for Ready for Review */}
          {isReadyForReview && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20"
            >
              <h3 className="text-lg font-semibold text-white mb-2">Your build is ready! 🎉</h3>
              <p className="text-gray-400 mb-4">
                Review the preview and let us know if you need any changes.
              </p>
              <div className="flex flex-wrap gap-3">
                {request.previewUrl && (
                  <a
                    href={request.previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-light transition-colors"
                  >
                    <Eye className="w-5 h-5" />
                    View Preview
                  </a>
                )}
                <button
                  onClick={() => setShowRevisionModal(true)}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 text-white hover:bg-white/10 transition-colors"
                >
                  <RefreshCw className="w-5 h-5" />
                  Request Revisions
                </button>
              </div>
            </motion.div>
          )}

          {/* Details Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-2xl overflow-hidden"
          >
            <button
              onClick={() => toggleSection('details')}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
            >
              <h2 className="text-lg font-semibold text-white">Request Details</h2>
              {expandedSections.includes('details') ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>
            
            {expandedSections.includes('details') && (
              <div className="px-6 pb-6 space-y-6 border-t border-white/10 pt-4">
                <div>
                  <label className="text-sm text-gray-500 mb-1 block">Description</label>
                  <p className="text-gray-300 whitespace-pre-wrap">{request.description}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500 mb-1 block">Target Audience</label>
                  <p className="text-gray-300">{request.targetAudience}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500 mb-2 block">Goals</label>
                  <div className="flex flex-wrap gap-2">
                    {selectedGoals.map(goal => (
                      <span 
                        key={goal.value}
                        className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm"
                      >
                        {goal.label}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-500 mb-1 block">Branding</label>
                    <p className="text-gray-300">{brandingInfo?.label}</p>
                    {request.websiteUrl && (
                      <p className="text-sm text-primary">{request.websiteUrl}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 mb-1 block">Hosting</label>
                    <p className="text-gray-300">{hostingInfo?.label}</p>
                  </div>
                </div>
                {selectedIntegrations.length > 0 && (
                  <div>
                    <label className="text-sm text-gray-500 mb-2 block">Integrations</label>
                    <div className="flex flex-wrap gap-2">
                      {selectedIntegrations.map(int => (
                        <span 
                          key={int.value}
                          className="px-3 py-1.5 rounded-full bg-white/5 text-gray-300 text-sm"
                        >
                          {int.label}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>

          {/* Revisions History */}
          {request.revisions && request.revisions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => toggleSection('revisions')}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
              >
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <RefreshCw className="w-5 h-5 text-accent" />
                  Revision History
                  <span className="px-2 py-0.5 rounded-full bg-accent/20 text-accent text-sm">
                    {request.revisions.length}
                  </span>
                </h2>
                {expandedSections.includes('revisions') ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>
              
              {expandedSections.includes('revisions') && (
                <div className="px-6 pb-6 space-y-4 border-t border-white/10 pt-4">
                  {request.revisions.map((revision, index) => (
                    <div key={revision.id} className="p-4 rounded-xl bg-white/5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-500">
                          Revision #{request.revisions.length - index}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatDistanceToNow(new Date(revision.createdAt), { addSuffix: true })}
                        </span>
                      </div>
                      <p className="text-gray-300">{revision.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:w-80 space-y-6">
          {/* Quick Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass rounded-2xl p-6 space-y-4"
          >
            <h3 className="font-semibold text-white">Quick Info</h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Submitted</span>
                <span className="text-white text-sm">
                  {format(new Date(request.createdAt), 'MMM d, yyyy')}
                </span>
              </div>
              
              {request.estimatedDelivery && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Est. Delivery</span>
                  <span className="text-primary text-sm font-medium">
                    {format(new Date(request.estimatedDelivery), 'MMM d, yyyy')}
                  </span>
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Urgency</span>
                <span className={`text-sm capitalize ${
                  request.urgency === 'urgent' ? 'text-red-400' :
                  request.urgency === 'priority' ? 'text-yellow-400' :
                  'text-gray-300'
                }`}>
                  {request.urgency}
                </span>
              </div>

              {request.revisions && request.revisions.length > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Revisions</span>
                  <span className="text-white text-sm">{request.revisions.length}</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-2xl p-6"
          >
            <h3 className="font-semibold text-white mb-4">Actions</h3>
            <div className="space-y-3">
              {isReadyForReview && (
                <button
                  onClick={() => setShowRevisionModal(true)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  Request Revisions
                </button>
              )}
              <Link
                href="/request/new"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 text-white hover:bg-white/10 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                Add Comment
              </Link>
            </div>
          </motion.div>

          {/* Need Help */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="p-4 rounded-xl bg-primary/5 border border-primary/20"
          >
            <p className="text-sm text-gray-400">
              <span className="text-primary font-medium">Need help?</span> Reply to your 
              confirmation email or reach out to us directly.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Revision Modal */}
      <RevisionRequest
        isOpen={showRevisionModal}
        onClose={() => setShowRevisionModal(false)}
        requestId={request.id}
        onSubmit={() => {
          fetchRequest();
          setShowRevisionModal(false);
        }}
      />
    </div>
  );
}
