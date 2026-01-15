'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  User,
  Workspace,
  Request,
  RequestTemplate,
  FAQ,
  RequestComplexity,
  RequestStatus,
  RequestUpdate,
  Deliverable,
  calculateEstimatedCompletion,
  getEstimatedDays,
  generateSecureAccessCode
} from './workspace-types';

// Generate unique IDs
function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Mock FAQ Data
const mockFAQs: FAQ[] = [
  {
    id: '1',
    question: 'How long does a simple build take?',
    answer: 'Simple builds typically take 1-2 business days. These include straightforward implementations like basic automations, simple integrations, or minor enhancements.',
    category: 'timeline'
  },
  {
    id: '2',
    question: 'How long does a complex build take?',
    answer: 'Complex builds take 5-7 business days. These involve advanced AI systems, multi-step workflows, custom integrations, or solutions requiring significant planning and testing.',
    category: 'timeline'
  },
  {
    id: '3',
    question: 'What counts as a "simple" vs "complex" request?',
    answer: 'Simple requests are single-function tools, basic automations, or standard integrations. Complex requests involve multiple interconnected systems, AI/ML components, or require custom architecture design.',
    category: 'process'
  },
  {
    id: '4',
    question: 'Can I submit multiple requests at once?',
    answer: 'Yes! You can submit as many requests as you need. We\'ll work through them based on priority and complexity, keeping you updated on progress for each.',
    category: 'process'
  },
  {
    id: '5',
    question: 'What happens during the "Processing" phase?',
    answer: 'During processing, our team is actively building your solution. You\'ll receive real-time updates on progress, including milestones reached and any questions we have.',
    category: 'process'
  },
  {
    id: '6',
    question: 'What if I need changes after reviewing?',
    answer: 'No problem! During the review phase, you can request revisions. We\'ll make the adjustments and move it back for another review until you\'re 100% satisfied.',
    category: 'revisions'
  },
  {
    id: '7',
    question: 'Are there any limits on revisions?',
    answer: 'We want you to be completely happy with the result. While we don\'t have strict limits, we work with you to ensure revisions are within the original scope.',
    category: 'revisions'
  },
  {
    id: '8',
    question: 'How do I know when my build is ready for review?',
    answer: 'You\'ll receive a notification when your build moves to the "Review" column. The card will also show a green indicator and include all deliverables for you to test.',
    category: 'notifications'
  }
];

// Mock Templates
const mockTemplates: RequestTemplate[] = [
  {
    id: '1',
    name: 'Email Automation',
    description: 'Automate email responses, follow-ups, or newsletters',
    category: 'Automation',
    suggestedComplexity: 'simple',
    exampleDescription: 'I need an automated email sequence that sends welcome emails to new subscribers, then follow-up emails at day 3 and day 7.',
    icon: '📧'
  },
  {
    id: '2',
    name: 'AI Chatbot',
    description: 'Customer support or sales assistant chatbot',
    category: 'AI',
    suggestedComplexity: 'complex',
    exampleDescription: 'Build an AI chatbot for our website that can answer product questions, help with troubleshooting, and escalate to human support when needed.',
    icon: '🤖'
  },
  {
    id: '3',
    name: 'Data Dashboard',
    description: 'Visual analytics and reporting dashboard',
    category: 'Analytics',
    suggestedComplexity: 'complex',
    exampleDescription: 'Create a dashboard that pulls data from our CRM and shows sales metrics, pipeline health, and team performance with daily auto-updates.',
    icon: '📊'
  },
  {
    id: '4',
    name: 'Form Integration',
    description: 'Connect forms to your CRM or database',
    category: 'Integration',
    suggestedComplexity: 'simple',
    exampleDescription: 'When someone fills out our contact form, automatically create a lead in HubSpot and send a Slack notification to the sales team.',
    icon: '📝'
  },
  {
    id: '5',
    name: 'Document Generator',
    description: 'Auto-generate contracts, proposals, or reports',
    category: 'Automation',
    suggestedComplexity: 'simple',
    exampleDescription: 'Generate PDF proposals automatically from a template when a deal moves to "Proposal Sent" stage in our CRM.',
    icon: '📄'
  },
  {
    id: '6',
    name: 'AI Content Writer',
    description: 'AI-powered content generation system',
    category: 'AI',
    suggestedComplexity: 'complex',
    exampleDescription: 'Build an AI system that generates blog posts, social media content, and email copy based on our brand voice and topic guidelines.',
    icon: '✍️'
  },
  {
    id: '7',
    name: 'Workflow Automation',
    description: 'Automate multi-step business processes',
    category: 'Automation',
    suggestedComplexity: 'complex',
    exampleDescription: 'Automate our client onboarding: create accounts, send welcome emails, schedule kickoff calls, and set up project folders automatically.',
    icon: '⚡'
  },
  {
    id: '8',
    name: 'Slack Bot',
    description: 'Custom Slack commands and notifications',
    category: 'Integration',
    suggestedComplexity: 'simple',
    exampleDescription: 'Create a Slack bot that posts daily standup reminders and collects team responses into a summary channel.',
    icon: '💬'
  }
];

interface WorkspaceContextType {
  // Auth
  currentUser: User | null;
  isAdmin: boolean;
  isDataLoaded: boolean;
  login: (email: string, accessCode?: string) => Promise<boolean>;
  logout: () => void;
  
  // Workspaces (Admin)
  workspaces: Workspace[];
  createWorkspace: (data: Omit<Workspace, 'id' | 'createdAt' | 'updatedAt' | 'accessCode' | 'isActive'>, sendEmail?: boolean) => Promise<Workspace>;
  updateWorkspace: (id: string, data: Partial<Workspace>) => void;
  deleteWorkspace: (id: string) => void;
  getWorkspace: (id: string) => Workspace | undefined;
  
  // Requests
  requests: Request[];
  getWorkspaceRequests: (workspaceId: string) => Request[];
  createRequest: (data: { workspaceId: string; title: string; description: string; complexity: RequestComplexity; category?: string; tags?: string[] }) => Request;
  updateRequestStatus: (requestId: string, status: RequestStatus, update?: string) => void;
  addRequestUpdate: (requestId: string, update: Omit<RequestUpdate, 'id' | 'timestamp'>) => void;
  submitReviewFeedback: (requestId: string, feedback: string, approved: boolean) => void;
  
  // Deliverables & Preview (Admin)
  addDeliverable: (requestId: string, deliverable: Omit<Deliverable, 'id' | 'uploadedAt'>) => void;
  removeDeliverable: (requestId: string, deliverableId: string) => void;
  setPreviewUrl: (requestId: string, url: string) => void;
  updateRequestProgress: (requestId: string, progress: number, phase: string) => void;
  
  // Templates & FAQ
  templates: RequestTemplate[];
  faqs: FAQ[];
  
  // Notifications
  unreadCount: number;
  markAsRead: () => void;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

// Initial mock data
const initialWorkspaces: Workspace[] = [
  {
    id: 'ws-demo',
    name: 'Acme Corp Workspace',
    companyName: 'Acme Corporation',
    clientEmail: 'demo@acme.com',
    clientName: 'John Smith',
    accessCode: 'ACME01',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-15'),
    isActive: true
  }
];

const initialRequests: Request[] = [
  {
    id: 'req-1',
    workspaceId: 'ws-demo',
    title: 'Email Automation System',
    description: 'Need an automated email sequence for new customer onboarding. Should include welcome email, day 3 follow-up, and day 7 resources email.',
    complexity: 'simple',
    status: 'completed',
    estimatedDays: 2,
    createdAt: new Date('2024-01-11'),
    startedAt: new Date('2024-01-11'),
    estimatedCompletionAt: new Date('2024-01-13'),
    completedAt: new Date('2024-01-12'),
    progressPercent: 100,
    currentPhase: 'Delivered',
    updates: [
      { id: 'u1', timestamp: new Date('2024-01-11T09:00:00'), message: 'Request received and queued', type: 'info' },
      { id: 'u2', timestamp: new Date('2024-01-11T10:30:00'), message: 'Started building email templates', type: 'progress' },
      { id: 'u3', timestamp: new Date('2024-01-11T15:00:00'), message: 'Email sequence logic completed', type: 'milestone' },
      { id: 'u4', timestamp: new Date('2024-01-12T11:00:00'), message: 'Testing completed - ready for review', type: 'completed' }
    ],
    attachments: [],
    deliverables: [
      { id: 'd1', name: 'Email Templates', url: '#', type: 'document', uploadedAt: new Date('2024-01-12') }
    ],
    revisionCount: 0,
    tags: ['email', 'automation', 'onboarding']
  },
  {
    id: 'req-2',
    workspaceId: 'ws-demo',
    title: 'AI Customer Support Chatbot',
    description: 'Build an intelligent chatbot for our website that handles common customer questions, provides product recommendations, and can escalate to human support when needed.',
    complexity: 'complex',
    status: 'processing',
    estimatedDays: 7,
    createdAt: new Date('2024-01-14'),
    startedAt: new Date('2024-01-14'),
    estimatedCompletionAt: new Date('2024-01-21'),
    progressPercent: 45,
    currentPhase: 'Training AI Model',
    updates: [
      { id: 'u1', timestamp: new Date('2024-01-14T09:00:00'), message: 'Request received - Complex build identified', type: 'info' },
      { id: 'u2', timestamp: new Date('2024-01-14T14:00:00'), message: 'Architecture design completed', type: 'milestone' },
      { id: 'u3', timestamp: new Date('2024-01-15T10:00:00'), message: 'Building conversation flows', type: 'progress' },
      { id: 'u4', timestamp: new Date('2024-01-15T16:00:00'), message: 'Training AI on your product documentation', type: 'progress' }
    ],
    attachments: [],
    deliverables: [],
    revisionCount: 0,
    tags: ['ai', 'chatbot', 'support']
  },
  {
    id: 'req-3',
    workspaceId: 'ws-demo',
    title: 'Slack Integration for CRM Updates',
    description: 'Get Slack notifications whenever a deal stage changes in our CRM. Include deal name, value, and new stage.',
    complexity: 'simple',
    status: 'review',
    estimatedDays: 2,
    createdAt: new Date('2024-01-13'),
    startedAt: new Date('2024-01-13'),
    estimatedCompletionAt: new Date('2024-01-15'),
    progressPercent: 95,
    currentPhase: 'Review',
    updates: [
      { id: 'u1', timestamp: new Date('2024-01-13T09:00:00'), message: 'Started work on Slack integration', type: 'info' },
      { id: 'u2', timestamp: new Date('2024-01-13T14:00:00'), message: 'Connected to CRM API', type: 'milestone' },
      { id: 'u3', timestamp: new Date('2024-01-14T10:00:00'), message: 'Slack notifications working - ready for your review!', type: 'completed' }
    ],
    attachments: [],
    deliverables: [
      { id: 'd1', name: 'Integration Guide', url: 'https://docs.google.com/document/d/example', type: 'document', description: 'Step-by-step setup instructions', uploadedAt: new Date('2024-01-14') },
      { id: 'd2', name: 'Demo Video', url: 'https://www.loom.com/share/example', type: 'video', description: 'Walkthrough of the integration', uploadedAt: new Date('2024-01-14') }
    ],
    previewUrl: 'https://slack-crm-integration.vercel.app/demo',
    revisionCount: 0,
    tags: ['slack', 'crm', 'notifications']
  }
];

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [workspaces, setWorkspaces] = useState<Workspace[]>(initialWorkspaces);
  const [requests, setRequests] = useState<Request[]>(initialRequests);
  const [unreadCount, setUnreadCount] = useState(2);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const isAdmin = currentUser?.role === 'admin';

  // Persist to localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('zizi-user');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Failed to parse saved user:', e);
      }
    }
    const savedWorkspaces = localStorage.getItem('zizi-workspaces');
    if (savedWorkspaces) {
      try {
        setWorkspaces(JSON.parse(savedWorkspaces));
      } catch (e) {
        console.error('Failed to parse saved workspaces:', e);
      }
    }
    const savedRequests = localStorage.getItem('zizi-requests');
    if (savedRequests) {
      try {
        setRequests(JSON.parse(savedRequests));
      } catch (e) {
        console.error('Failed to parse saved requests:', e);
      }
    }
    // Mark data as loaded
    setIsDataLoaded(true);
  }, []);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('zizi-user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('zizi-user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('zizi-workspaces', JSON.stringify(workspaces));
  }, [workspaces]);

  useEffect(() => {
    localStorage.setItem('zizi-requests', JSON.stringify(requests));
  }, [requests]);

  const login = async (email: string, accessCode?: string): Promise<boolean> => {
    // Admin login
    if (email === 'admin@zizi.so' && !accessCode) {
      setCurrentUser({
        id: 'admin-1',
        email: 'admin@zizi.so',
        name: 'ZiziCo Admin',
        role: 'admin',
        createdAt: new Date()
      });
      return true;
    }

    // Client login with access code
    if (accessCode) {
      const workspace = workspaces.find(
        w => w.accessCode.toLowerCase() === accessCode.toLowerCase() && w.isActive
      );
      if (workspace) {
        setCurrentUser({
          id: `client-${workspace.id}`,
          email: workspace.clientEmail,
          name: workspace.clientName,
          role: 'client',
          workspaceId: workspace.id,
          createdAt: new Date()
        });
        return true;
      }
    }

    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('zizi-user');
  };

  const createWorkspace = async (
    data: Omit<Workspace, 'id' | 'createdAt' | 'updatedAt' | 'accessCode' | 'isActive'>,
    sendEmail: boolean = true
  ): Promise<Workspace> => {
    // Generate secure access code using company name
    const accessCode = generateSecureAccessCode(data.companyName);
    
    const newWorkspace: Workspace = {
      ...data,
      id: generateId(),
      accessCode,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true
    };
    
    setWorkspaces(prev => [...prev, newWorkspace]);

    // Send welcome email via API if requested
    if (sendEmail) {
      try {
        await fetch('/api/workspace/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            companyName: data.companyName,
            clientName: data.clientName,
            clientEmail: data.clientEmail,
            workspaceName: data.name,
            accessCode: accessCode,
          }),
        });
      } catch (error) {
        console.error('Failed to send welcome email:', error);
      }
    }
    
    return newWorkspace;
  };

  const updateWorkspace = (id: string, data: Partial<Workspace>) => {
    setWorkspaces(prev =>
      prev.map(w => (w.id === id ? { ...w, ...data, updatedAt: new Date() } : w))
    );
  };

  const deleteWorkspace = (id: string) => {
    setWorkspaces(prev => prev.filter(w => w.id !== id));
    setRequests(prev => prev.filter(r => r.workspaceId !== id));
  };

  const getWorkspace = (id: string) => workspaces.find(w => w.id === id);

  const getWorkspaceRequests = (workspaceId: string) =>
    requests.filter(r => r.workspaceId === workspaceId);

  const createRequest = (data: {
    workspaceId: string;
    title: string;
    description: string;
    complexity: RequestComplexity;
    category?: string;
    tags?: string[];
  }): Request => {
    const { min, max } = getEstimatedDays(data.complexity);
    const newRequest: Request = {
      id: generateId(),
      workspaceId: data.workspaceId,
      title: data.title,
      description: data.description,
      complexity: data.complexity,
      status: 'new',
      estimatedDays: max,
      createdAt: new Date(),
      progressPercent: 0,
      currentPhase: 'Submitted',
      updates: [
        {
          id: generateId(),
          timestamp: new Date(),
          message: `Request submitted! Estimated delivery: ${min}-${max} days`,
          type: 'info'
        }
      ],
      attachments: [],
      deliverables: [],
      revisionCount: 0,
      category: data.category,
      tags: data.tags || []
    };
    setRequests(prev => [...prev, newRequest]);
    setUnreadCount(prev => prev + 1);
    return newRequest;
  };

  const updateRequestStatus = (requestId: string, status: RequestStatus, updateMessage?: string) => {
    setRequests(prev =>
      prev.map(r => {
        if (r.id === requestId) {
          const updates = [...r.updates];
          if (updateMessage) {
            updates.push({
              id: generateId(),
              timestamp: new Date(),
              message: updateMessage,
              type: status === 'completed' ? 'completed' : status === 'review' ? 'milestone' : 'progress'
            });
          }

          const now = new Date();
          return {
            ...r,
            status,
            updates,
            startedAt: status === 'processing' && !r.startedAt ? now : r.startedAt,
            estimatedCompletionAt: status === 'processing' && !r.estimatedCompletionAt 
              ? calculateEstimatedCompletion(now, r.complexity) 
              : r.estimatedCompletionAt,
            completedAt: status === 'completed' ? now : r.completedAt,
            progressPercent: status === 'completed' ? 100 : status === 'review' ? 90 : r.progressPercent
          };
        }
        return r;
      })
    );
    setUnreadCount(prev => prev + 1);
  };

  const addRequestUpdate = (requestId: string, update: Omit<RequestUpdate, 'id' | 'timestamp'>) => {
    setRequests(prev =>
      prev.map(r => {
        if (r.id === requestId) {
          return {
            ...r,
            updates: [
              ...r.updates,
              { ...update, id: generateId(), timestamp: new Date() }
            ]
          };
        }
        return r;
      })
    );
    setUnreadCount(prev => prev + 1);
  };

  const submitReviewFeedback = (requestId: string, feedback: string, approved: boolean) => {
    setRequests(prev =>
      prev.map(r => {
        if (r.id === requestId) {
          const newStatus = approved ? 'final' : 'revision';
          const updates = [
            ...r.updates,
            {
              id: generateId(),
              timestamp: new Date(),
              message: approved 
                ? 'Review approved! Moving to final phase.' 
                : `Revision requested: ${feedback}`,
              type: approved ? 'milestone' as const : 'alert' as const
            }
          ];
          return {
            ...r,
            status: newStatus,
            reviewFeedback: feedback,
            revisionCount: approved ? r.revisionCount : r.revisionCount + 1,
            updates,
            progressPercent: approved ? 95 : 70
          };
        }
        return r;
      })
    );
  };

  const markAsRead = () => setUnreadCount(0);

  const addDeliverable = (requestId: string, deliverable: Omit<Deliverable, 'id' | 'uploadedAt'>) => {
    setRequests(prev =>
      prev.map(r => {
        if (r.id === requestId) {
          const newDeliverable: Deliverable = {
            ...deliverable,
            id: generateId(),
            uploadedAt: new Date()
          };
          return {
            ...r,
            deliverables: [...r.deliverables, newDeliverable]
          };
        }
        return r;
      })
    );
    setUnreadCount(prev => prev + 1);
  };

  const removeDeliverable = (requestId: string, deliverableId: string) => {
    setRequests(prev =>
      prev.map(r => {
        if (r.id === requestId) {
          return {
            ...r,
            deliverables: r.deliverables.filter(d => d.id !== deliverableId)
          };
        }
        return r;
      })
    );
  };

  const setPreviewUrl = (requestId: string, url: string) => {
    setRequests(prev =>
      prev.map(r => {
        if (r.id === requestId) {
          const updates = [
            ...r.updates,
            {
              id: generateId(),
              timestamp: new Date(),
              message: 'Preview link added - ready for your review!',
              type: 'milestone' as const
            }
          ];
          return {
            ...r,
            previewUrl: url,
            updates
          };
        }
        return r;
      })
    );
    setUnreadCount(prev => prev + 1);
  };

  const updateRequestProgress = (requestId: string, progress: number, phase: string) => {
    setRequests(prev =>
      prev.map(r => {
        if (r.id === requestId) {
          return {
            ...r,
            progressPercent: Math.min(100, Math.max(0, progress)),
            currentPhase: phase
          };
        }
        return r;
      })
    );
  };

  return (
    <WorkspaceContext.Provider
      value={{
        currentUser,
        isAdmin,
        isDataLoaded,
        login,
        logout,
        workspaces,
        createWorkspace,
        updateWorkspace,
        deleteWorkspace,
        getWorkspace,
        requests,
        getWorkspaceRequests,
        createRequest,
        updateRequestStatus,
        addRequestUpdate,
        submitReviewFeedback,
        addDeliverable,
        removeDeliverable,
        setPreviewUrl,
        updateRequestProgress,
        templates: mockTemplates,
        faqs: mockFAQs,
        unreadCount,
        markAsRead
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (context === undefined) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider');
  }
  return context;
}
