/**
 * Central access point for all environment variables.
 * All values from import.meta.env are strings at runtime,
 * so we parse & validate here and export typed constants.
 */

// =================================================================
// Helpers
// =================================================================

function required(name: string, value: string | undefined): string {
  if (!value) throw new Error(`Missing required env variable (${name}).`)
  return value
}

/*
// Keep for reference if needed later

function parseBool(value: string | undefined, defaultValue = false): boolean {
  if (value === undefined) return defaultValue
  return value === 'true' || value === '1'
}

function parseNumber(value: string | undefined, defaultValue?: number): number | undefined {
  if (value === undefined) return defaultValue
  const n = Number(value)
  return Number.isNaN(n) ? defaultValue : n
}
*/

// =================================================================
// Vite built-ins (always defined)
// =================================================================

// === Other ===
export const BASE_URL: string = import.meta.env.BASE_URL

// === Runtime mode ===
// True when running in development mode
export const IS_DEV: boolean = import.meta.env.DEV

// True when running in production mode
export const IS_PROD: boolean = import.meta.env.PROD

// Full mode name provided by Vite.
// Typically "development" or "production", but can be any custom mode
// passed via `--mode` (e.g. "staging", "qa", "customer-x").
export const MODE: string = import.meta.env.MODE

// =================================================================
// Required ENV variables
// =================================================================

/**
 * Base URL for the Laravel backend API.
 * Example: http://localhost:8000/api
 */
export const API_BASE_URL: string = required(
  'VITE_API_BASE_URL',
  import.meta.env.VITE_API_BASE_URL
)

/**
 * Human-readable application name.
 * Used in UI (footer, title, meta tags, etc.)
 */
export const APP_NAME: string = required(
  'VITE_APP_NAME',
  import.meta.env.VITE_APP_NAME
)

// =================================================================
// Optional
// =================================================================

// === Optional examples (for reference, currently not used) ===
/*
// Boolean example
// .env: VITE_FEATURE_X=true
export const FEATURE_X_ENABLED: boolean = parseBool(import.meta.env.VITE_FEATURE_X)

// Number example
// .env: VITE_POLL_INTERVAL=5000
export const POLL_INTERVAL_MS: number | undefined = parseNumber(
  import.meta.env.VITE_POLL_INTERVAL,
  3000 // default
)

// Optional string example
// .env: VITE_SENTRY_DSN=...
export const SENTRY_DSN: string | undefined = import.meta.env.VITE_SENTRY_DSN

// Enum example
// .env: VITE_THEME=light | dark
export type Theme = 'light' | 'dark'

export const THEME: Theme =
  import.meta.env.VITE_THEME === 'dark' ? 'dark' : 'light'

// URL example with validation
// .env: VITE_ASSET_CDN=https://cdn.example.com
export const ASSET_CDN_URL: URL | undefined =
  import.meta.env.VITE_ASSET_CDN ? new URL(import.meta.env.VITE_ASSET_CDN) : undefined
*/