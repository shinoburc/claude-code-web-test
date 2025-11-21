import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set')
}

// Stripe API version: 2025-11-17.clover (latest stable as of 2025-11)
// This is the latest stable version pinned in stripe-node v20.0.0
// Using the latest version ensures access to new features and security updates
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-11-17.clover',
})
