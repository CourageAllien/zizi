'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  ArrowLeft,
  Search,
  Filter,
  Clock,
  CheckCircle,
  AlertCircle,
  Zap,
  RefreshCw,
  Eye,
  Play,
  Pause,
  MessageSquare,
  X,
  Send,
  ChevronDown,
  Building2,
  FileText,
  Calendar,
  Timer,
  ArrowRight
} from 'lucide-react';
import { useWorkspace } from '@/lib/workspace-context';
import { Request, RequestStatus, getStatusLabel, getStatusColor, Workspace } from '@/lib/workspace-types';

export default function AdminRequestsPage() {
  const router = useRouter();
  const {
    currentUser,
    isAdmin,
    requests,
    workspaces,
    getWorkspace,
    updateRequestStatus,
    addRequestUpdate
  } = useWorkspace();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<RequestStatus | 'all'>('all');
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateMessage, setUpdateMessage] = useState('');
  const [progressValue, setProgressValue] = useState(0);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated && (!currentUser || !isAdmin)) {
      router.push('/portal');
    }
  }, [currentUser, isAdmin, router, isHydrated]);

  if (!isHydrated || !currentUser || !isAdmin) {
    return (
      <div className="min-h-screen bg-background-primary flex items-center justify-center">
        <div className="spinner" />
      </div>
    );
  }

  const filteredRequests = requests.filter(r => {
    const matchesSearch = 
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (requestId: string, newStatus: RequestStatus) => {
    const statusMessages: Record<RequestStatus, string> = {
      new: 'Request marked as new',
      queued: 'Request added to build queue',
      processing: 'Started building your request',
      review: 'Build complete! Ready for your review',
      revision: 'Working on your requested changes',
      final: 'Final touches being applied',
      completed: 'Request has been completed! 🎉'
    };
    updateRequestStatus(requestId, newStatus, statusMessages[newStatus]);
    setSelectedRequest(null);
  };

  const handleAddUpdate = () => {
    if (!selectedRequest || !updateMessage.trim()) return;
    addRequestUpdate(selectedRequest.id, {
      message: updateMessage,
      type: 'progress'
    });
    setUpdateMessage('');
    setShowUpdateModal(false);
  };

  const getWorkspaceName = (workspaceId: string) => {
    const ws = getWorkspace(workspaceId);
    return ws?.companyName || 'Unknown';
  };

  const statusOptions: { value: RequestStatus | 'all'; label: string; icon: React.ElementType }[] = [
    { value: 'all', label: 'All Requests', icon: FileText },
    { value: 'new', label: 'New', icon: FileText },
    { value: 'queued', label: 'Queued', icon: Clock },
    { value: 'processing', label: 'Building', icon: Zap },
    { value: 'review', label: 'Review', icon: Eye },
    { value: 'revision', label: 'Revision', icon: RefreshCw },
    { value: 'final', label: 'Final', icon: CheckCircle },
    { value: 'completed', label: 'Completed', icon: CheckCircle }
  ];

  return (
    <div className="min-h-screen bg-background-primary">
      {/* Header */}
      <header className="sticky top-0 z-40 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/portal/admin')}
                className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-white">Request Management</h1>
                  <p className="text-xs text-gray-400">Update client requests</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
          <div className="relative flex-1 w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search requests..."
              className="w-full input-field pl-10"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
            {statusOptions.map((opt) => {
              const Icon = opt.icon;
              const count = opt.value === 'all' 
                ? requests.length 
                : requests.filter(r => r.status === opt.value).length;
              
              return (
                <button
                  key={opt.value}
                  onClick={() => setStatusFilter(opt.value)}
                  className={`px-3 py-2 rounded-lg text-sm whitespace-nowrap flex items-center gap-2 transition-colors ${
                    statusFilter === opt.value
                      ? 'bg-primary text-white'
                      : 'bg-background-secondary text-gray-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {opt.label}
                  <span className="text-xs opacity-60">({count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Requests Table */}
        <div className="glass rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left p-4 text-sm font-medium text-gray-400">Request</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-400">Client</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-400">Type</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-400">Status</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-400">Progress</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-400">Created</th>
                  <th className="text-right p-4 text-sm font-medium text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((request) => (
                  <tr 
                    key={request.id} 
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-white">{request.title}</p>
                        <p className="text-sm text-gray-500 line-clamp-1">{request.description}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-300">{getWorkspaceName(request.workspaceId)}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        request.complexity === 'simple'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-amber-500/20 text-amber-400'
                      }`}>
                        {request.complexity}
                      </span>
                    </td>
                    <td className="p-4">
                      <span 
                        className="px-2 py-1 rounded-full text-xs"
                        style={{
                          backgroundColor: `${getStatusColor(request.status)}20`,
                          color: getStatusColor(request.status)
                        }}
                      >
                        {getStatusLabel(request.status)}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-background-secondary rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-primary to-accent"
                            style={{ width: `${request.progressPercent}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-400">{request.progressPercent}%</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-gray-400">
                        {new Date(request.createdAt).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedRequest(request)}
                          className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                          title="Manage"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredRequests.length === 0 && (
            <div className="p-12 text-center">
              <FileText className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No requests found</p>
            </div>
          )}
        </div>
      </main>

      {/* Request Management Modal */}
      <AnimatePresence>
        {selectedRequest && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedRequest(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-2xl glass rounded-2xl p-6 max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span 
                      className="px-2 py-1 rounded-full text-xs"
                      style={{ 
                        backgroundColor: `${getStatusColor(selectedRequest.status)}20`,
                        color: getStatusColor(selectedRequest.status)
                      }}
                    >
                      {getStatusLabel(selectedRequest.status)}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      selectedRequest.complexity === 'simple' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {selectedRequest.complexity}
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold text-white">{selectedRequest.title}</h2>
                  <p className="text-sm text-gray-400">{getWorkspaceName(selectedRequest.workspaceId)}</p>
                </div>
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Description */}
              <div className="bg-background-secondary rounded-xl p-4 mb-6">
                <h3 className="text-sm font-medium text-gray-400 mb-2">Description</h3>
                <p className="text-gray-300 whitespace-pre-wrap">{selectedRequest.description}</p>
              </div>

              {/* Quick Actions */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-400 mb-3">Update Status</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['queued', 'processing', 'review', 'completed'] as RequestStatus[]).map((status) => (
                    <button
                      key={status}
                      onClick={() => handleStatusChange(selectedRequest.id, status)}
                      disabled={selectedRequest.status === status}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                        selectedRequest.status === status
                          ? 'bg-white/10 text-white'
                          : 'bg-background-secondary hover:bg-white/10 text-gray-300'
                      }`}
                      style={{
                        borderLeft: `3px solid ${getStatusColor(status)}`
                      }}
                    >
                      {getStatusLabel(status)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add Update */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-400 mb-3">Send Update to Client</h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={updateMessage}
                    onChange={(e) => setUpdateMessage(e.target.value)}
                    placeholder="e.g., Completed API integration, moving to testing..."
                    className="flex-1 input-field"
                  />
                  <button
                    onClick={handleAddUpdate}
                    disabled={!updateMessage.trim()}
                    className="btn-primary px-4 disabled:opacity-50"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Recent Updates */}
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-3">Activity Log</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {selectedRequest.updates.slice().reverse().map((update) => (
                    <div key={update.id} className="flex items-start gap-3 p-3 bg-background-secondary rounded-lg">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        update.type === 'completed' ? 'bg-green-500' :
                        update.type === 'milestone' ? 'bg-primary' :
                        update.type === 'alert' ? 'bg-orange-500' :
                        'bg-gray-500'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-300">{update.message}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(update.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 mt-6 pt-4 border-t border-white/10">
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="flex-1 btn-secondary"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
