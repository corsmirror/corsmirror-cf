import { RATE_LIMIT_MAX, RATE_LIMIT_WINDOW } from './constants';

/**
 * Check rate limit using KV storage.
 * Simple sliding window: count requests per IP in time buckets.
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
  const key = `ratelimit:${clientIP}:${windowStart}`;

  const current = await kv.get(key);
  const count = current ? parseInt(current, 10) : 0;

  if (count >= RATE_LIMIT_MAX) {
    return false;
  }

  // Increment count with TTL
  await kv.put(key, String(count + 1), {
    expirationTtl: RATE_LIMIT_WINDOW,
  });

  return true;
}
