// Request Storage - In-memory for development, replace with database for production
import { v4 as uuidv4 } from 'uuid';
import { 
  ClientRequest, 
  ClientRequestStatus, 
  RequestFormData, 
  RequestRevision,
  RequestComment,
  getEstimatedDelivery 
} from './schemas/request-schema';

// In-memory storage
const requests: Map<string, ClientRequest> = new Map();
const revisions: Map<string, RequestRevision> = new Map();
const comments: Map<string, RequestComment> = new Map();

// Generate unique request ID
export function generateRequestId(): string {
  const prefix = 'REQ';
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}${random}`;
}

// Create a new request
export async function createRequest(
  formData: RequestFormData,
  userId: string,
  userEmail: string
): Promise<ClientRequest> {
  const id = generateRequestId();
  const now = new Date().toISOString();

  const request: ClientRequest = {
    ...formData,
    id,
    userId,
    userEmail,
    status: 'queued',
    createdAt: now,
    updatedAt: now,
    estimatedDelivery: getEstimatedDelivery(formData.urgency),
    revisions: [],
    comments: [],
  };

  requests.set(id, request);
  return request;
}

// Get a request by ID
export async function getRequestById(id: string): Promise<ClientRequest | null> {
  return requests.get(id) || null;
}

// Get all requests for a user
export async function getRequestsByUser(userId: string): Promise<ClientRequest[]> {
  const userRequests: ClientRequest[] = [];
  for (const request of requests.values()) {
    if (request.userId === userId) {
      userRequests.push(request);
    }
  }
  return userRequests.sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

// Get all requests (admin)
export async function getAllRequests(): Promise<ClientRequest[]> {
  return Array.from(requests.values()).sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

// Get requests by status
export async function getRequestsByStatus(
  status: ClientRequestStatus,
  userId?: string
): Promise<ClientRequest[]> {
  const filtered: ClientRequest[] = [];
  for (const request of requests.values()) {
    if (request.status === status) {
      if (!userId || request.userId === userId) {
        filtered.push(request);
      }
    }
  }
  return filtered.sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

// Update request status
export async function updateRequestStatus(
  id: string,
  status: ClientRequestStatus,
  additionalData?: Partial<ClientRequest>
): Promise<ClientRequest | null> {
  const request = requests.get(id);
  if (!request) return null;

  const now = new Date().toISOString();
  const updated: ClientRequest = {
    ...request,
    ...additionalData,
    status,
    updatedAt: now,
  };

  // Set timestamps based on status
  if (status === 'in-progress' && !updated.startedAt) {
    updated.startedAt = now;
  }
  if (status === 'completed' && !updated.completedAt) {
    updated.completedAt = now;
  }

  requests.set(id, updated);
  return updated;
}

// Update request
export async function updateRequest(
  id: string,
  updates: Partial<ClientRequest>
): Promise<ClientRequest | null> {
  const request = requests.get(id);
  if (!request) return null;

  const updated: ClientRequest = {
    ...request,
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  requests.set(id, updated);
  return updated;
}

// Create a revision request
export async function createRevision(
  requestId: string,
  description: string,
  files: Array<{ id: string; name: string; url?: string }> = []
): Promise<RequestRevision | null> {
  const request = requests.get(requestId);
  if (!request) return null;

  const revision: RequestRevision = {
    id: uuidv4(),
    requestId,
    description,
    files,
    createdAt: new Date().toISOString(),
    status: 'pending',
  };

  revisions.set(revision.id, revision);
  
  // Update request with revision and change status
  request.revisions.push(revision);
  request.status = 'revisions-requested';
  request.updatedAt = new Date().toISOString();
  requests.set(requestId, request);

  return revision;
}

// Get revisions for a request
export async function getRevisionsByRequest(requestId: string): Promise<RequestRevision[]> {
  const requestRevisions: RequestRevision[] = [];
  for (const revision of revisions.values()) {
    if (revision.requestId === requestId) {
      requestRevisions.push(revision);
    }
  }
  return requestRevisions.sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

// Add a comment to a request
export async function addComment(
  requestId: string,
  userId: string,
  userEmail: string,
  userName: string,
  message: string,
  isInternal: boolean = false
): Promise<RequestComment | null> {
  const request = requests.get(requestId);
  if (!request) return null;

  const comment: RequestComment = {
    id: uuidv4(),
    requestId,
    userId,
    userEmail,
    userName,
    message,
    createdAt: new Date().toISOString(),
    isInternal,
  };

  comments.set(comment.id, comment);
  request.comments.push(comment);
  request.updatedAt = new Date().toISOString();
  requests.set(requestId, request);

  return comment;
}

// Get comments for a request
export async function getCommentsByRequest(
  requestId: string,
  includeInternal: boolean = false
): Promise<RequestComment[]> {
  const requestComments: RequestComment[] = [];
  for (const comment of comments.values()) {
    if (comment.requestId === requestId) {
      if (includeInternal || !comment.isInternal) {
        requestComments.push(comment);
      }
    }
  }
  return requestComments.sort((a, b) => 
    new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );
}

// Get request counts by status for a user
export async function getRequestCountsByStatus(userId?: string): Promise<Record<ClientRequestStatus, number>> {
  const counts: Record<ClientRequestStatus, number> = {
    'queued': 0,
    'in-progress': 0,
    'ready-for-review': 0,
    'revisions-requested': 0,
    'completed': 0,
  };

  for (const request of requests.values()) {
    if (!userId || request.userId === userId) {
      counts[request.status]++;
    }
  }

  return counts;
}

// Search requests
export async function searchRequests(
  query: string,
  userId?: string
): Promise<ClientRequest[]> {
  const lowerQuery = query.toLowerCase();
  const results: ClientRequest[] = [];

  for (const request of requests.values()) {
    if (userId && request.userId !== userId) continue;

    const searchText = [
      request.id,
      request.description,
      request.requestType,
      request.targetAudience,
      ...request.goals,
    ].join(' ').toLowerCase();

    if (searchText.includes(lowerQuery)) {
      results.push(request);
    }
  }

  return results.sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

// Approve and launch a request
export async function approveRequest(
  id: string,
  liveUrl: string
): Promise<ClientRequest | null> {
  return updateRequestStatus(id, 'completed', {
    liveUrl,
    completedAt: new Date().toISOString(),
  });
}

// Delete a request (admin only)
export async function deleteRequest(id: string): Promise<boolean> {
  const request = requests.get(id);
  if (!request) return false;

  // Delete associated revisions and comments
  for (const revision of request.revisions) {
    revisions.delete(revision.id);
  }
  for (const comment of request.comments) {
    comments.delete(comment.id);
  }

  requests.delete(id);
  return true;
}

// Initialize with sample data for development
export function initializeSampleData() {
  // Only initialize if empty
  if (requests.size > 0) return;

  const sampleRequests: Partial<ClientRequest>[] = [
    {
      id: 'REQ-DEMO001',
      userId: 'demo-user',
      userEmail: 'demo@example.com',
      requestType: 'preview-tool',
      description: 'I need a ROI calculator that helps prospects see the value of switching to our platform. Should show time saved, cost reduction, and efficiency gains.',
      targetAudience: 'Marketing directors at B2B SaaS companies with 50-200 employees who are frustrated with manual reporting.',
      goals: ['generate-leads', 'qualify-leads', 'shorten-sales-cycle'],
      brandingOption: 'match-website',
      websiteUrl: 'https://example.com',
      hostingOption: 'host-for-me',
      integrations: ['hubspot', 'slack'],
      urgency: 'standard',
      status: 'in-progress',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      startedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      previewUrl: 'https://preview.zizi.so/demo-001',
      files: [],
      revisions: [],
      comments: [],
    },
    {
      id: 'REQ-DEMO002',
      userId: 'demo-user',
      userEmail: 'demo@example.com',
      requestType: 'assessment',
      description: 'Need a sales readiness assessment that scores prospects on their current sales process maturity.',
      targetAudience: 'Sales leaders at mid-market companies looking to improve their sales operations.',
      goals: ['qualify-leads', 'educate-prospects'],
      brandingOption: 'use-existing',
      hostingOption: 'embed',
      integrations: ['salesforce'],
      urgency: 'priority',
      status: 'ready-for-review',
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
      startedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      estimatedDelivery: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      previewUrl: 'https://preview.zizi.so/demo-002',
      files: [],
      revisions: [],
      comments: [],
    },
    {
      id: 'REQ-DEMO003',
      userId: 'demo-user',
      userEmail: 'demo@example.com',
      requestType: 'lead-magnet',
      description: 'Interactive checklist for companies evaluating their marketing tech stack.',
      targetAudience: 'CMOs and Marketing Ops managers at growing startups.',
      goals: ['generate-leads'],
      brandingOption: 'start-fresh',
      hostingOption: 'host-for-me',
      integrations: ['email', 'google-sheets'],
      urgency: 'no-rush',
      status: 'queued',
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      files: [],
      revisions: [],
      comments: [],
    },
  ];

  for (const data of sampleRequests) {
    requests.set(data.id!, data as ClientRequest);
  }
}

// Call to initialize sample data
initializeSampleData();

