// sanity/env.js
// This file serves as our single source of truth for environment variables
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-17'
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'ecommercce'
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '9drwfmlx'