export const AuthRequestBody = {
  schema: {
    type: 'object',
    properties: {
      username: {
        type: 'string',
      },
      password: {
        type: 'string',
      },
    },
    required: ['username', 'password'],
  },
};

export const SuccessResponse = {
  status: 201,
  description: 'Successfully authenticated',
  schema: {
    type: 'object',
    properties: {
      id: {
        type: 'number',
      },
      username: {
        type: 'string',
      },
    },
  },
};
