import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

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

    // Create transporter (using Gmail SMTP as example)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com',
        pass: process.env.EMAIL_PASS || 'your-app-password'
      }
    });

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER || 'noreply@vrvo.co',
      to: 'hello@vrvo.co',
      subject: 'New Newsletter Subscription - Vrvo Website',
      text: emailContent,
      replyTo: email
    });

    console.log('Newsletter subscription email sent to hello@vrvo.co');

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
