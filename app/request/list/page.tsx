'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  PlusCircle, 
  Search,
  X,
  Inbox
} from 'lucide-react';
import { ClientRequest, ClientRequestStatus } from '@/lib/schemas/request-schema';
import RequestCard from '@/components/request/RequestCard';

const DEMO_USER_ID = 'demo-user';

const STATUS_FILTERS: { value: ClientRequestStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All Requests' },
  { value: 'queued', label: 'In Queue' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'ready-for-review', label: 'Ready for Review' },
  { value: 'revisions-requested', label: 'Revisions Requested' },
  { value: 'completed', label: 'Completed' },
];

function RequestListContent() {
  const searchParams = useSearchParams();
  const initialStatus = searchParams.get('status') as ClientRequestStatus | null;
  
  const [requests, setRequests] = useState<ClientRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<ClientRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ClientRequestStatus | 'all'>(
    initialStatus || 'all'
  );

  useEffect(() => {
    fetchRequests();
  }, []);

  useEffect(() => {
    filterRequests();
  }, [requests, searchQuery, statusFilter]);

  const fetchRequests = async () => {
    try {
      const res = await fetch(`/api/requests?userId=${DEMO_USER_ID}`);
      const data = await res.json();
      
      if (data.success) {
        setRequests(data.requests);
      }
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterRequests = () => {
    let filtered = [...requests];

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(r => r.status === statusFilter);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(r => 
        r.id.toLowerCase().includes(query) ||
        r.description.toLowerCase().includes(query) ||
        r.requestType.toLowerCase().includes(query)
      );
    }

    setFilteredRequests(filtered);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
  };

  const hasActiveFilters = searchQuery.trim() || statusFilter !== 'all';

  return (
    <div className="p-6 lg:p-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            My Requests
          </h1>
          <p className="text-gray-400">
            {filteredRequests.length} request{filteredRequests.length !== 1 ? 's' : ''}
            {hasActiveFilters && ' (filtered)'}
          </p>
        </div>
        <Link
          href="/request/new"
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-semibold hover:opacity-90 transition-opacity"
        >
          <PlusCircle className="w-5 h-5" />
          New Request
        </Link>
      </div>

      {/* Filters */}
      <div className="mb-8 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by ID, description, or type..."
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-white/10 text-gray-400"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Status Filters */}
        <div className="flex flex-wrap gap-2">
          {STATUS_FILTERS.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setStatusFilter(filter.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                statusFilter === filter.value
                  ? 'bg-primary text-white'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {filter.label}
            </button>
          ))}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="px-4 py-2 rounded-full text-sm font-medium bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all flex items-center gap-1"
            >
              <X className="w-3 h-3" />
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Request List */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4].map(i => (
            <div 
              key={i}
              className="h-40 rounded-2xl bg-white/5 animate-pulse"
            />
          ))}
        </div>
      ) : filteredRequests.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredRequests.map((request, index) => (
            <motion.div
              key={request.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <RequestCard request={request} />
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
            <Inbox className="w-10 h-10 text-gray-500" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            {hasActiveFilters ? 'No matching requests' : 'No requests yet'}
          </h3>
          <p className="text-gray-400 mb-6">
            {hasActiveFilters 
              ? 'Try adjusting your filters or search query.'
              : 'Submit your first request to get started.'
            }
          </p>
          {hasActiveFilters ? (
            <button
              onClick={clearFilters}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
              Clear Filters
            </button>
          ) : (
            <Link
              href="/request/new"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-light transition-colors"
            >
              <PlusCircle className="w-5 h-5" />
              Submit a Request
            </Link>
          )}
        </motion.div>
      )}
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="p-6 lg:p-10">
      <div className="space-y-4">
        {[1, 2, 3, 4].map(i => (
          <div 
            key={i}
            className="h-40 rounded-2xl bg-white/5 animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}

export default function RequestListPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <RequestListContent />
    </Suspense>
  );
}
