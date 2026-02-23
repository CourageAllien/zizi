'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  Shield,
  RefreshCw,
  Clock,
  Eye,
  CheckCircle2,
  AlertCircle,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Play,
  Pause,
  RotateCcw,
  Check,
  X,
  Send,
  Loader2,
  BarChart3,
  Users,
  TrendingUp,
  Calendar
} from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { 
  ClientRequest, 
  REQUEST_STATUS_CONFIG, 
  REQUEST_TYPES,
  ClientRequestStatus
} from '@/lib/schemas/request-schema';

const STATUS_OPTIONS: { value: ClientRequestStatus; label: string; color: string }[] = [
  { value: 'queued', label: 'In Queue', color: '#9CA3AF' },
  { value: 'in-progress', label: 'In Progress', color: '#06B6D4' },
  { value: 'ready-for-review', label: 'Ready for Review', color: '#EAB308' },
  { value: 'revisions-requested', label: 'Revisions Requested', color: '#F97316' },
  { value: 'completed', label: 'Completed', color: '#22C55E' },
];

interface RequestRowProps {
  request: ClientRequest;
  onStatusChange: (id: string, status: ClientRequestStatus) => void;
  onUpdatePreviewUrl: (id: string, url: string) => void;
  isUpdating: boolean;
}

function RequestRow({ request, onStatusChange, onUpdatePreviewUrl, isUpdating }: RequestRowProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(request.previewUrl || '');
  const [isEditingUrl, setIsEditingUrl] = useState(false);

  const typeInfo = REQUEST_TYPES.find(t => t.value === request.requestType);
  const statusConfig = REQUEST_STATUS_CONFIG[request.status];

  const handleSaveUrl = () => {
    onUpdatePreviewUrl(request.id, previewUrl);
    setIsEditingUrl(false);
  };

  const getUrgencyBadge = () => {
    if (request.urgency === 'urgent') {
      return <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 text-xs font-medium">Urgent</span>;
    }
    if (request.urgency === 'priority') {
      return <span className="px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 text-xs font-medium">Priority</span>;
    }
    return null;
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
      {/* Main Row */}
      <div 
        className="p-4 cursor-pointer hover:bg-white/5 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-4">
          {/* Expand Icon */}
          <button className="p-1 text-gray-500">
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>

          {/* Request Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1">
              <span className="font-mono text-sm text-primary">{request.id}</span>
              {getUrgencyBadge()}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white font-medium">{typeInfo?.label || 'Custom'}</span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-400 text-sm">{request.userEmail}</span>
            </div>
          </div>

          {/* Status */}
          <div className="relative">
            <button
              onClick={(e) => { e.stopPropagation(); setShowStatusMenu(!showStatusMenu); }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-colors"
              style={{ 
                backgroundColor: `${statusConfig.color}15`,
                borderColor: `${statusConfig.color}30`,
                color: statusConfig.color
              }}
            >
              <span className="text-sm font-medium">{statusConfig.label}</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {/* Status Dropdown */}
            <AnimatePresence>
              {showStatusMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 top-full mt-2 w-48 bg-background-secondary border border-white/10 rounded-xl shadow-xl z-10 overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  {STATUS_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        onStatusChange(request.id, option.value);
                        setShowStatusMenu(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/5 transition-colors ${
                        request.status === option.value ? 'bg-white/5' : ''
                      }`}
                    >
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: option.color }}
                      />
                      <span className="text-sm text-gray-300">{option.label}</span>
                      {request.status === option.value && (
                        <Check className="w-4 h-4 text-primary ml-auto" />
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Date */}
          <div className="text-right hidden sm:block">
            <p className="text-sm text-gray-400">{format(new Date(request.createdAt), 'MMM d, yyyy')}</p>
            <p className="text-xs text-gray-500">{formatDistanceToNow(new Date(request.createdAt), { addSuffix: true })}</p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link
              href={`/request/${request.id}`}
              onClick={(e) => e.stopPropagation()}
              className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              title="View Details"
            >
              <Eye className="w-5 h-5" />
            </Link>
            {request.previewUrl && (
              <a
                href={request.previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-2 rounded-lg hover:bg-primary/20 text-primary transition-colors"
                title="Open Preview"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-2 border-t border-white/10 space-y-4">
              {/* Description */}
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wider mb-1 block">Description</label>
                <p className="text-gray-300 text-sm whitespace-pre-wrap">
                  {request.description.substring(0, 300)}
                  {request.description.length > 300 && '...'}
                </p>
              </div>

              {/* Target Audience */}
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wider mb-1 block">Target Audience</label>
                <p className="text-gray-300 text-sm">{request.targetAudience}</p>
              </div>

              {/* Goals */}
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wider mb-1 block">Goals</label>
                <div className="flex flex-wrap gap-2">
                  {request.goals.map(goal => (
                    <span key={goal} className="px-2 py-1 rounded-md bg-primary/10 text-primary text-xs">
                      {goal.replace(/-/g, ' ')}
                    </span>
                  ))}
                </div>
              </div>

              {/* Preview URL */}
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wider mb-1 block">Preview URL</label>
                {isEditingUrl ? (
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={previewUrl}
                      onChange={(e) => setPreviewUrl(e.target.value)}
                      placeholder="https://preview.example.com/..."
                      className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary"
                    />
                    <button
                      onClick={handleSaveUrl}
                      disabled={isUpdating}
                      className="px-3 py-2 rounded-lg bg-primary text-white text-sm hover:bg-primary-light transition-colors disabled:opacity-50"
                    >
                      {isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save'}
                    </button>
                    <button
                      onClick={() => { setIsEditingUrl(false); setPreviewUrl(request.previewUrl || ''); }}
                      className="px-3 py-2 rounded-lg bg-white/5 text-gray-400 text-sm hover:bg-white/10 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    {request.previewUrl ? (
                      <a 
                        href={request.previewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary text-sm hover:underline"
                      >
                        {request.previewUrl}
                      </a>
                    ) : (
                      <span className="text-gray-500 text-sm">No preview URL set</span>
                    )}
                    <button
                      onClick={() => setIsEditingUrl(true)}
                      className="text-xs text-primary hover:underline"
                    >
                      {request.previewUrl ? 'Edit' : 'Add URL'}
                    </button>
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="flex gap-2 pt-2">
                {request.status === 'queued' && (
                  <button
                    onClick={() => onStatusChange(request.id, 'in-progress')}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 text-primary text-sm hover:bg-primary/20 transition-colors"
                  >
                    <Play className="w-4 h-4" />
                    Start Building
                  </button>
                )}
                {request.status === 'in-progress' && (
                  <button
                    onClick={() => onStatusChange(request.id, 'ready-for-review')}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-yellow-500/10 text-yellow-400 text-sm hover:bg-yellow-500/20 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    Mark Ready for Review
                  </button>
                )}
                {request.status === 'revisions-requested' && (
                  <button
                    onClick={() => onStatusChange(request.id, 'in-progress')}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-accent/10 text-accent text-sm hover:bg-accent/20 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Start Revisions
                  </button>
                )}
                {request.status === 'ready-for-review' && (
                  <button
                    onClick={() => onStatusChange(request.id, 'completed')}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-500/10 text-green-400 text-sm hover:bg-green-500/20 transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Mark Completed
                  </button>
                )}
              </div>

              {/* Revisions */}
              {request.revisions && request.revisions.length > 0 && (
                <div className="pt-2 border-t border-white/10">
                  <label className="text-xs text-gray-500 uppercase tracking-wider mb-2 block">
                    Revisions ({request.revisions.length})
                  </label>
                  <div className="space-y-2">
                    {request.revisions.map((revision, index) => (
                      <div key={revision.id} className="p-3 rounded-lg bg-accent/5 border border-accent/20">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-accent font-medium">Revision #{request.revisions.length - index}</span>
                          <span className="text-xs text-gray-500">
                            {formatDistanceToNow(new Date(revision.createdAt), { addSuffix: true })}
                          </span>
                        </div>
                        <p className="text-sm text-gray-300">{revision.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function RequestAdminPage() {
  const [requests, setRequests] = useState<ClientRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<ClientRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ClientRequestStatus | 'all'>('all');
  const [counts, setCounts] = useState<Record<ClientRequestStatus, number>>({
    'queued': 0,
    'in-progress': 0,
    'ready-for-review': 0,
    'revisions-requested': 0,
    'completed': 0,
  });

  useEffect(() => {
    fetchRequests();
  }, []);

  useEffect(() => {
    filterRequests();
  }, [requests, searchQuery, statusFilter]);

  const fetchRequests = async () => {
    try {
      const [requestsRes, countsRes] = await Promise.all([
        fetch('/api/requests?admin=true'),
        fetch('/api/requests?countOnly=true&admin=true'),
      ]);

      const requestsData = await requestsRes.json();
      const countsData = await countsRes.json();

      if (requestsData.success) {
        setRequests(requestsData.requests);
      }
      if (countsData.success) {
        setCounts(countsData.counts);
      }
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterRequests = () => {
    let filtered = [...requests];

    if (statusFilter !== 'all') {
      filtered = filtered.filter(r => r.status === statusFilter);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(r =>
        r.id.toLowerCase().includes(query) ||
        r.userEmail.toLowerCase().includes(query) ||
        r.description.toLowerCase().includes(query) ||
        r.requestType.toLowerCase().includes(query)
      );
    }

    setFilteredRequests(filtered);
  };

  const handleStatusChange = async (id: string, status: ClientRequestStatus) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/requests/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update-status', status }),
      });

      const data = await res.json();
      if (data.success) {
        setRequests(prev => prev.map(r => r.id === id ? data.request : r));
        // Update counts
        fetchRequests();
      }
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleUpdatePreviewUrl = async (id: string, previewUrl: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/requests/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ previewUrl }),
      });

      const data = await res.json();
      if (data.success) {
        setRequests(prev => prev.map(r => r.id === id ? data.request : r));
      }
    } catch (error) {
      console.error('Error updating preview URL:', error);
    } finally {
      setUpdatingId(null);
    }
  };

  const totalRequests = Object.values(counts).reduce((a, b) => a + b, 0);
  const activeRequests = counts['in-progress'] + counts['queued'] + counts['revisions-requested'];

  return (
    <div className="p-6 lg:p-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">Request Admin</h1>
            <p className="text-gray-400">Manage all client requests</p>
          </div>
        </div>
        <button
          onClick={fetchRequests}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 text-gray-300 hover:bg-white/10 transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 className="w-5 h-5 text-gray-400" />
            <span className="text-2xl font-bold text-white">{totalRequests}</span>
          </div>
          <p className="text-sm text-gray-500">Total Requests</p>
        </div>
        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-5 h-5 text-gray-400" />
            <span className="text-2xl font-bold text-white">{counts['queued']}</span>
          </div>
          <p className="text-sm text-gray-500">In Queue</p>
        </div>
        <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
          <div className="flex items-center gap-3 mb-2">
            <RefreshCw className="w-5 h-5 text-primary" />
            <span className="text-2xl font-bold text-primary">{counts['in-progress']}</span>
          </div>
          <p className="text-sm text-gray-500">In Progress</p>
        </div>
        <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
          <div className="flex items-center gap-3 mb-2">
            <Eye className="w-5 h-5 text-yellow-400" />
            <span className="text-2xl font-bold text-yellow-400">{counts['ready-for-review']}</span>
          </div>
          <p className="text-sm text-gray-500">Ready for Review</p>
        </div>
        <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle2 className="w-5 h-5 text-green-400" />
            <span className="text-2xl font-bold text-green-400">{counts['completed']}</span>
          </div>
          <p className="text-sm text-gray-500">Completed</p>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by ID, email, description..."
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              statusFilter === 'all'
                ? 'bg-white/10 text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            All ({totalRequests})
          </button>
          {STATUS_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => setStatusFilter(option.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                statusFilter === option.value
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
              style={{
                backgroundColor: statusFilter === option.value ? `${option.color}20` : 'rgba(255,255,255,0.05)',
                ...(statusFilter === option.value && { color: option.color }),
              }}
            >
              {option.label} ({counts[option.value]})
            </button>
          ))}
        </div>
      </div>

      {/* Request List */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-20 rounded-xl bg-white/5 animate-pulse" />
          ))}
        </div>
      ) : filteredRequests.length > 0 ? (
        <div className="space-y-3">
          {filteredRequests.map((request) => (
            <RequestRow
              key={request.id}
              request={request}
              onStatusChange={handleStatusChange}
              onUpdatePreviewUrl={handleUpdatePreviewUrl}
              isUpdating={updatingId === request.id}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <AlertCircle className="w-16 h-16 text-gray-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No requests found</h3>
          <p className="text-gray-400">
            {searchQuery || statusFilter !== 'all'
              ? 'Try adjusting your filters'
              : 'No requests have been submitted yet'}
          </p>
        </div>
      )}
    </div>
  );
}

