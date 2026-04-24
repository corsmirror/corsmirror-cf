#!/usr/bin/env bash

# Test rate limiting on CORS proxy
# Usage: ./scripts/test-rate-limit.sh [URL] [REQUEST_COUNT]
# Example: ./scripts/test-rate-limit.sh "https://your-domain.pages.dev/v1?url=https://httpbin.org/get" 105

set -e

URL="${1:-https://corsmirror.pages.dev/v1?url=https://httpbin.org/get}"
REQUEST_COUNT="${2:-105}"
DELAY="${3:-0.1}"

echo "Testing rate limiting at: $URL"
echo "Making $REQUEST_COUNT requests with ${DELAY}s delay..."
echo ""

SUCCESS_COUNT=0
RATE_LIMIT_COUNT=0

for i in $(seq 1 $REQUEST_COUNT); do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$URL" || echo "000")

  if [ "$STATUS" = "200" ]; then
    SUCCESS_COUNT=$((SUCCESS_COUNT + 1))
    echo "[$i/$REQUEST_COUNT] 200 OK"
  elif [ "$STATUS" = "429" ]; then
    RATE_LIMIT_COUNT=$((RATE_LIMIT_COUNT + 1))
    echo "[$i/$REQUEST_COUNT] 429 Too Many Requests (rate limited)"
  else
    echo "[$i/$REQUEST_COUNT] $STATUS (unexpected)"
  fi

  sleep "$DELAY"
done

echo ""
echo "=== Results ==="
echo "Successful (200): $SUCCESS_COUNT"
echo "Rate limited (429): $RATE_LIMIT_COUNT"
echo ""

if [ "$RATE_LIMIT_COUNT" -gt 0 ]; then
  echo "✓ Rate limiting is working!"
  exit 0
else
  echo "✗ No rate limiting detected - check configuration"
  exit 1
fi
