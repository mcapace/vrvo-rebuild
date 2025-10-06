import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, budget, message } = body;

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Create email content
    const emailContent = `
New Contact Form Submission

Name: ${name}
Email: ${email}
Company: ${company || 'Not provided'}
Budget: ${budget || 'Not provided'}

Message:
${message || 'No message provided'}

---
Submitted from Vrvo website contact form
    `.trim();

    // Create transporter (using Gmail SMTP as example)
    const transporter = nodemailer.createTransporter({
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
      subject: 'New Contact Form Submission - Vrvo Website',
      text: emailContent,
      replyTo: email
    });

    console.log('Contact form email sent to hello@vrvo.co');

    return NextResponse.json(
      { message: 'Form submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to submit form' },
      { status: 500 }
    );
  }
}
