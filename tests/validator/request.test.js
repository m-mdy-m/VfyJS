const RequestValidator = require("../../src/validator/requests/request");

// Mock request object
const req = {
  body: {
    username: "m__mdy__m",
    password: "password123",
    age: 25,
    email: "john@example.com",
  },
  params: {},
  query: {},
  headers: {},
  cookies: {},
  method: "GET",
  path: "/",
  protocol: "http",
  hostname: "example.com",
  originalUrl: "/api",
  xhr: false,
  secure: false,
  ip: "127.0.0.1",
  sessionID: "abc123",
  files: [],
  user: { id: 1, username: "m__mdy__m" },
  error: null,
};

describe("RequestValidator", () => {
  let validator;

  beforeEach(() => {
    validator = new RequestValidator(req.body);
  });

  it("should validate request data according to the provided rules", () => {
    const rules = {
      username: "username",
      password: "min:8|max:20",
      age: "number|min:18|max:100",
      email: "email",
    };
    const errors = validator.validate(rules);

    expect(errors).toEqual({});
  });

  it("should return validation errors for invalid data", () => {
    const invalidReq = {
      ...req,
      body: {
        username: "john@doe",
        password: "pass",
        age: "twenty-five",
        email: "invalid_email",
      },
    };
    const invalidValidator = new RequestValidator(invalidReq);
    const rules = {
      username: "alphanumeric|min:5|max:20",
      password: "min:8|max:20",
      age: "number|min:18|max:100",
      email: "email",
    };
    const errors = invalidValidator.validate(rules);

    expect(errors).toEqual({
      age: "age must be a valid number.",
      email: "email must be a valid email address.",
      password: "password must be at least 8 characters long.",
      username:
        "username must be a string containing alphanumeric characters only, with a length between 5 and 20 characters.",
    });
  });

  it("should throw an error for unsupported validation rules", () => {
    const rules = {
      username: "unsupported|alphanumeric|min:5|max:20",
    };

    expect(() => {
      validator.validate(rules);
    }).toThrowError("Validation rule 'unsupported' is not supported.");
  });
});

