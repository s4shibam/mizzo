/**
 * Interface for rate limit strategies
 */
export interface RateLimitStrategy {
  /**
   * Check if a request is allowed based on rate limiting rules
   * @param key The identifier for the request (usually IP or user ID)
   * @returns Promise resolving to whether the request is allowed
   */
  isAllowed(key: string): Promise<boolean>
}
