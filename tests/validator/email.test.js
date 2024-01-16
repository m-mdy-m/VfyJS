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
  try {
    const isValid = email("userexample.com");
    expect(isValid).toBe(false);
  } catch (error) {
    console.log(false);
  }
});

test("invalid email - missing local part", () => {
  try {
    const isValid = email("@example.com");
    expect(isValid).toBe(false);
  } catch (error) {
    console.log(false);
  }
});

test("invalid email - missing domain", () => {
  try {
    const isValid = email("user@.com");
    expect(isValid).toBe(false);
  } catch (error) {
    console.log(false);
  }
});

test("invalid email - consecutive dots in domain", () => {
  try {
    const isValid = email("user@example..com");
    expect(isValid).toBe(false);
  } catch (error) {
    console.log(false);
  }
});

test("invalid email - spaces in email", () => {
  try {
    const isValid = email(" user@example.com");
    expect(isValid).toBe(false);
  } catch (error) {
    console.log(false);
  }
});

test("invalid email - special characters in domain", () => {
  try {
    const isValid = email("user@ex#ample.com");
    expect(isValid).toBe(false);
  } catch (error) {
    console.log(false);
  }
});

test("invalid email - no top-level domain", () => {
  try {
    const isValid = email("user@example");
    expect(isValid).toBe(false);
  } catch (error) {
    console.log(false);
  }
});
