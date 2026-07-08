import { Resend } from 'resend'

/** Lazy client — avoids Resend throwing at module load during `next build`. */
export function getResendClient(): Resend {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured')
  }
  return new Resend(apiKey)
}
