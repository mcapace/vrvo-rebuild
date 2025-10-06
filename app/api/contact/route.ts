import { NextRequest, NextResponse } from 'next/server';

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

    // For now, we'll just log the submission
    // In production, you would integrate with an email service like SendGrid, Resend, or Nodemailer
    console.log('Contact form submission:', {
      to: 'hello@vrvo.co',
      subject: 'New Contact Form Submission',
      content: emailContent
    });

    // TODO: Integrate with email service to send to hello@vrvo.co
    // Example with Resend:
    // await resend.emails.send({
    //   from: 'noreply@vrvo.co',
    //   to: 'hello@vrvo.co',
    //   subject: 'New Contact Form Submission',
    //   text: emailContent
    // });

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
