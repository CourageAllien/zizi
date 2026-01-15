import { NextResponse } from 'next/server';
import { sendWorkspaceWelcomeEmail } from '@/lib/resend';
import { generateSecureAccessCode } from '@/lib/workspace-types';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { companyName, clientName, clientEmail, workspaceName } = body;

    // Validate required fields
    if (!companyName || !clientName || !clientEmail) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate secure access code using company name
    const accessCode = generateSecureAccessCode(companyName);

    // Generate workspace ID
    const workspaceId = `ws-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;

    // Generate workspace URL
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const workspaceUrl = `${baseUrl}/portal`;

    // Create workspace data
    const workspace = {
      id: workspaceId,
      name: workspaceName || `${companyName} Workspace`,
      companyName,
      clientName,
      clientEmail,
      accessCode,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isActive: true,
    };

    // Send welcome email
    const emailResult = await sendWorkspaceWelcomeEmail({
      to: clientEmail,
      clientName,
      companyName,
      accessCode,
      workspaceUrl,
    });

    if (!emailResult.success) {
      console.error('Failed to send welcome email:', emailResult.error);
      // Still return success but note the email failure
      return NextResponse.json({
        success: true,
        workspace,
        emailSent: false,
        emailError: emailResult.error,
      });
    }

    return NextResponse.json({
      success: true,
      workspace,
      emailSent: true,
    });

  } catch (error) {
    console.error('Error creating workspace:', error);
    return NextResponse.json(
      { error: 'Failed to create workspace' },
      { status: 500 }
    );
  }
}
