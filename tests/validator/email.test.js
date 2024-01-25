const { isEmail } = require("../../index");

// Valid Email Examples
test("Valid email - standard format", () => {
  const isValid = isEmail('mahdimamashli1383@gmail.com');
  expect(isValid).toBe(true);
});

test("Valid email - with subdomain", () => {
  const isValid = isEmail('j.doe@example.com', { minLengthLocal: 1 });
  expect(isValid).toBe(true);
});

test("Valid email - with hyphen in domain", () => {
  const isValid = isEmail('j.doe@example.com', { maxLengthLocal: 10 });
  expect(isValid).toBe(true);
});

test("Valid email - with underscore in local part", () => {
  const isValid = isEmail('john.doe@sub.example.com', { minLengthDomainPart: 5 });
  expect(isValid).toBe(true);
});

test("Valid email - with plus sign in local part", () => {
  const isValid = isEmail('john.doe@sub.example.com', { maxLengthDomainPart: 15 });
  expect(isValid).toBe(true);
});

// Invalid Email Examples
test("Invalid email - missing @ symbol", () => {
  try {
    const isValid = isEmail('j.d@example.com', { minLengthLocal: 3 });
    expect(isValid).toBe(false);
  } catch (error) {
    expect(error.property).toBe(error.property);
  }
});

test("Invalid email - missing local part", () => {
  try {
    const isValid = isEmail('john.doe@example.com', { maxLengthLocal: 3 });
    expect(isValid).toBe(false);
  } catch (error) {
    expect(error.property).toBe(error.property);
  }
});

test("Invalid email - missing domain", () => {
  try {
    const isValid = isEmail('j.doe@ex.com', { minLengthDomainPart: 10 });
    expect(isValid).toBe(false);
  } catch (error) {
    expect(error.property).toBe(error.property);
  }
});

test("Invalid email - consecutive dots in domain", () => {
  try {
    const isValid = isEmail('john.doe@sub.example.com', { maxLengthDomainPart: 10 });
    expect(isValid).toBe(false);
  } catch (error) {
    expect(error.property).toBe(error.property);
  }
});

test("Invalid email - spaces in email", () => {
  try {
    const isValid = isEmail('john.doe@ sub.example.com', { minLengthSubdomain: 5 });
    expect(isValid).toBe(false);
  } catch (error) {
    expect(error.property).toBe(error.property);
  }
});

test("Invalid email - special characters in domain", () => {
  try {
    const isValid = isEmail('john.doe@sub.example.com', { maxLengthSubdomain: 5 });
    expect(isValid).toBe(false);
  } catch (error) {
    expect(error.property).toBe(error.property);
  }
});

test("Invalid email - no top-level domain", () => {
  try {
    const isValid = isEmail('john.doeexample.com');
    expect(isValid).toBe(false);
  } catch (error) {
    expect(error.property).toBe(error.property);
  }
});

test("Valid email with custom minLengthSubdomain option", () => {
  const isValid = isEmail('john.doe@sub.example.com', { minLengthSubdomain: 2 });
  expect(isValid).toBe(true);
});

test("Valid email with custom maxLengthSubdomain option", () => {
  const isValid = email('john.doe@sub.example.com', { maxLengthSubdomain: 10 });
  expect(isValid).toBe(true);
});

test("Valid email with custom options (minLengthLocal, maxLengthDomainPart)", () => {
  const isValid = isEmail('j.doe@example.com', { minLengthLocal: 1, maxLengthDomainPart: 15 });
  expect(isValid).toBe(true);
});

test("Invalid email - special characters in domain", () => {
  try {
    const isValid = isEmail('j.d@example.c!om', { minLengthLocal: 3, maxLengthDomainPart: 10 });
    expect(isValid).toBe(false);
  } catch (error) {
    expect(error.property).toBe(error.property);
  }
});

test("Invalid email - consecutive dots in domain", () => {
  try {
    const isValid = isEmail('john.doe@sub..example.com');
    expect(isValid).toBe(false);
  } catch (error) {
    expect(error.property).toBe(error.property);
  }
});

test("Valid email with custom maxLengthSubdomain option", () => {
  const isValid = isEmail('john.doe@sub.example.com', { maxLengthSubdomain: 20 });
  expect(isValid).toBe(true);
});
