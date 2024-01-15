const password = require("../../src/validator/form/password");
const validValue = "sdaaw"
const invalidValue = "Mahd223@#Asd$";

const validOptions =  {
  minLength: { value: 2, errorMessage: 'Password must be at least 10 characters long.' },
  maxLength: { value: 20, errorMessage: 'Password cannot exceed 30 characters.' },
  uppercase: { required: false, errorMessage: 'uppercase .' },
  lowercase: { required: true, errorMessage: 'lowercase r.' },
  number: { required: false, errorMessage: 'number .' },
  specialCharacter: { required: false, errorMessage: 'specialCharacter' },
  alphabetic: { required: true, errorMessage: 'alphabetic ' },
  whitespace: { required: false, errorMessage: 'whitespace ' },
};

// const invalidOptions = {
//   minLength: 8,
//   maxLength: 30,
//   lowerCase: true,
//   upperCase: true,
//   number: true,
//   specialCharacter: true,
// };

test('password is valid', () => {
  const is_valid = password(validValue,validOptions);
  expect(is_valid).toBe(true);
});

// test('invalid password', () => {
//   const is_invalid = password(invalidValue);
//   console.log('is_invalid', is_invalid);
//   expect(is_invalid).toBe(true);
// }, 10000); // Set a timeout of 10000 ms (10 seconds)
// test('is min length ? ', () => {
//   const is_valid = password(validValue, { minLength: 5 });
//   expect(is_valid).toBe(true);
// });

// test('is max Length ? ', () => {
//   const is_valid = password(validValue, { maxLength: 60 });
//   expect(is_valid).toBe(true);
// });

// test('is uppercase ? ', () => {
//   const is_valid = password(validValue, { upperCase: true });
//   expect(is_valid).toBe(true);
// });

// test('is lowerCase ? ', () => {
//   const is_valid = password(validValue, { lowerCase: true });
//   expect(is_valid).toBe(true);
// });

// test('is number ? ', () => {
//   const is_valid = password(validValue, { number: true });
//   expect(is_valid).toBe(true);
// });

// test('is specialCharacter ? ', () => {
//   const is_valid = password(validValue, { specialCharacter: true });
//   expect(is_valid).toBe(true);
// });