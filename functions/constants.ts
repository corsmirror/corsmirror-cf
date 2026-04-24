export enum CORS_HEADERS {
  ACCESS_CONTROL_ALLOW_HEADERS = 'Access-Control-Allow-Headers',
  ACCESS_CONTROL_ALLOW_METHODS = 'Access-Control-Allow-Methods',
  ACCESS_CONTROL_ALLOW_ORIGIN = 'Access-Control-Allow-Origin',
}

// Rate limiting: 100 requests per 60 seconds
export const RATE_LIMIT_MAX = 100;
export const RATE_LIMIT_WINDOW = 60;
