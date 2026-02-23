import { NextRequest, NextResponse } from 'next/server';
import { 
  getRequestById, 
  updateRequest, 
  updateRequestStatus,
  deleteRequest,
  approveRequest
} from '@/lib/request-storage';
import { ClientRequestStatus } from '@/lib/schemas/request-schema';

// GET - Get a single request
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const request = await getRequestById(id);

    if (!request) {
      return NextResponse.json(
        { success: false, error: 'Request not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, request });
  } catch (error) {
    console.error('Error fetching request:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch request' },
      { status: 500 }
    );
  }
}

// PATCH - Update a request
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { action, ...updates } = body;

    // Handle specific actions
    if (action === 'update-status') {
      const { status, ...additionalData } = updates;
      const request = await updateRequestStatus(id, status as ClientRequestStatus, additionalData);
      
      if (!request) {
        return NextResponse.json(
          { success: false, error: 'Request not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({ success: true, request });
    }

    if (action === 'approve') {
      const { liveUrl } = updates;
      const request = await approveRequest(id, liveUrl);
      
      if (!request) {
        return NextResponse.json(
          { success: false, error: 'Request not found' },
          { status: 404 }
        );
      }

      // TODO: Send approval notification
      return NextResponse.json({ success: true, request });
    }

    // General update
    const request = await updateRequest(id, updates);
    
    if (!request) {
      return NextResponse.json(
        { success: false, error: 'Request not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, request });
  } catch (error) {
    console.error('Error updating request:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update request' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a request (admin only)
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const success = await deleteRequest(id);

    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Request not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting request:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete request' },
      { status: 500 }
    );
  }
}

