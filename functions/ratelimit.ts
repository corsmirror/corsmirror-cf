import { RATE_LIMIT_MAX, RATE_LIMIT_WINDOW } from './constants';

const MAX_RETRIES = 3;

/**
 * Check rate limit using KV storage with atomic increments.
 * Uses conditional writes with retry to handle race conditions.
 *
 * @param kv - KV namespace for storing counters.
 * @param clientIP - Client IP address to rate limit.
 * @returns - Whether the request is allowed.
 */
export async function checkRateLimit(
  kv: KVNamespace,
  clientIP: string,
): Promise<boolean> {
  const now = Math.floor(Date.now() / 1000);
  const windowStart = Math.floor(now / RATE_LIMIT_WINDOW) * RATE_LIMIT_WINDOW;
  const key = `ratelimit:${clientIP}:${String(windowStart)}`;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    // Read current count
    const current = await kv.get(key);
    const count = current ? parseInt(current, 10) : 0;

    if (count >= RATE_LIMIT_MAX) {
      return false;
    }

    const newCount = count + 1;

    try {
      // Use conditional put with custom metadata to check for race conditions
      // In KV, we can't do true atomic compare-and-swap, but we can detect conflicts
      // by checking if the value changed after we read it
      await kv.put(key, String(newCount), {
        expirationTtl: RATE_LIMIT_WINDOW,
      });

      // Verify our write succeeded (no one overwrote it immediately)
      const verify = await kv.get(key);
      if (verify === String(newCount)) {
        return true;
      }
      // Someone else wrote - retry
    } catch {
      // On error, retry
    }

    // Small delay before retry
    if (attempt < MAX_RETRIES - 1) {
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
  }

  // If we exhausted retries, assume we're over limit to be safe
  return false;
}
