# Stripe Payment Portal Setup

## Environment Variables Required

Add these to your `.env.local` file:

```bash
# Stripe Configuration (LIVE KEYS - READY FOR PRODUCTION)
STRIPE_SECRET_KEY=sk_live_your_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_publishable_key_here
NEXT_PUBLIC_BASE_URL=https://vrvo.co
```

## ✅ LIVE KEYS PROVIDED

Your Stripe live keys have been provided and are ready for production use.
**IMPORTANT**: Add these keys to your Vercel environment variables (see deployment section below).

## Stripe Account Setup

1. **Create Stripe Account**: Go to https://stripe.com and create an account
2. **Get API Keys**: 
   - Go to Developers → API Keys
   - Copy your Publishable key and Secret key
   - Use test keys for development, live keys for production

## Testing

### Test Card Numbers
- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002
- **Requires Authentication**: 4000 0025 0000 3155

### Test Flow
1. Go to `/payments`
2. Fill out the form
3. Use test card: 4242 4242 4242 4242
4. Complete payment
5. Verify success page loads

## Production Deployment

### Vercel Environment Variables
Add these in your Vercel dashboard:

**STRIPE_SECRET_KEY** = `[Your live secret key - provided separately]`

**NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY** = `[Your live publishable key - provided separately]`

**NEXT_PUBLIC_BASE_URL** = `https://vrvo.co`

### Security Notes
- Never commit `.env.local` to git
- Use environment variables in production
- Test thoroughly before going live
- Monitor Stripe dashboard for transactions

## Payment Portal Features

✅ **Secure Payment Processing**
- Stripe Checkout integration
- PCI compliant payment handling
- SSL encryption

✅ **Professional Design**
- Matches Vrvo brand colors
- Responsive mobile design
- Clean, modern interface

✅ **User Experience**
- Clear form validation
- Loading states
- Error handling
- Success confirmation

✅ **Business Features**
- Invoice number tracking
- Customer email collection
- Transaction metadata
- Email confirmations

## Client Usage

Send clients this link: `https://vrvo.co/payments`

They can:
- Enter their payment details
- Add invoice numbers for tracking
- Pay securely with any major credit card
- Receive email confirmations

## Support

For payment issues, contact: hello@vrvo.co