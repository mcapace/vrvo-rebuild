# Email Setup for Vrvo Website

## Environment Variables Required

Create a `.env.local` file in the root directory with the following variables:

```bash
# Gmail SMTP Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

## Gmail Setup Instructions

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Use this password as `EMAIL_PASS`

## Alternative Email Services

### SendGrid
```bash
SENDGRID_API_KEY=your-sendgrid-api-key
```

### Resend
```bash
RESEND_API_KEY=your-resend-api-key
```

### Mailgun
```bash
MAILGUN_API_KEY=your-mailgun-api-key
```

## Testing

Once configured, all form submissions will be sent to `hello@vrvo.co`:
- Contact form submissions
- Newsletter subscriptions

## Production Deployment

Make sure to add the environment variables to your deployment platform (Vercel, Netlify, etc.) in the environment variables section.
