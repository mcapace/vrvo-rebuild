import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Create email content
    const emailContent = `
New Newsletter Subscription

Email: ${email}

---
Subscribed from Vrvo website newsletter signup
    `.trim();

    // For now, we'll just log the subscription
    // In production, you would integrate with an email service like SendGrid, Resend, or Nodemailer
    console.log('Newsletter subscription:', {
      to: 'hello@vrvo.co',
      subject: 'New Newsletter Subscription',
      content: emailContent
    });

    // TODO: Integrate with email service to send to hello@vrvo.co
    // Example with Resend:
    // await resend.emails.send({
    //   from: 'noreply@vrvo.co',
    //   to: 'hello@vrvo.co',
    //   subject: 'New Newsletter Subscription',
    //   text: emailContent
    // });

    return NextResponse.json(
      { message: 'Successfully subscribed to newsletter' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe to newsletter' },
      { status: 500 }
    );
  }
}
