'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Plus,
  LogOut,
  Bell,
  HelpCircle,
  ChevronRight,
  Clock,
  CheckCircle,
  AlertCircle,
  Zap,
  RefreshCw,
  Eye,
  MessageSquare,
  FileText,
  X,
  Send,
  Lightbulb,
  Info,
  Calendar,
  ArrowRight,
  Timer,
  ThumbsUp,
  ThumbsDown,
  ExternalLink,
  Search,
  Filter
} from 'lucide-react';
import { useWorkspace } from '@/lib/workspace-context';
import { Request, RequestStatus, getStatusLabel, getStatusColor, getEstimatedDays, RequestComplexity } from '@/lib/workspace-types';
import OnboardingGuide from '@/components/portal/OnboardingGuide';

// Stage configuration with colors and icons
const stages: { status: RequestStatus; label: string; icon: React.ElementType; color: string; description: string }[] = [
  { status: 'new', label: 'Submitted', icon: FileText, color: '#8B5CF6', description: 'Request received' },
  { status: 'queued', label: 'In Queue', icon: Clock, color: '#F59E0B', description: 'Waiting to start' },
  { status: 'processing', label: 'Building', icon: Zap, color: '#06B6D4', description: 'Actively being built' },
  { status: 'review', label: 'Review', icon: Eye, color: '#10B981', description: 'Ready for your review' },
  { status: 'revision', label: 'Revision', icon: RefreshCw, color: '#F97316', description: 'Making changes' },
  { status: 'final', label: 'Final Phase', icon: CheckCircle, color: '#3B82F6', description: 'Wrapping up' },
  { status: 'completed', label: 'Done', icon: CheckCircle, color: '#22C55E', description: 'Completed!' }
];

export default function ClientWorkspace() {
  const router = useRouter();
  const {
    currentUser,
    isAdmin,
    logout,
    getWorkspace,
    getWorkspaceRequests,
    createRequest,
    submitReviewFeedback,
    templates,
    faqs,
    unreadCount,
    markAsRead
  } = useWorkspace();

  const [showNewRequestModal, setShowNewRequestModal] = useState(false);
  const [showFAQModal, setShowFAQModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [showOnboarding, setShowOnboarding] = useState(false);

  // Check if first visit
  useEffect(() => {
    if (currentUser?.workspaceId) {
      const hasSeenOnboarding = localStorage.getItem(`zizi-onboarding-${currentUser.workspaceId}`);
      if (!hasSeenOnboarding) {
        setShowOnboarding(true);
      }
    }
  }, [currentUser]);

  const dismissOnboarding = () => {
    setShowOnboarding(false);
    if (currentUser?.workspaceId) {
      localStorage.setItem(`zizi-onboarding-${currentUser.workspaceId}`, 'true');
    }
  };
  
  // Form state
  const [requestForm, setRequestForm] = useState({
    title: '',
    description: '',
    complexity: '' as RequestComplexity | '',
    category: ''
  });
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated && (!currentUser || isAdmin)) {
      router.push('/portal');
    }
  }, [currentUser, isAdmin, router, isHydrated]);

  if (!isHydrated || !currentUser || isAdmin || !currentUser.workspaceId) {
    return (
      <div className="min-h-screen bg-background-primary flex items-center justify-center">
        <div className="spinner" />
      </div>
    );
  }

  const workspace = getWorkspace(currentUser.workspaceId);
  const allRequests = getWorkspaceRequests(currentUser.workspaceId);
  
  // Filter requests
  const requests = allRequests.filter(r => {
    if (activeFilter === 'active') return r.status !== 'completed';
    if (activeFilter === 'completed') return r.status === 'completed';
    return true;
  });

  // Auto-detect complexity based on description keywords
  const detectComplexity = (description: string): RequestComplexity => {
    const complexKeywords = ['ai', 'machine learning', 'custom', 'integration', 'multiple', 'complex', 'dashboard', 'analytics', 'chatbot', 'workflow', 'automation'];
    const lowerDesc = description.toLowerCase();
    const hasComplexKeywords = complexKeywords.some(kw => lowerDesc.includes(kw));
    return hasComplexKeywords ? 'complex' : 'simple';
  };

  const handleDescriptionChange = (desc: string) => {
    setRequestForm(prev => ({
      ...prev,
      description: desc,
      complexity: desc.length > 50 ? detectComplexity(desc) : prev.complexity
    }));
  };

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestForm.complexity) return;
    
    createRequest({
      workspaceId: currentUser.workspaceId!,
      title: requestForm.title,
      description: requestForm.description,
      complexity: requestForm.complexity as RequestComplexity,
      category: requestForm.category
    });
    
    setRequestForm({ title: '', description: '', complexity: '', category: '' });
    setShowNewRequestModal(false);
  };

  const handleLogout = () => {
    logout();
    router.push('/portal');
  };

  const useTemplate = (template: typeof templates[0]) => {
    setRequestForm({
      title: template.name,
      description: template.exampleDescription,
      complexity: template.suggestedComplexity,
      category: template.category
    });
  };

  // Group requests by status for the board
  const getRequestsByStatus = (status: RequestStatus) => 
    requests.filter(r => r.status === status);

  // Visible stages (only show stages that have requests or are key stages)
  const visibleStages = stages.filter(stage => {
    const hasRequests = getRequestsByStatus(stage.status).length > 0;
    const isKeyStage = ['processing', 'review', 'completed'].includes(stage.status);
    return hasRequests || isKeyStage;
  });

  return (
    <div className="min-h-screen bg-background-primary">
      {/* Header */}
      <header className="sticky top-0 z-40 glass border-b border-white/5">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">{workspace?.companyName}</h1>
                <p className="text-xs text-gray-400">Your Workspace</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Help Button */}
              <button
                onClick={() => setShowFAQModal(true)}
                className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                title="Help & FAQ"
              >
                <HelpCircle className="w-5 h-5" />
              </button>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={(e) => { 
                    e.stopPropagation();
                    setShowNotifications(!showNotifications); 
                    if (!showNotifications) markAsRead(); 
                  }}
                  className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors relative"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full text-xs flex items-center justify-center text-white animate-pulse">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown Backdrop */}
                <AnimatePresence>
                  {showNotifications && (
                    <>
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40" 
                        onClick={() => setShowNotifications(false)}
                      />
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-2 w-80 bg-background-secondary border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50"
                        onClick={(e) => e.stopPropagation()}
                      >
                      <div className="p-4 border-b border-white/10">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-white">Notifications</h3>
                          <button
                            onClick={() => setShowNotifications(false)}
                            className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                          >
                            <X className="w-4 h-4 text-gray-400" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="max-h-80 overflow-y-auto">
                        {allRequests.flatMap(r => r.updates).length === 0 ? (
                          <div className="p-6 text-center">
                            <Bell className="w-10 h-10 text-gray-600 mx-auto mb-3" />
                            <p className="text-gray-400 text-sm">No notifications yet</p>
                            <p className="text-gray-500 text-xs mt-1">Updates will appear here</p>
                          </div>
                        ) : (
                          <div className="divide-y divide-white/5">
                            {allRequests
                              .flatMap(r => r.updates.map(u => ({ ...u, requestTitle: r.title, requestId: r.id })))
                              .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                              .slice(0, 10)
                              .map((update, index) => (
                                <div
                                  key={`${update.requestId}-${update.id}-${index}`}
                                  onClick={() => {
                                    const request = allRequests.find(r => r.id === update.requestId);
                                    if (request) {
                                      setSelectedRequest(request);
                                      setShowNotifications(false);
                                    }
                                  }}
                                  className="p-3 hover:bg-white/5 cursor-pointer transition-colors"
                                >
                                  <div className="flex items-start gap-3">
                                    <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                                      update.type === 'milestone' ? 'bg-primary' :
                                      update.type === 'completed' ? 'bg-green-400' :
                                      update.type === 'alert' ? 'bg-amber-400' : 'bg-gray-400'
                                    }`} />
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm text-white line-clamp-2">{update.message}</p>
                                      <p className="text-xs text-gray-500 mt-1">{update.requestTitle}</p>
                                      <p className="text-xs text-gray-600 mt-0.5">
                                        {new Date(update.timestamp).toLocaleDateString('en-GB', {
                                          day: '2-digit',
                                          month: 'short',
                                          hour: '2-digit',
                                          minute: '2-digit'
                                        })}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                          </div>
                        )}
                      </div>

                      <div className="p-3 border-t border-white/10 bg-background-primary/50">
                        <p className="text-xs text-gray-500 text-center">
                          Click a notification to view details
                        </p>
                      </div>
                    </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors ml-2"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Welcome Banner & Quick Actions */}
        <div className="mb-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">
                Welcome back, {currentUser.name.split(' ')[0]}! 👋
              </h2>
              <p className="text-gray-400">
                {allRequests.length === 0 
                  ? 'Submit your first request to get started'
                  : `You have ${allRequests.filter(r => r.status !== 'completed').length} active request(s)`
                }
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Filter Buttons */}
              <div className="hidden sm:flex items-center gap-1 bg-background-secondary rounded-lg p-1">
                {(['all', 'active', 'completed'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-3 py-1.5 rounded-md text-sm transition-colors capitalize ${
                      activeFilter === filter 
                        ? 'bg-primary text-white' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => setShowNewRequestModal(true)}
                className="btn-primary flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                New Request
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="glass rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xl font-bold text-white">{allRequests.length}</p>
                <p className="text-xs text-gray-400">Total</p>
              </div>
            </div>
          </div>
          <div className="glass rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                <Zap className="w-5 h-5 text-cyan-500" />
              </div>
              <div>
                <p className="text-xl font-bold text-white">
                  {allRequests.filter(r => r.status === 'processing').length}
                </p>
                <p className="text-xs text-gray-400">Building</p>
              </div>
            </div>
          </div>
          <div className="glass rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <Eye className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="text-xl font-bold text-white">
                  {allRequests.filter(r => r.status === 'review').length}
                </p>
                <p className="text-xs text-gray-400">To Review</p>
              </div>
            </div>
          </div>
          <div className="glass rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-xl font-bold text-white">
                  {allRequests.filter(r => r.status === 'completed').length}
                </p>
                <p className="text-xs text-gray-400">Completed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="overflow-x-auto pb-4 -mx-4 px-4">
          <div className="flex gap-4 min-w-max">
            {visibleStages.map((stage) => {
              const stageRequests = getRequestsByStatus(stage.status);
              const StageIcon = stage.icon;
              
              return (
                <div key={stage.status} className="w-80 flex-shrink-0">
                  {/* Column Header */}
                  <div 
                    className="flex items-center gap-2 mb-4 px-2"
                    style={{ color: stage.color }}
                  >
                    <StageIcon className="w-5 h-5" />
                    <h3 className="font-semibold">{stage.label}</h3>
                    <span className="ml-auto text-sm opacity-60">
                      {stageRequests.length}
                    </span>
                  </div>

                  {/* Cards */}
                  <div className="space-y-3">
                    <AnimatePresence>
                      {stageRequests.map((request) => (
                        <RequestCard
                          key={request.id}
                          request={request}
                          stageColor={stage.color}
                          onClick={() => setSelectedRequest(request)}
                        />
                      ))}
                    </AnimatePresence>

                    {/* Empty State */}
                    {stageRequests.length === 0 && (
                      <div className="glass rounded-xl p-6 text-center border border-dashed border-white/10">
                        <p className="text-sm text-gray-500">{stage.description}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Empty State for no requests */}
        {allRequests.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl p-12 text-center mt-8"
          >
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-6">
              <Lightbulb className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">
              Ready to build something amazing?
            </h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              Describe what you need and we'll handle the rest. Simple builds take 1-2 days, 
              complex builds take 5-7 days.
            </p>
            <button
              onClick={() => setShowNewRequestModal(true)}
              className="btn-primary inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Submit Your First Request
            </button>
          </motion.div>
        )}
      </main>

      {/* New Request Modal */}
      <AnimatePresence>
        {showNewRequestModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
            onClick={() => setShowNewRequestModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-2xl glass rounded-2xl p-6 my-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">New Request</h2>
                <button
                  onClick={() => setShowNewRequestModal(false)}
                  className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Templates Quick Select */}
              <div className="mb-6">
                <p className="text-sm text-gray-400 mb-3">Quick start with a template:</p>
                <div className="flex flex-wrap gap-2">
                  {templates.slice(0, 6).map((template) => (
                    <button
                      key={template.id}
                      onClick={() => useTemplate(template)}
                      className="px-3 py-2 rounded-lg bg-background-secondary hover:bg-white/10 text-sm text-gray-300 hover:text-white transition-colors flex items-center gap-2"
                    >
                      <span>{template.icon}</span>
                      {template.name}
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmitRequest} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    What do you want to build?
                  </label>
                  <input
                    type="text"
                    value={requestForm.title}
                    onChange={(e) => setRequestForm({ ...requestForm, title: e.target.value })}
                    placeholder="e.g., Customer Support Chatbot"
                    className="input-field text-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Describe what you need in detail
                  </label>
                  <textarea
                    value={requestForm.description}
                    onChange={(e) => handleDescriptionChange(e.target.value)}
                    placeholder="Be as specific as possible. What should it do? What problem does it solve? Any specific integrations or features needed?"
                    className="input-field min-h-32 resize-none"
                    rows={5}
                    required
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Tip: More detail = faster, more accurate builds
                  </p>
                </div>

                {/* Complexity Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Build Complexity
                    {requestForm.complexity && (
                      <span className="ml-2 text-xs text-gray-500">(auto-detected, adjust if needed)</span>
                    )}
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setRequestForm({ ...requestForm, complexity: 'simple' })}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        requestForm.complexity === 'simple'
                          ? 'border-green-500 bg-green-500/10'
                          : 'border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Timer className="w-5 h-5 text-green-500" />
                        <span className="font-semibold text-white">Simple</span>
                      </div>
                      <p className="text-sm text-gray-400 mb-2">
                        Single-function tools, basic automations, or standard integrations
                      </p>
                      <p className="text-xs font-medium text-green-400">
                        ⏱ 1-2 business days
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setRequestForm({ ...requestForm, complexity: 'complex' })}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        requestForm.complexity === 'complex'
                          ? 'border-amber-500 bg-amber-500/10'
                          : 'border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-5 h-5 text-amber-500" />
                        <span className="font-semibold text-white">Complex</span>
                      </div>
                      <p className="text-sm text-gray-400 mb-2">
                        AI systems, multi-step workflows, custom integrations
                      </p>
                      <p className="text-xs font-medium text-amber-400">
                        ⏱ 5-7 business days
                      </p>
                    </button>
                  </div>
                </div>

                {/* What to Expect */}
                {requestForm.complexity && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="bg-primary/10 border border-primary/20 rounded-xl p-4"
                  >
                    <div className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-white mb-1">What happens next?</p>
                        <ul className="text-sm text-gray-400 space-y-1">
                          <li>1. We review your request and start building</li>
                          <li>2. You'll see real-time progress updates</li>
                          <li>3. Once ready, we'll move it to Review for your approval</li>
                          <li>4. Request changes if needed, then we finalize!</li>
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowNewRequestModal(false)}
                    className="flex-1 btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!requestForm.complexity || !requestForm.title || !requestForm.description}
                    className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    Submit Request
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Request Detail Modal */}
      <AnimatePresence>
        {selectedRequest && (
          <RequestDetailModal
            request={selectedRequest}
            onClose={() => setSelectedRequest(null)}
            onSubmitReview={submitReviewFeedback}
          />
        )}
      </AnimatePresence>

      {/* FAQ Modal */}
      <AnimatePresence>
        {showFAQModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowFAQModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg glass rounded-2xl p-6 max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-primary" />
                  Help & FAQ
                </h2>
                <button
                  onClick={() => setShowFAQModal(false)}
                  className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {faqs.map((faq) => (
                  <div key={faq.id} className="bg-background-secondary rounded-xl p-4">
                    <h3 className="font-medium text-white mb-2">{faq.question}</h3>
                    <p className="text-sm text-gray-400">{faq.answer}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 text-center">
                <p className="text-sm text-gray-400 mb-3">Still have questions?</p>
                <a
                  href="mailto:support@zizi.so"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  Contact Support
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Onboarding Guide */}
      <AnimatePresence>
        {showOnboarding && (
          <OnboardingGuide
            onDismiss={dismissOnboarding}
            onCreateRequest={() => setShowNewRequestModal(true)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Request Card Component
function RequestCard({
  request,
  stageColor,
  onClick
}: {
  request: Request;
  stageColor: string;
  onClick: () => void;
}) {
  const isReviewReady = request.status === 'review';
  const isCompleted = request.status === 'completed';
  const isProcessing = request.status === 'processing';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      onClick={onClick}
      className={`glass rounded-xl p-4 cursor-pointer transition-all hover:bg-white/5 ${
        isReviewReady ? 'ring-2 ring-green-500/50' : ''
      }`}
      style={{ borderLeft: `3px solid ${stageColor}` }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <h4 className="font-medium text-white line-clamp-2">{request.title}</h4>
        <span className={`px-2 py-0.5 rounded-full text-xs whitespace-nowrap ${
          request.complexity === 'simple' 
            ? 'bg-green-500/20 text-green-400' 
            : 'bg-amber-500/20 text-amber-400'
        }`}>
          {request.complexity}
        </span>
      </div>

      {/* Description Preview */}
      <p className="text-sm text-gray-400 line-clamp-2 mb-3">
        {request.description}
      </p>

      {/* Progress Bar for Processing */}
      {isProcessing && (
        <div className="mb-3">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-gray-400">{request.currentPhase}</span>
            <span className="text-primary">{request.progressPercent}%</span>
          </div>
          <div className="h-1.5 bg-background-secondary rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-accent"
              initial={{ width: 0 }}
              animate={{ width: `${request.progressPercent}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      )}

      {/* Review Alert with Preview Link */}
      {isReviewReady && (
        <div className="bg-green-500/10 rounded-lg p-2 mb-3">
          <div className="flex items-center gap-2 mb-1">
            <Eye className="w-4 h-4 text-green-400" />
            <span className="text-xs text-green-400 font-medium">Ready for your review!</span>
          </div>
          {request.previewUrl && (
            <a
              href={request.previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 text-xs text-primary hover:underline mt-1"
            >
              <ExternalLink className="w-3 h-3" />
              Open Preview
            </a>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5" />
          {new Date(request.createdAt).toLocaleDateString()}
        </div>
        {request.estimatedCompletionAt && !isCompleted && (
          <div className="flex items-center gap-1">
            <Timer className="w-3.5 h-3.5" />
            Est. {new Date(request.estimatedCompletionAt).toLocaleDateString()}
          </div>
        )}
        {isCompleted && (
          <div className="flex items-center gap-1 text-green-400">
            <CheckCircle className="w-3.5 h-3.5" />
            Completed
          </div>
        )}
      </div>

      {/* Latest Update */}
      {request.updates.length > 0 && (
        <div className="mt-3 pt-3 border-t border-white/5">
          <p className="text-xs text-gray-500">
            Latest: {request.updates[request.updates.length - 1].message}
          </p>
        </div>
      )}
    </motion.div>
  );
}

// Request Detail Modal
function RequestDetailModal({
  request,
  onClose,
  onSubmitReview
}: {
  request: Request;
  onClose: () => void;
  onSubmitReview: (requestId: string, feedback: string, approved: boolean) => void;
}) {
  const [reviewMode, setReviewMode] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleApprove = () => {
    onSubmitReview(request.id, feedback, true);
    onClose();
  };

  const handleRequestChanges = () => {
    if (!feedback.trim()) {
      alert('Please describe the changes you need');
      return;
    }
    onSubmitReview(request.id, feedback, false);
    onClose();
  };

  const isReviewable = request.status === 'review';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="w-full max-w-2xl glass rounded-2xl p-6 max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span 
                className="px-2 py-1 rounded-full text-xs"
                style={{ 
                  backgroundColor: `${getStatusColor(request.status)}20`,
                  color: getStatusColor(request.status)
                }}
              >
                {getStatusLabel(request.status)}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs ${
                request.complexity === 'simple' 
                  ? 'bg-green-500/20 text-green-400' 
                  : 'bg-amber-500/20 text-amber-400'
              }`}>
                {request.complexity} • {getEstimatedDays(request.complexity).min}-{getEstimatedDays(request.complexity).max} days
              </span>
            </div>
            <h2 className="text-xl font-semibold text-white">{request.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Description */}
        <div className="bg-background-secondary rounded-xl p-4 mb-6">
          <h3 className="text-sm font-medium text-gray-400 mb-2">Request Details</h3>
          <p className="text-gray-300 whitespace-pre-wrap">{request.description}</p>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-400">Progress</h3>
            <span className="text-sm text-primary">{request.progressPercent}%</span>
          </div>
          <div className="h-2 bg-background-secondary rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-accent"
              initial={{ width: 0 }}
              animate={{ width: `${request.progressPercent}%` }}
            />
          </div>
          <p className="text-sm text-gray-400 mt-2">Current Phase: {request.currentPhase}</p>
        </div>

        {/* Timeline / Updates */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-400 mb-3">Activity Timeline</h3>
          <div className="space-y-3">
            {request.updates.slice().reverse().map((update, index) => (
              <div key={`${request.id}-${update.id}-${index}`} className="flex gap-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  update.type === 'completed' ? 'bg-green-500' :
                  update.type === 'milestone' ? 'bg-primary' :
                  update.type === 'alert' ? 'bg-orange-500' :
                  'bg-gray-500'
                }`} />
                <div>
                  <p className="text-sm text-gray-300">{update.message}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(update.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Preview URL */}
        {request.previewUrl && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-400 mb-3">Live Preview</h3>
            <a
              href={request.previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/30 rounded-xl p-4 hover:bg-primary/20 transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Eye className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-white font-medium">View Live Preview</p>
                <p className="text-xs text-gray-400 truncate">{request.previewUrl}</p>
              </div>
              <ExternalLink className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        )}

        {/* Deliverables */}
        {request.deliverables.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-400 mb-3">Deliverables & Documentation</h3>
            <div className="space-y-2">
              {request.deliverables.map((d) => (
                <a
                  key={d.id}
                  href={d.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-background-secondary rounded-xl p-3 hover:bg-white/5 transition-colors"
                >
                  {d.type === 'document' && <FileText className="w-5 h-5 text-blue-400" />}
                  {d.type === 'link' && <Zap className="w-5 h-5 text-green-400" />}
                  {d.type === 'preview' && <Eye className="w-5 h-5 text-purple-400" />}
                  {d.type === 'video' && <FileText className="w-5 h-5 text-red-400" />}
                  {d.type === 'file' && <FileText className="w-5 h-5 text-amber-400" />}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white">{d.name}</p>
                    {d.description && <p className="text-xs text-gray-500">{d.description}</p>}
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Review Section */}
        {isReviewable && (
          <div className="border-t border-white/10 pt-6">
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="w-5 h-5 text-green-400" />
                <span className="font-medium text-green-400">Ready for Review!</span>
              </div>
              <p className="text-sm text-gray-300">
                Please review the deliverables above and let us know if everything looks good 
                or if you'd like any changes.
              </p>
            </div>

            {!reviewMode ? (
              <div className="flex gap-3">
                <button
                  onClick={() => setReviewMode(true)}
                  className="flex-1 btn-secondary flex items-center justify-center gap-2"
                >
                  <ThumbsDown className="w-4 h-4" />
                  Request Changes
                </button>
                <button
                  onClick={handleApprove}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <ThumbsUp className="w-4 h-4" />
                  Approve & Continue
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    What changes would you like?
                  </label>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Describe the changes you need..."
                    className="input-field min-h-24 resize-none"
                    rows={3}
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setReviewMode(false)}
                    className="flex-1 btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleRequestChanges}
                    className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3 px-4 rounded-xl font-semibold transition-colors"
                  >
                    Submit Changes
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Close button for completed */}
        {request.status === 'completed' && (
          <div className="border-t border-white/10 pt-6">
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 mb-4 text-center">
              <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <span className="font-medium text-green-400">This build has been completed!</span>
              <p className="text-sm text-gray-400 mt-1">
                Completed on {request.completedAt && new Date(request.completedAt).toLocaleDateString()}
              </p>
            </div>
            <button onClick={onClose} className="w-full btn-primary">
              Close
            </button>
          </div>
        )}

        {/* Non-reviewable close */}
        {!isReviewable && request.status !== 'completed' && (
          <div className="pt-6 border-t border-white/10">
            <button onClick={onClose} className="w-full btn-secondary">
              Close
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}


