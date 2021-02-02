import 'dotenv/config'

const {
  PORT,
  NODE_ENV,
  ALLOWED_ORIGINS,
  GOOGLE_API_KEY,
  CHANNEL_ID,
  SENTRY_DSN,
  SENTRY_SERVER_NAME
} = process.env

export default {
  PORT: PORT ?? 3002,
  ENV: NODE_ENV ?? 'development',
  ALLOWED_ORIGINS: (ALLOWED_ORIGINS !== undefined) ? ALLOWED_ORIGINS.split(',') : '*',
  CHANNEL_ID: CHANNEL_ID ?? null,
  GOOGLE_API_KEY: GOOGLE_API_KEY ?? null,
  SENTRY_DSN: SENTRY_DSN ?? 'invalid',
  SENTRY_SERVER_NAME: SENTRY_SERVER_NAME ?? ''
}
