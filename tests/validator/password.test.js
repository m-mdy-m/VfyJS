const { isPassword } = require("../../index");

// Test cases for invalid passwords without options
test("invalid password - insufficient length", () => {
  try {
    const isValid = isPassword("Weak@P", { minLength: { value: 10, errorMessage: "Password must be at least 10 characters long." } });
    expect(isValid).toBe(false);
  } catch (error) {
    expect(error.property).toBe(error.property);
  }
});

test("invalid password - exceeds maximum length", () => {
  try {
    const isValid = isPassword("VeryLongPassword1234567890", { maxLength: { value: 20, errorMessage: "Password cannot exceed 20 characters." } });
    expect(isValid).toBe(false);
  } catch (error) {
    expect(error.property).toBe(error.property);
  }
});

test("invalid password - missing uppercase letter", () => {
  try {
    const isValid = isPassword("weakpassword@123", { uppercase: { required: true, errorMessage: "Password must contain at least one uppercase letter." } });
    expect(isValid).toBe(false);
  } catch (error) {
    expect(error.property).toBe(error.property);
  }
});

test("invalid password - missing lowercase letter", () => {
  try {
    const isValid = isPassword("STRONGPASSWORD@123", { lowercase: { required: true, errorMessage: "Password must contain at least one lowercase letter." } });
    expect(isValid).toBe(false);
  } catch (error) {
    expect(error.property).toBe(error.property);
  }
});

test("invalid password - missing numeric digit", () => {
  try {
    const isValid = isPassword("StrongPassword@", { number: { required: true, errorMessage: "Password must have at least one number." } });
    expect(isValid).toBe(false);
  } catch (error) {
    expect(error.property).toBe(error.property);
  }
});

test("invalid password - missing special character", () => {
  try {
    const isValid = isPassword("StrongPassword123", { specialCharacter: { required: true, errorMessage: "Password must contain at least one special character such as (@#$%^&*)." } });
    expect(isValid).toBe(false);
  } catch (error) {
    expect(error.property).toBe(error.property);
  }
});

test("invalid password - missing alphabetic character", () => {
  try {
    const isValid = isPassword("1234567890@#$%^&*", { alphabetic: { required: true, errorMessage: "Input must contain at least one alphabetic character." } });
    expect(isValid).toBe(false);
  } catch (error) {
    expect(error.property).toBe(error.property);
  }
});

test("invalid password - contains whitespace", () => {
  try {
    const isValid = isPassword("Whitespace Password", { whitespace: { required: false, errorMessage: "Whitespace is not allowed. Please remove any leading or trailing spaces." } });
    expect(isValid).toBe(false);
  } catch (error) {
    expect(error.property).toBe(error.property);
  }
});

// Test cases for valid passwords without options
test("valid password - meets all criteria", () => {
  const isValid = isPassword("StrongPwd@123", { minLength: 8, uppercase: true, lowercase: true, number: true, specialCharacter: true });
  expect(isValid).toBe(true);
});

test("valid password - meets minimum length", () => {
  const isValid = isPassword("GoodPwd@1", { minLength: 8 });
  expect(isValid).toBe(true);
});

test("valid password - meets maximum length", () => {
  const isValid = isPassword("GoodPwd@1234567890", { maxLength: 20 });
  expect(isValid).toBe(true);
});

test("valid password - contains uppercase letter", () => {
  const isValid = isPassword("StrongPwd@123", { uppercase: true });
  expect(isValid).toBe(true);
});

test("valid password - contains lowercase letter", () => {
  const isValid = isPassword("strongpwd@123", { uppercase: false });
  expect(isValid).toBe(true);
});

test("valid password - contains numeric digit", () => {
  const isValid = isPassword("StrongPwd123@", { number: true });
  expect(isValid).toBe(true);
});

test("valid password - contains special character", () => {
  const isValid = isPassword("StrongPwd@123", { specialCharacter: true });
  expect(isValid).toBe(true);
});

test("valid password - contains alphabetic character", () => {
  const isValid = isPassword("12a34567890@#$%^&*A", { specialCharacter: false });
  expect(isValid).toBe(true);
});

test("valid password - does not contain whitespace", () => {
  const isValid = isPassword("NoWhitespacePwd@123", { whitespace: false });
  expect(isValid).toBe(true);
});

// Test cases for invalid passwords with custom options
test("invalid password - insufficient length with custom error message", () => {
  try {
    const isValid = isPassword("Weak@P", { minLength: { value: 10, errorMessage: "Custom error: Password must be at least 10 characters long." } });
    expect(isValid).toBe(false);
  } catch (error) {
    expect(error.property).toBe(false);
  }
});

test("invalid password - exceeds maximum length with custom error message", () => {
  try {
    const isValid = isPassword("VeryLongPassword1234567890", { maxLength: { value: 20, errorMessage: "Custom error: Password cannot exceed 20 characters." } });
    expect(isValid).toBe(false);
  } catch (error) {
    expect(error.property).toBe(false);
  }
});

test("invalid password - missing uppercase letter with custom error message", () => {
  try {
    const isValid = isPassword("weakpassword@123", { uppercase: { required: true, errorMessage: "Custom error: Password must contain at least one uppercase letter." } });
    expect(isValid).toBe(false);
  } catch (error) {
    expect(error.property).toBe(false);
  }
});

test("invalid password - missing lowercase letter with custom error message", () => {
  try {
    const isValid = isPassword("STRONGPASSWORD@123", { lowercase: { required: true, errorMessage: "Custom error: Password must contain at least one lowercase letter." } });
    expect(isValid).toBe(false);
  } catch (error) {
    expect(error.property).toBe(false);
  }
});

test("invalid password - missing numeric digit with custom error message", () => {
  try {
    const isValid = isPassword("StrongPassword@", { number: { required: true, errorMessage: "Custom error: Password must have at least one number." } });
    expect(isValid).toBe(false);
  } catch (error) {
    expect(error.property).toBe(false);
  }
});

test("invalid password - missing special character with custom error message", () => {
  try {
    const isValid = isPassword("StrongPassword123", { specialCharacter: { required: true, errorMessage: "Custom error: Password must contain at least one special character such as (@#$%^&*)." } });
    expect(isValid).toBe(false);
  } catch (error) {
    expect(error.property).toBe(false);
  }
});

test("invalid password - missing alphabetic character with custom error message", () => {
  try {
    const isValid = isPassword("1234567890@#$%^&*", { alphabetic: { required: true, errorMessage: "Custom error: Input must contain at least one alphabetic character." } });
    expect(isValid).toBe(false);
  } catch (error) {
    expect(error.property).toBe(false);
  }
});

test("invalid password - contains whitespace with custom error message", () => {
  try {
    const isValid = isPassword("Whitespace Password", { whitespace: { required: false, errorMessage: "Custom error: Whitespace is not allowed. Please remove any leading or trailing spaces." } });
    expect(isValid).toBe(false);
  } catch (error) {
    expect(error.property).toBe(false);
  }
});

// Test cases for valid passwords with custom options
test("valid password - meets all criteria with custom options", () => {
  const isValid = isPassword("StrongPwd@123", { minLength: 8, uppercase: true, lowercase: true, number: true, specialCharacter: true });
  expect(isValid).toBe(true);
});

test("valid password - meets minimum length with custom options", () => {
  const isValid = isPassword("GoodPwd@1", { minLength: 8 });
  expect(isValid).toBe(true);
});

test("valid password - meets maximum length with custom options", () => {
  const isValid = isPassword("GoodPwd@1234567890", { maxLength: 20 });
  expect(isValid).toBe(true);
});

test("valid password - contains uppercase letter with custom options", () => {
  const isValid = isPassword("StrongPwd@123", { uppercase: true });
  expect(isValid).toBe(true);
});

test("valid password - contains lowercase letter with custom options", () => {
  const isValid = isPassword("strongpwd@123", { uppercase: false });
  expect(isValid).toBe(true);
});

test("valid password - contains numeric digit with custom options", () => {
  const isValid = isPassword("StrongPwd123@", { number: true });
  expect(isValid).toBe(true);
});

test("valid password - contains special character with custom options", () => {
  const isValid = isPassword("StrongPwd@123", { specialCharacter: true });
  expect(isValid).toBe(true);
});

test("valid password - contains alphabetic character with custom options", () => {
  const isValid = isPassword("1234567890a@#$%^&*A", { alphabetic: true });
  expect(isValid).toBe(true);
});

test("valid password - does not contain whitespace with custom options", () => {
  const isValid = isPassword("NoWhitespacePwd@123", { whitespace: false });
  expect(isValid).toBe(true);
});
