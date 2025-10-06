import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(request: NextRequest) {
  try {
    console.log('Testing Resend API...');
    console.log('RESEND_API_KEY exists:', !!process.env.RESEND_API_KEY);
    console.log('RESEND_API_KEY starts with re_:', process.env.RESEND_API_KEY?.startsWith('re_'));

    // Test sending a simple email
    const { data, error } = await resend.emails.send({
      from: 'Vrvo Test <noreply@vrvo.co>',
      to: ['hello@vrvo.co'],
      subject: 'Test Email from Vrvo API',
      text: 'This is a test email to verify Resend is working correctly.',
    });

    if (error) {
      console.error('Resend test error:', error);
      return NextResponse.json(
        { 
          error: 'Resend test failed', 
          details: error,
          apiKeyExists: !!process.env.RESEND_API_KEY,
          apiKeyPrefix: process.env.RESEND_API_KEY?.substring(0, 10) + '...'
        },
        { status: 500 }
      );
    }

    console.log('Resend test successful:', data);
    return NextResponse.json(
      { 
        message: 'Resend test successful', 
        data,
        apiKeyExists: !!process.env.RESEND_API_KEY
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Test email error:', error);
    return NextResponse.json(
      { 
        error: 'Test failed', 
        details: error instanceof Error ? error.message : 'Unknown error',
        apiKeyExists: !!process.env.RESEND_API_KEY
      },
      { status: 500 }
    );
  }
}
