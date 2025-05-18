import type { RateLimitStrategy } from './strategy'

/**
 * RateLimiter main class that uses strategy pattern
 */
export class RateLimiter {
  private strategy: RateLimitStrategy

  constructor(strategy: RateLimitStrategy) {
    this.strategy = strategy
  }

  /**
   * Change the rate limiting strategy
   */
  setStrategy(strategy: RateLimitStrategy): void {
    this.strategy = strategy
  }

  /**
   * Check if request is allowed based on the current strategy
   */
  async isAllowed(key: string): Promise<boolean> {
    // If rate limiting is disabled, return true to bypass rate limiting
    if (process.env.ENABLE_RATE_LIMIT !== 'true') {
      return true
    }

    return this.strategy.isAllowed(key)
  }
}
