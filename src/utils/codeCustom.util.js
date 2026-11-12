
/**
 * =========================================================
 * GENERIC CUSTOM CODE UTIL
 * =========================================================
 * Dùng chung cho nhiều dự án, API, service và backend.
 *
 * Mỗi phần tử có format:
 * {
 *   code: number,
 *   status: number,
 *   message: string,
 *   description: string
 * }
 */

const createCode = ({ code, status, message, description }) => Object.freeze({
  code,
  status,
  message,
  description,
});

const codeCustom = Object.freeze({
  // =======================================================
  // SUCCESS - 2xx
  // =======================================================
  SUCCESS: createCode({
    code: 200000,
    status: 200,
    message: 'Success',
    description: 'Request completed successfully',
  }),

  CREATED: createCode({
    code: 201000,
    status: 201,
    message: 'Created',
    description: 'Resource created successfully',
  }),

  ACCEPTED: createCode({
    code: 202000,
    status: 202,
    message: 'Accepted',
    description: 'Request accepted for processing',
  }),

  NO_CONTENT: createCode({
    code: 204000,
    status: 204,
    message: 'No Content',
    description: 'Request completed without response body',
  }),

  // =======================================================
  // CLIENT ERROR - 4xx
  // =======================================================
  BAD_REQUEST: createCode({
    code: 400000,
    status: 400,
    message: 'Bad Request',
    description: 'Invalid request payload or parameters',
  }),

  VALIDATION_ERROR: createCode({
    code: 400001,
    status: 400,
    message: 'Validation Error',
    description: 'Request validation failed',
  }),

  UNAUTHORIZED: createCode({
    code: 401000,
    status: 401,
    message: 'Unauthorized',
    description: 'Authentication is required',
  }),

  INVALID_TOKEN: createCode({
    code: 401001,
    status: 401,
    message: 'Invalid Token',
    description: 'Authentication token is invalid',
  }),

  TOKEN_EXPIRED: createCode({
    code: 401002,
    status: 401,
    message: 'Token Expired',
    description: 'Authentication token has expired',
  }),

  FORBIDDEN: createCode({
    code: 403000,
    status: 403,
    message: 'Forbidden',
    description: 'You do not have permission to access this resource',
  }),

  NOT_FOUND: createCode({
    code: 404000,
    status: 404,
    message: 'Not Found',
    description: 'Requested resource was not found',
  }),

  METHOD_NOT_ALLOWED: createCode({
    code: 405000,
    status: 405,
    message: 'Method Not Allowed',
    description: 'HTTP method is not allowed for this route',
  }),

  CONFLICT: createCode({
    code: 409000,
    status: 409,
    message: 'Conflict',
    description: 'Resource conflict or duplicate state',
  }),

  DUPLICATE_RESOURCE: createCode({
    code: 409001,
    status: 409,
    message: 'Duplicate Resource',
    description: 'Resource already exists',
  }),

  TOO_MANY_REQUESTS: createCode({
    code: 429000,
    status: 429,
    message: 'Too Many Requests',
    description: 'Rate limit exceeded',
  }),

  // =======================================================
  // SERVER ERROR - 5xx
  // =======================================================
  INTERNAL_SERVER_ERROR: createCode({
    code: 500000,
    status: 500,
    message: 'Internal Server Error',
    description: 'Unexpected server error',
  }),

  DATABASE_ERROR: createCode({
    code: 500001,
    status: 500,
    message: 'Database Error',
    description: 'Database operation failed',
  }),

  SERVICE_ERROR: createCode({
    code: 500002,
    status: 500,
    message: 'Service Error',
    description: 'Internal service operation failed',
  }),

  CONFIGURATION_ERROR: createCode({
    code: 500003,
    status: 500,
    message: 'Configuration Error',
    description: 'Application configuration is invalid',
  }),

  NOT_IMPLEMENTED: createCode({
    code: 501000,
    status: 501,
    message: 'Not Implemented',
    description: 'Requested functionality is not implemented yet',
  }),

  BAD_GATEWAY: createCode({
    code: 502000,
    status: 502,
    message: 'Bad Gateway',
    description: 'Invalid response from upstream server',
  }),

  SERVICE_UNAVAILABLE: createCode({
    code: 503000,
    status: 503,
    message: 'Service Unavailable',
    description: 'Service is temporarily unavailable',
  }),

  GATEWAY_TIMEOUT: createCode({
    code: 504000,
    status: 504,
    message: 'Gateway Timeout',
    description: 'Upstream server response timeout',
  }),

  // =======================================================
  // HELPERS
  // =======================================================
  getByStatus(status) {
    const value = Object.values(this).find((item) => item && item.status === Number(status));
    return value || null;
  },

  getByCode(code) {
    const value = Object.values(this).find((item) => item && item.code === Number(code));
    return value || null;
  },

  isSuccess(status) {
    const numericStatus = Number(status);
    return numericStatus >= 200 && numericStatus < 300;
  },

  isClientError(status) {
    const numericStatus = Number(status);
    return numericStatus >= 400 && numericStatus < 500;
  },

  isServerError(status) {
    const numericStatus = Number(status);
    return numericStatus >= 500 && numericStatus < 600;
  },
});

module.exports = codeCustom;
