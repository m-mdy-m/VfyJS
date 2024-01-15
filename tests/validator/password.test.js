const password = require("../../src/validator/form/password");
const validValue = "ValidPassword123!";
const invalidValue = "Invalidحwd";

const validOptions = {
  minLength: 8,
  maxLength: 20,
  lowerCase: true,
  upperCase: true,
  number: true,
  specialCharacter: true,
};

const invalidOptions = {
  minLength: 8,
  maxLength: 20,
  lowerCase: true,
  upperCase: true,
  number: true,
  specialCharacter: true,
};

test('password is valid', () => {
  const is_valid = password(validValue, validOptions);
  expect(is_valid).toBe(true);
});

test('invalid password', () => {
  const is_invalid = password(invalidValue, invalidOptions);
  expect(is_invalid).toBe(false); 
});
test('is min length ? ', () => {
  const is_valid = password(validValue, { minLength: 5 });
  expect(is_valid).toBe(true);
});

test('is max Length ? ', () => {
  const is_valid = password(validValue, { maxLength: 60 });
  expect(is_valid).toBe(true);
});

test('is uppercase ? ', () => {
  const is_valid = password(validValue, { upperCase: true });
  expect(is_valid).toBe(true);
});

test('is lowerCase ? ', () => {
  const is_valid = password(validValue, { lowerCase: true });
  expect(is_valid).toBe(true);
});

test('is number ? ', () => {
  const is_valid = password(validValue, { number: true });
  expect(is_valid).toBe(true);
});

test('is specialCharacter ? ', () => {
  const is_valid = password(validValue, { specialCharacter: true });
  expect(is_valid).toBe(true);
});