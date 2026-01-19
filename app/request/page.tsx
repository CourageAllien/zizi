'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  PlusCircle, 
  Clock, 
  RefreshCw, 
  Eye, 
  CheckCircle2,
  ArrowRight,
  Sparkles,
  TrendingUp
} from 'lucide-react';
import { ClientRequest, REQUEST_STATUS_CONFIG, ClientRequestStatus } from '@/lib/schemas/request-schema';
import RequestCard from '@/components/request/RequestCard';

const DEMO_USER_ID = 'demo-user';

interface StatCardProps {
  label: string;
  count: number;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
  bgColor: string;
}

function StatCard({ label, count, icon: Icon, color, bgColor }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-5 rounded-2xl bg-white/5 border border-white/10"
    >
      <div className="flex items-center justify-between mb-3">
        <div 
          className="p-2.5 rounded-xl"
          style={{ backgroundColor: bgColor }}
        >
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
        <span 
          className="text-3xl font-bold"
          style={{ color }}
        >
          {count}
        </span>
      </div>
      <p className="text-gray-400 text-sm font-medium">{label}</p>
    </motion.div>
  );
}

export default function RequestDashboard() {
  const [requests, setRequests] = useState<ClientRequest[]>([]);
  const [counts, setCounts] = useState<Record<ClientRequestStatus, number>>({
    'queued': 0,
    'in-progress': 0,
    'ready-for-review': 0,
    'revisions-requested': 0,
    'completed': 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch requests
      const requestsRes = await fetch(`/api/requests?userId=${DEMO_USER_ID}`);
      const requestsData = await requestsRes.json();
      
      if (requestsData.success) {
        setRequests(requestsData.requests);
      }

      // Fetch counts
      const countsRes = await fetch(`/api/requests?userId=${DEMO_USER_ID}&countOnly=true`);
      const countsData = await countsRes.json();
      
      if (countsData.success) {
        setCounts(countsData.counts);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const activeRequests = requests.filter(r => 
    r.status === 'in-progress' || r.status === 'ready-for-review'
  );
  const recentRequests = requests.slice(0, 5);

  return (
    <div className="p-6 lg:p-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Welcome back! 👋
          </h1>
          <p className="text-gray-400">
            Here's an overview of your requests.
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

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatCard
          label="In Progress"
          count={counts['in-progress']}
          icon={RefreshCw}
          color="#06B6D4"
          bgColor="rgba(6, 182, 212, 0.1)"
        />
        <StatCard
          label="In Queue"
          count={counts['queued']}
          icon={Clock}
          color="#9CA3AF"
          bgColor="rgba(156, 163, 175, 0.1)"
        />
        <StatCard
          label="Ready for Review"
          count={counts['ready-for-review']}
          icon={Eye}
          color="#EAB308"
          bgColor="rgba(234, 179, 8, 0.1)"
        />
        <StatCard
          label="Completed"
          count={counts['completed']}
          icon={CheckCircle2}
          color="#22C55E"
          bgColor="rgba(34, 197, 94, 0.1)"
        />
      </div>

      {/* Active Requests */}
      {activeRequests.length > 0 && (
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Active Requests
            </h2>
            <Link 
              href="/request/list"
              className="text-sm text-primary hover:underline flex items-center gap-1"
            >
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeRequests.map((request, index) => (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <RequestCard request={request} />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Recent Requests */}
      {recentRequests.length > 0 ? (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Recent Requests</h2>
            <Link 
              href="/request/list"
              className="text-sm text-primary hover:underline flex items-center gap-1"
            >
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {recentRequests.map((request, index) => (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <RequestCard request={request} compact />
              </motion.div>
            ))}
          </div>
        </section>
      ) : !isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-10 h-10 text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No requests yet</h3>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">
            Ready to get started? Submit your first request and we'll start building.
          </p>
          <Link
            href="/request/new"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-light transition-colors"
          >
            <PlusCircle className="w-5 h-5" />
            Submit Your First Request
          </Link>
        </motion.div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div 
              key={i}
              className="h-24 rounded-xl bg-white/5 animate-pulse"
            />
          ))}
        </div>
      )}
    </div>
  );
}
