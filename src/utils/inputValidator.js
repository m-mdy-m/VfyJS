/**
 * Input validator function.
 *
 * @param {string} input - The input string to be validated.
 * @returns {Object} - An object with validation functions.
 * @property {boolean} hasUppercase - Checks if the input has at least one uppercase letter.
 * @property {boolean} hasLowerCase - Checks if the input has at least one lowercase letter.
 * @property {boolean} hasNumber - Checks if the input has at least one numeric digit.
 * @property {boolean} hasSpecialCharacter - Checks if the input has at least one special character.
 * @property {boolean} hasAlphabetic - Checks if the input contains at least one alphabetic character.
 * @property {boolean} hasNumeric - Checks if the input contains at least one numeric digit.
 * @property {boolean} hasAlphanumeric - Checks if the input contains only alphanumeric characters.
 * @property {boolean} hasWhitespace - Checks if the input contains any whitespace character.
 * @property {boolean} hasNonAlphanumeric - Checks if the input contains any non-alphanumeric character.
 * @property {function} hasMinLength - Checks if the input has a minimum length.
 * @property {function} hasMaxLength - Checks if the input has a maximum length.
 * @property {function} matchesCustomPattern - Checks if the input matches a custom regex pattern.
 */
const inputValidator = (input) => ({
  hasUppercase: () => /(?=.*[A-Z])/.test(input),
  hasLowerCase: () => /(?=.*[a-z])/.test(input),
  hasNumber: () => /(?=.*\d)/.test(input),
  hasSpecialCharacter: () => /(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(input),
  hasAlphabetic: () => /[a-zA-Z]/.test(input),
  hasNumeric: () => /\d/.test(input),
  hasAlphanumeric: () => /^[a-zA-Z0-9]+$/.test(input),
  hasWhitespace: () => /\s/.test(input),
  hasNonAlphanumeric: () => /[^a-zA-Z0-9]/.test(input),
  hasMinLength: (minLength) => input.length >= minLength,
  hasMaxLength: (maxLength) => input.length <= maxLength,
  matchesCustomPattern: (pattern) => new RegExp(pattern).test(input),
});

module.exports = inputValidator;
