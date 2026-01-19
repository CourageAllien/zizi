import { NextRequest, NextResponse } from 'next/server';
import { requestFormSchema, RequestFormData } from '@/lib/schemas/request-schema';
import { 
  createRequest, 
  getRequestsByUser, 
  getAllRequests, 
  getRequestCountsByStatus,
  searchRequests 
} from '@/lib/request-storage';

// POST - Create a new request
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Extract user info and form data
    const { userId, userEmail, ...formData } = body;

    if (!userId || !userEmail) {
      return NextResponse.json(
        { success: false, error: 'User information required' },
        { status: 400 }
      );
    }

    // Validate form data
    const validationResult = requestFormSchema.safeParse(formData);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Validation failed',
          details: validationResult.error.flatten()
        },
        { status: 400 }
      );
    }

    // Create the request
    const request = await createRequest(
      validationResult.data,
      userId,
      userEmail
    );

    // TODO: Send email notifications here
    // await sendRequestConfirmation(userEmail, request);
    // await sendNewRequestAlert(request);

    return NextResponse.json({
      success: true,
      requestId: request.id,
      request,
    });
  } catch (error) {
    console.error('Error creating request:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create request' },
      { status: 500 }
    );
  }
}

// GET - Get requests for a user
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const countOnly = searchParams.get('countOnly') === 'true';
    const isAdmin = searchParams.get('admin') === 'true';

    // Get counts
    if (countOnly) {
      const counts = await getRequestCountsByStatus(isAdmin ? undefined : userId || undefined);
      return NextResponse.json({ success: true, counts });
    }

    // Search
    if (search) {
      const results = await searchRequests(search, isAdmin ? undefined : userId || undefined);
      return NextResponse.json({ success: true, requests: results });
    }

    // Get all requests for admin
    if (isAdmin) {
      const requests = await getAllRequests();
      return NextResponse.json({ success: true, requests });
    }

    // Get user requests
    if (userId) {
      const requests = await getRequestsByUser(userId);
      
      // Filter by status if provided
      const filtered = status 
        ? requests.filter(r => r.status === status)
        : requests;

      return NextResponse.json({ success: true, requests: filtered });
    }

    return NextResponse.json(
      { success: false, error: 'User ID required' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error fetching requests:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch requests' },
      { status: 500 }
    );
  }
}
