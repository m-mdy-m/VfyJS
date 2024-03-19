const RequestValidator = require('../../src/validator/requests/request');

// Mock request object
const req = {
  body: {
    username: 'john_doe',
    password: 'password123',
    age: 25,
    email: 'john@example.com',
  },
  params: {},
  query: {},
  headers: {},
  cookies: {},
  method: 'GET',
  path: '/',
  protocol: 'http',
  hostname: 'example.com',
  originalUrl: '/api',
  xhr: false,
  secure: false,
  ip: '127.0.0.1',
  sessionID: 'abc123',
  files: [],
  user: { id: 1, username: 'john_doe' },
  error: null,
};

describe('RequestValidator', () => {
  it('should validate request data according to the provided rules', () => {
    const validator = new RequestValidator(req);
    const rules = {
      username: 'alphanumeric|min:5|max:20',
      password: 'min:8|max:20',
      age: 'number|min:18|max:100',
      email: 'email',
    };
    const errors = validator.validate(rules);

    expect(errors).toEqual({});
  });

  it('should return validation errors for invalid data', () => {
    const invalidReq = {
      ...req,
      body: {
        username: 'john@doe',
        password: 'pass',
        age: 'twenty-five',
        email: 'invalid_email',
      },
    };
    const invalidValidator = new RequestValidator(invalidReq);
    const rules = {
      username: 'alphanumeric|min:5|max:20',
      password: 'min:8|max:20',
      age: 'number|min:18|max:100',
      email: 'email',
    };
    const errors = invalidValidator.validate(rules);

    expect(errors).toEqual({
      username: 'The username must contain only alphanumeric characters and be between 5 and 20 characters long.',
      password: 'The password must be between 8 and 20 characters long.',
      age: 'The age must be a valid number between 18 and 100.',
      email: 'The email must be a valid email address.',
    });
  });

  it('should throw an error for unsupported validation rules', () => {
    const validator = new RequestValidator(req);
    const rules = {
      username: 'alphanumeric|min:5|max:20|unsupported',
    };

    expect(() => validator.validate(rules)).toThrow("Validation rule 'unsupported' is not supported.");
  });
});
