import { CORS_HEADERS, HTTP_STATUS_CODES } from './constants';

/**
 * GET|HEAD|POST|PUT|DELETE|PATCH /v1
 *
 * @see {@link https://developers.cloudflare.com/workers/examples/cors-header-proxy/}
 *
 * @param context - Context.
 * @returns - Response.
 */
export const onRequest: PagesFunction = async (context) => {
  const url = new URL(context.request.url).searchParams.get('url');

  if (!url) {
    return new Response('Invalid URL string.', {
      status: HTTP_STATUS_CODES.BAD_REQUEST,
    });
  }

  // Rewrite request to point to target URL.
  // This also makes the request mutable so you can add the correct
  // Origin header to make the API server think that this request is not cross-site.
  context.request = new Request(url, context.request);
  context.request.headers.set('Origin', new URL(url).origin);

  // Recreate the response so you can modify the headers
  let response = await fetch(context.request);
  response = new Response(response.body, response);

  // Set CORS headers
  Object.values(CORS_HEADERS).forEach((header) => {
    response.headers.set(header, '*');
  });

  // Append to/Add Vary header so browser will cache response correctly
  response.headers.append('Vary', 'Origin');

  return response;
};

/**
 * OPTIONS /v1
 *
 * Handle CORS preflight requests.
 *
 * @returns - Response.
 */
export const onRequestOptions: PagesFunction = () => {
  const headers = Object.values(CORS_HEADERS).reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue] = '*';
      return accumulator;
    },
    {},
  );
  return new Response(null, { headers });
};
