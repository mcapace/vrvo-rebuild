import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    console.log('Testing contact form email to hello@vrvo.co...');
    
    // Test email content
    const emailContent = `
TEST EMAIL - Contact Form

Name: Test User
Email: test@example.com
Company: Test Company
Budget: $10K - $25K

Message:
This is a test email to verify that contact form submissions are being sent to hello@vrvo.co

---
Test submitted from Vrvo website contact form
    `.trim();

    // Send test email to hello@vrvo.co
    const { data, error } = await resend.emails.send({
      from: 'Vrvo Website <noreply@vrvo.co>',
      to: ['hello@vrvo.co'],
      subject: 'TEST: Contact Form Working - Vrvo Website',
      text: emailContent,
      replyTo: 'test@example.com',
    });

    if (error) {
      console.error('Resend test error:', error);
      return NextResponse.json(
        { 
          error: 'Failed to send test email', 
          details: error,
          message: 'Check your Resend API key and domain configuration'
        },
        { status: 500 }
      );
    }

    console.log('Test email sent successfully to hello@vrvo.co:', data);
    return NextResponse.json(
      { 
        message: 'Test email sent successfully to hello@vrvo.co!',
        emailId: data?.id,
        status: 'Check your hello@vrvo.co inbox for the test email'
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Test contact email error:', error);
    return NextResponse.json(
      { 
        error: 'Test failed', 
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
