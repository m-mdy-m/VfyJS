const { email } = require("../../index");

// Valid Email Examples
test("valid email - standard format", () => {
  const isValid = email("user@example.com");
  expect(isValid).toBe(true);
});

test("valid email - with subdomain", () => {
  const isValid = email("john.doe@sub.example.com");
  expect(isValid).toBe(true);
});

test("valid email - with hyphen in domain", () => {
  const isValid = email("user@my-domain.com");
  expect(isValid).toBe(true);
});

test("valid email - with underscore in local part", () => {
  const isValid = email("john_doe@example.com");
  expect(isValid).toBe(true);
});

test("valid email - with plus sign in local part", () => {
  const isValid = email("user+extra@example.com");
  expect(isValid).toBe(true);
});

// Invalid Email Examples
test("invalid email - missing @ symbol", () => {
  const isValid = email("userexample.com");
  expect(isValid).toBe(false);
});

test("invalid email - missing local part", () => {
  const isValid = email("@example.com");
  expect(isValid).toBe(false);
});

test("invalid email - missing domain", () => {
  const isValid = email("user@.com");
  expect(isValid).toBe(false);
});

test("invalid email - consecutive dots in domain", () => {
  const isValid = email("user@example..com");
  expect(isValid).toBe(false);
});

test("invalid email - spaces in email", () => {
  const isValid = email(" user@example.com");
  expect(isValid).toBe(false);
});

test("invalid email - special characters in domain", () => {
  const isValid = email("user@ex#ample.com");
  expect(isValid).toBe(false);
});

test("invalid email - no top-level domain", () => {
  const isValid = email("user@example");
  expect(isValid).toBe(false);
});
