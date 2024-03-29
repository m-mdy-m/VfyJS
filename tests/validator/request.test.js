const RequestValidator = require("../../src/validator/requests/request");

// Mock request object
const req = {
  body: {
    username: "m__mdy__m",
    password: "password123",
    age: 25,
    email: "john@example.com",
  },
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
      username: "john@doe", // Invalid username
      password: "pass", // Invalid password
      age: "twenty-five", // Invalid age
      email: "invalid_email", // Invalid email
    };
    const invalidValidator = new RequestValidator(invalidReq);
    const rules = {
      username: "alphanumeric|min:5|max:20",
      password: "min:8|max:20",
      age: "number|min:14|max:100",
      email: "email",
    };
    const errors = invalidValidator.validate(rules);

    expect(errors).toEqual({
      username: "username must contain only alphanumeric characters.",
      password: "password must be at least 8 characters long.",
      age: "age must be at least 14 characters long.",
      email: "Email must contain @",
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
