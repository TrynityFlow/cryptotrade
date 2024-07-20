export const Unauthorized = {
  status: 401,
  description: 'Unauthorized',
  schema: {
    properties: {
      statusCode: {
        type: 'number',
        example: 401,
      },
      message: {
        type: 'string',
        example: 'Unauthorized',
      },
    },
  },
};

export const BadRequestException = {
  status: 400,
  description: 'Bad Request',
  schema: {
    properties: {
      statusCode: {
        type: 'number',
        example: 400,
      },
      error: {
        type: 'string',
        example: 'Bad Request',
      },
      message: {
        type: 'array',
        items: {
          type: 'string',
        },
      },
    },
  },
};

export const InternalServerError = {
  status: 500,
  description: 'Internal Server Error',
  schema: {
    properties: {
      statusCode: {
        type: 'number',
        example: 500,
      },
      message: {
        type: 'string',
        example: 'Internal Server Error',
      },
    },
  },
};
