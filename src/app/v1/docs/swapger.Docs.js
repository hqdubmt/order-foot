const swaggerDocs = {
  openapi: '3.0.3',
  info: {
    title: 'Order Foot API',
    version: '1.0.0',
    description: 'API documentation for Order Foot backend.'
  },
  servers: [
    {
      url: '/api/v1',
      description: 'API version 1'
    }
  ],
  tags: [
    { name: 'Health', description: 'Service health check' },
    { name: 'Auth', description: 'Authentication and registration' },
    { name: 'Users', description: 'User management' }
  ],
  paths: {
    '/': {
      get: {
        tags: ['Health'],
        summary: 'Check API health',
        responses: {
          200: {
            description: 'API is running',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', example: 'OK' },
                    code: { type: 'integer', example: 200000 },
                    description: { type: 'string' },
                    message: { type: 'string', example: 'Server is running' },
                    timestamp: { type: 'string', format: 'date-time' }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/auth/register/user': {
      post: {
        tags: ['Auth'],
        summary: 'Register a user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/RegisterUserRequest' }
            }
          }
        },
        responses: {
          200: {
            description: 'User registered',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/SuccessResponse' },
                example: {
                  message: 'OK',
                  status: 200,
                  code: 200000,
                  description: 'Request completed successfully',
                  timestamp: '2026-01-01T00:00:00.000Z',
                  metadata: {
                    message: 'User registered successfully',
                    data: {
                      name: 'Demo User',
                      email: 'demo@example.com'
                    }
                  },
                  options: {}
                }
              }
            }
          },
          400: {
            description: 'Invalid registration data',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          }
        }
      }
    },
    '/users': {
      get: {
        tags: ['Users'],
        summary: 'List users',
        description: 'Requires the user:view_all permission.',
        security: [{ BearerAuth: [] }],
        responses: {
          200: {
            description: 'Users returned',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/SuccessResponse' }
              }
            }
          },
          401: {
            description: 'Bearer token is missing or invalid',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          },
          403: {
            description: 'Role does not have user:view_all',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          }
        }
      },
      post: {
        tags: ['Users'],
        summary: 'Create a user',
        description: 'Requires the user:manage permission.',
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UserInput' }
            }
          }
        },
        responses: {
          201: {
            description: 'User created',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/SuccessResponse' }
              }
            }
          },
          401: {
            description: 'Bearer token is missing or invalid',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          },
          403: {
            description: 'Role does not have user:manage',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          }
        }
      }
    },
    '/users/{id}': {
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'User identifier',
          schema: { type: 'string' }
        }
      ],
      get: {
        tags: ['Users'],
        summary: 'Get a user by ID',
        description: 'Requires the user:view_all permission.',
        security: [{ BearerAuth: [] }],
        responses: {
          200: {
            description: 'User returned',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/SuccessResponse' }
              }
            }
          },
          401: {
            description: 'Bearer token is missing or invalid',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          },
          403: {
            description: 'Role does not have user:view_all',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          },
          404: {
            description: 'User not found',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          }
        }
      },
      put: {
        tags: ['Users'],
        summary: 'Update a user',
        description: 'Requires the user:manage permission.',
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UserInput' }
            }
          }
        },
        responses: {
          200: {
            description: 'User updated',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/SuccessResponse' }
              }
            }
          },
          401: {
            description: 'Bearer token is missing or invalid',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          },
          403: {
            description: 'Role does not have user:manage',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          },
          404: {
            description: 'User not found',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          }
        }
      },
      delete: {
        tags: ['Users'],
        summary: 'Delete a user',
        description: 'Requires the user:manage permission.',
        security: [{ BearerAuth: [] }],
        responses: {
          204: { description: 'User deleted' },
          401: {
            description: 'Bearer token is missing or invalid',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          },
          403: {
            description: 'Role does not have user:manage',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          },
          404: {
            description: 'User not found',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          }
        }
      }
    }
  },
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    },
    schemas: {
      RegisterUserRequest: {
        type: 'object',
        required: ['name', 'email', 'password'],
        properties: {
          name: { type: 'string', minLength: 1, example: 'Demo User' },
          email: { type: 'string', format: 'email', example: 'demo@example.com' },
          password: { type: 'string', minLength: 8, format: 'password' }
        }
      },
      UserInput: {
        type: 'object',
        properties: {
          name: { type: 'string', example: 'Demo User' },
          email: { type: 'string', format: 'email', example: 'demo@example.com' },
          password: { type: 'string', minLength: 8, format: 'password' }
        },
        additionalProperties: true
      },
      SuccessResponse: {
        type: 'object',
        properties: {
          message: { type: 'string' },
          status: { type: 'integer' },
          code: { type: 'integer' },
          description: { type: 'string', nullable: true },
          timestamp: { type: 'string', format: 'date-time' },
          metadata: { type: 'object', additionalProperties: true },
          options: { type: 'object', additionalProperties: true }
        }
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          status: { type: 'integer', example: 403 },
          code: { type: 'integer', example: 403000 },
          message: { type: 'string' },
          description: { type: 'string' },
          timestamp: { type: 'string', format: 'date-time' }
        }
      }
    }
  }
};

module.exports = swaggerDocs;