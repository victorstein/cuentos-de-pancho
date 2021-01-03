import 'dotenv/config'

const {
  PORT,
  NODE_ENV,
  ALLOWED_ORIGINS,
  GOOGLE_API_KEY,
  CHANNEL_ID
} = process.env

export default {
  PORT: Number(PORT) || 3002,
  ENV: NODE_ENV || 'development',
  ALLOWED_ORIGINS: ALLOWED_ORIGINS ? ALLOWED_ORIGINS.split(',') : '*',
  CHANNEL_ID: CHANNEL_ID || null,
  GOOGLE_API_KEY: GOOGLE_API_KEY || null
}
