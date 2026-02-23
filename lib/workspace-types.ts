// Workspace Management Types

export type UserRole = 'admin' | 'client';

export type RequestComplexity = 'simple' | 'complex';

export type RequestStatus = 
  | 'new'           // Just submitted
  | 'queued'        // In queue, waiting to start
  | 'processing'    // Being built
  | 'review'        // Ready for client review
  | 'revision'      // Client requested changes
  | 'final'         // Final phase, wrapping up
  | 'completed';    // Done

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  workspaceId?: string; // For clients, their assigned workspace
  avatar?: string;
  createdAt: Date;
}

export interface Workspace {
  id: string;
  name: string;
  companyName: string;
  clientEmail: string;
  clientName: string;
  accessCode: string; // Simple access code for client login
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  logo?: string;
  primaryColor?: string;
}

export interface RequestUpdate {
  id: string;
  timestamp: Date;
  message: string;
  type: 'info' | 'progress' | 'milestone' | 'alert' | 'completed';
}

export interface RequestAttachment {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'document' | 'link' | 'video';
  uploadedAt: Date;
}

export interface Deliverable {
  id: string;
  name: string;
  description?: string;
  type: 'document' | 'link' | 'preview' | 'video' | 'file';
  url: string;
  uploadedAt: Date;
}

export interface Request {
  id: string;
  workspaceId: string;
  title: string;
  description: string;
  complexity: RequestComplexity;
  status: RequestStatus;
  
  // Timeline
  estimatedDays: number; // 1-2 for simple, 5-7 for complex
  createdAt: Date;
  startedAt?: Date;
  estimatedCompletionAt?: Date;
  completedAt?: Date;
  
  // Progress
  progressPercent: number; // 0-100
  currentPhase: string;
  updates: RequestUpdate[];
  
  // Attachments & deliverables
  attachments: RequestAttachment[];
  deliverables: Deliverable[];
  
  // Preview URL for client to test/review the build
  previewUrl?: string;
  
  // Review
  reviewFeedback?: string;
  revisionCount: number;
  
  // Additional context
  category?: string;
  priority?: 'normal' | 'high' | 'urgent';
  tags: string[];
}

export interface RequestTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  suggestedComplexity: RequestComplexity;
  exampleDescription: string;
  icon: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

// Helper functions
export function getEstimatedDays(complexity: RequestComplexity): { min: number; max: number } {
  return complexity === 'simple' ? { min: 1, max: 2 } : { min: 5, max: 7 };
}

export function getStatusLabel(status: RequestStatus): string {
  const labels: Record<RequestStatus, string> = {
    new: 'New Request',
    queued: 'In Queue',
    processing: 'Building',
    review: 'Ready for Review',
    revision: 'In Revision',
    final: 'Final Phase',
    completed: 'Completed'
  };
  return labels[status];
}

export function getStatusColor(status: RequestStatus): string {
  const colors: Record<RequestStatus, string> = {
    new: '#8B5CF6',      // Purple
    queued: '#F59E0B',   // Amber
    processing: '#06B6D4', // Cyan
    review: '#10B981',   // Green
    revision: '#F97316', // Orange
    final: '#3B82F6',    // Blue
    completed: '#22C55E' // Green
  };
  return colors[status];
}

export function calculateEstimatedCompletion(
  startDate: Date,
  complexity: RequestComplexity
): Date {
  const { max } = getEstimatedDays(complexity);
  const estimatedDate = new Date(startDate);
  estimatedDate.setDate(estimatedDate.getDate() + max);
  return estimatedDate;
}

/**
 * Generate a secure but memorable access code
 * Format: XXXX-XXXX (8 characters, alphanumeric, easy to type)
 * Uses company name prefix if provided for memorability
 */
export function generateSecureAccessCode(companyName?: string): string {
  // Characters that are easy to read/type (no O/0, I/1/L confusion)
  const chars = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
  
  // Get a 3-letter prefix from company name if provided
  let prefix = '';
  if (companyName) {
    // Remove non-alphanumeric, take first 3 consonants or letters
    const cleaned = companyName.toUpperCase().replace(/[^A-Z]/g, '');
    const consonants = cleaned.replace(/[AEIOU]/g, '');
    prefix = (consonants.length >= 2 ? consonants : cleaned).slice(0, 2);
  }
  
  // Generate random part
  const randomLength = 6 - prefix.length;
  let random = '';
  const array = new Uint8Array(randomLength);
  if (typeof window !== 'undefined' && window.crypto) {
    window.crypto.getRandomValues(array);
  } else {
    // Fallback for server-side
    for (let i = 0; i < randomLength; i++) {
      array[i] = Math.floor(Math.random() * 256);
    }
  }
  
  for (let i = 0; i < randomLength; i++) {
    random += chars[array[i] % chars.length];
  }
  
  // Generate 4 more random chars for second part
  let suffix = '';
  const suffixArray = new Uint8Array(4);
  if (typeof window !== 'undefined' && window.crypto) {
    window.crypto.getRandomValues(suffixArray);
  } else {
    for (let i = 0; i < 4; i++) {
      suffixArray[i] = Math.floor(Math.random() * 256);
    }
  }
  
  for (let i = 0; i < 4; i++) {
    suffix += chars[suffixArray[i] % chars.length];
  }
  
  return `${prefix}${random}-${suffix}`;
}

