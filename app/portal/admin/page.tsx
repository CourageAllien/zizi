'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Plus,
  Users,
  Folder,
  Clock,
  CheckCircle,
  AlertCircle,
  Search,
  LogOut,
  Copy,
  Check,
  Trash2,
  Eye,
  X,
  Mail,
  Building2,
  User,
  Settings,
  BarChart3,
  Zap
} from 'lucide-react';
import { useWorkspace } from '@/lib/workspace-context';
import { Workspace } from '@/lib/workspace-types';

export default function AdminDashboard() {
  const router = useRouter();
  const {
    currentUser,
    isAdmin,
    logout,
    workspaces,
    requests,
    createWorkspace,
    deleteWorkspace,
    getWorkspaceRequests
  } = useWorkspace();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [selectedWorkspace, setSelectedWorkspace] = useState<Workspace | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    companyName: '',
    clientName: '',
    clientEmail: '',
    name: ''
  });
  const [isHydrated, setIsHydrated] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [sendWelcomeEmail, setSendWelcomeEmail] = useState(true);

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

  const handleCreateWorkspace = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    
    try {
      const workspace = await createWorkspace({
        name: formData.name || `${formData.companyName} Workspace`,
        companyName: formData.companyName,
        clientName: formData.clientName,
        clientEmail: formData.clientEmail
      }, sendWelcomeEmail);
      
      setShowCreateModal(false);
      setFormData({ companyName: '', clientName: '', clientEmail: '', name: '' });
      setSelectedWorkspace(workspace);
    } catch (error) {
      console.error('Failed to create workspace:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const copyAccessCode = (code: string) => {
    // Copy the direct access URL instead of just the code
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const accessUrl = `${baseUrl}/portal/access/${code}`;
    navigator.clipboard.writeText(accessUrl);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const copyCodeOnly = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleLogout = () => {
    logout();
    router.push('/portal');
  };

  const filteredWorkspaces = workspaces.filter(w =>
    w.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    w.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    w.clientEmail.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Stats
  const totalRequests = requests.length;
  const activeRequests = requests.filter(r => !['completed', 'new'].includes(r.status)).length;
  const completedRequests = requests.filter(r => r.status === 'completed').length;

  return (
    <div className="min-h-screen bg-background-primary">
      {/* Header */}
      <header className="sticky top-0 z-40 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">ZiziCo Admin</h1>
                <p className="text-xs text-gray-400">Workspace Management</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/portal/admin/requests')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-background-secondary hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
              >
                <Settings className="w-4 h-4" />
                <span className="hidden sm:inline">Manage Requests</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl p-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <Folder className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{workspaces.length}</p>
                <p className="text-sm text-gray-400">Total Workspaces</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-2xl p-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                <Clock className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{activeRequests}</p>
                <p className="text-sm text-gray-400">Active Builds</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-2xl p-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{completedRequests}</p>
                <p className="text-sm text-gray-400">Completed</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass rounded-2xl p-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                <Zap className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{totalRequests}</p>
                <p className="text-sm text-gray-400">Total Requests</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Workspace Management */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-xl font-semibold text-white">Client Workspaces</h2>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search workspaces..."
                className="w-full input-field pl-10"
              />
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="btn-primary flex items-center gap-2 whitespace-nowrap"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">New Workspace</span>
            </button>
          </div>
        </div>

        {/* Workspaces Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredWorkspaces.map((workspace, index) => {
              const wsRequests = getWorkspaceRequests(workspace.id);
              const activeCount = wsRequests.filter(r => !['completed', 'new'].includes(r.status)).length;
              const completedCount = wsRequests.filter(r => r.status === 'completed').length;

              return (
                <motion.div
                  key={workspace.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass rounded-2xl p-6 hover:bg-white/5 transition-colors group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{workspace.companyName}</h3>
                        <p className="text-sm text-gray-400">{workspace.clientName}</p>
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs ${workspace.isActive ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                      {workspace.isActive ? 'Active' : 'Inactive'}
                    </div>
                  </div>

                  {/* Access Code & Link */}
                  <div className="bg-background-secondary rounded-xl p-4 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Access Code</p>
                        <p className="text-xl font-mono font-bold text-primary tracking-wider">
                          {workspace.accessCode}
                        </p>
                      </div>
                      <button
                        onClick={() => copyCodeOnly(workspace.accessCode)}
                        className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                        title="Copy code only"
                      >
                        {copiedCode === workspace.accessCode ? (
                          <Check className="w-5 h-5 text-green-400" />
                        ) : (
                          <Copy className="w-5 h-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                    <button
                      onClick={() => copyAccessCode(workspace.accessCode)}
                      className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary text-sm transition-colors"
                    >
                      {copiedCode === workspace.accessCode ? (
                        <>
                          <Check className="w-4 h-4" />
                          Link Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy Client Login Link
                        </>
                      )}
                    </button>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-1.5 text-gray-400">
                      <Clock className="w-4 h-4 text-amber-500" />
                      <span>{activeCount} active</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-400">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>{completedCount} done</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-4 border-t border-white/5">
                    <button
                      onClick={() => setSelectedWorkspace(workspace)}
                      className="flex-1 btn-secondary py-2 text-sm flex items-center justify-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      View Details
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Delete this workspace? This cannot be undone.')) {
                          deleteWorkspace(workspace.id);
                        }
                      }}
                      className="p-2 rounded-lg hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Empty State */}
          {filteredWorkspaces.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full glass rounded-2xl p-12 text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-gray-800 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-gray-500" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {searchQuery ? 'No workspaces found' : 'No workspaces yet'}
              </h3>
              <p className="text-gray-400 mb-6">
                {searchQuery
                  ? 'Try adjusting your search terms'
                  : 'Create your first workspace to get started'}
              </p>
              {!searchQuery && (
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Create Workspace
                </button>
              )}
            </motion.div>
          )}
        </div>
      </main>

      {/* Create Workspace Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md glass rounded-2xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Create New Workspace</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateWorkspace} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Building2 className="w-4 h-4 inline mr-2" />
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="e.g., Acme Corporation"
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Client Name
                  </label>
                  <input
                    type="text"
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    placeholder="e.g., John Smith"
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Client Email
                  </label>
                  <input
                    type="email"
                    value={formData.clientEmail}
                    onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                    placeholder="e.g., john@acme.com"
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Folder className="w-4 h-4 inline mr-2" />
                    Workspace Name <span className="text-gray-500">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Auto-generated if empty"
                    className="input-field"
                  />
                </div>

                {/* Send Welcome Email Toggle */}
                <div className="flex items-center justify-between p-4 bg-background-secondary rounded-xl">
                  <div>
                    <p className="text-sm font-medium text-white">Send Welcome Email</p>
                    <p className="text-xs text-gray-400">Client receives access code & onboarding</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSendWelcomeEmail(!sendWelcomeEmail)}
                    className={`w-12 h-6 rounded-full transition-colors relative ${
                      sendWelcomeEmail ? 'bg-primary' : 'bg-gray-600'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                      sendWelcomeEmail ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 btn-secondary"
                    disabled={isCreating}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isCreating}
                    className="flex-1 btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isCreating ? (
                      <>
                        <div className="spinner w-4 h-4" />
                        Creating...
                      </>
                    ) : (
                      'Create Workspace'
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Workspace Details Modal */}
      <AnimatePresence>
        {selectedWorkspace && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedWorkspace(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg glass rounded-2xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">{selectedWorkspace.companyName}</h2>
                    <p className="text-sm text-gray-400">{selectedWorkspace.clientName}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedWorkspace(null)}
                  className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Access Code - Large Display */}
                <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-6 text-center">
                  <p className="text-sm text-gray-400 mb-2">Client Access Code</p>
                  <p className="text-4xl font-mono font-bold text-primary tracking-[0.4em]">
                    {selectedWorkspace.accessCode}
                  </p>
                  <button
                    onClick={() => copyAccessCode(selectedWorkspace.accessCode)}
                    className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                  >
                    {copiedCode === selectedWorkspace.accessCode ? (
                      <>
                        <Check className="w-4 h-4 text-green-400" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy Code
                      </>
                    )}
                  </button>
                </div>

                {/* Client Info */}
                <div className="bg-background-secondary rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Email</span>
                    <span className="text-white">{selectedWorkspace.clientEmail}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Created</span>
                    <span className="text-white">
                      {new Date(selectedWorkspace.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Status</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${selectedWorkspace.isActive ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                      {selectedWorkspace.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>

                {/* Requests Summary */}
                {(() => {
                  const wsRequests = getWorkspaceRequests(selectedWorkspace.id);
                  return (
                    <div className="bg-background-secondary rounded-xl p-4">
                      <h3 className="font-medium text-white mb-3">Requests Overview</h3>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-2xl font-bold text-white">{wsRequests.length}</p>
                          <p className="text-xs text-gray-400">Total</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-amber-400">
                            {wsRequests.filter(r => !['completed', 'new'].includes(r.status)).length}
                          </p>
                          <p className="text-xs text-gray-400">Active</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-green-400">
                            {wsRequests.filter(r => r.status === 'completed').length}
                          </p>
                          <p className="text-xs text-gray-400">Completed</p>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setSelectedWorkspace(null)}
                    className="flex-1 btn-secondary"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      const loginUrl = `${window.location.origin}/portal?code=${selectedWorkspace.accessCode}`;
                      navigator.clipboard.writeText(loginUrl);
                      alert('Login link copied to clipboard!');
                    }}
                    className="flex-1 btn-primary"
                  >
                    Copy Login Link
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
