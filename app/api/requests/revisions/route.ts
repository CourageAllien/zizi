import { NextRequest, NextResponse } from 'next/server';
import { createRevision, getRevisionsByRequest } from '@/lib/request-storage';

// POST - Create a revision request
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { requestId, description, files = [] } = body;

    if (!requestId) {
      return NextResponse.json(
        { success: false, error: 'Request ID is required' },
        { status: 400 }
      );
    }

    if (!description || description.trim().length < 20) {
      return NextResponse.json(
        { success: false, error: 'Please provide more detail (at least 20 characters)' },
        { status: 400 }
      );
    }

    const revision = await createRevision(requestId, description, files);

    if (!revision) {
      return NextResponse.json(
        { success: false, error: 'Request not found' },
        { status: 404 }
      );
    }

    // TODO: Send notification to team about revision request

    return NextResponse.json({ success: true, revision });
  } catch (error) {
    console.error('Error creating revision:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create revision' },
      { status: 500 }
    );
  }
}

// GET - Get revisions for a request
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const requestId = searchParams.get('requestId');

    if (!requestId) {
      return NextResponse.json(
        { success: false, error: 'Request ID is required' },
        { status: 400 }
      );
    }

    const revisions = await getRevisionsByRequest(requestId);

    return NextResponse.json({ success: true, revisions });
  } catch (error) {
    console.error('Error fetching revisions:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch revisions' },
      { status: 500 }
    );
  }
}
