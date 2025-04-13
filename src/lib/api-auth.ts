/**
 * API Authentication Utilities
 *
 * Functions for validating API keys and authenticating API requests
 */

/**
 * Validates an API key against the list of valid keys in environment variables
 *
 * @param apiKey The API key to validate
 * @returns boolean indicating if the API key is valid
 */
export function isValidApiKey(apiKey: string): boolean {
  if (!apiKey) return false

  // Get valid API keys from environment variables
  const validApiKeys = process.env.VALID_API_KEYS?.split(",") || []

  // Check if the provided API key is in the list of valid keys
  return validApiKeys.includes(apiKey)
}

/**
 * Extracts API key from request headers or query parameters
 *
 * @param req The request object
 * @returns The API key or null if not found
 */
export function getApiKeyFromRequest(req: Request): string | null {
  const url = new URL(req.url)

  // Try to get API key from headers first
  const apiKeyHeader = req.headers.get("x-api-key")
  if (apiKeyHeader) return apiKeyHeader

  // If not in headers, try query parameters
  const apiKeyParam = url.searchParams.get("api_key")
  if (apiKeyParam) return apiKeyParam

  return null
}

/**
 * Checks if a request has a valid API key
 *
 * @param req The request object
 * @returns boolean indicating if the request has a valid API key
 */
export function hasValidApiKey(req: Request): boolean {
  const apiKey = getApiKeyFromRequest(req)
  return apiKey ? isValidApiKey(apiKey) : false
}
