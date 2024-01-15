/**
 * Input validator function.
 * @module inputValidator
 * @param {string} input - The input string to be validated.
 * @returns {Object} - An object with validation functions.
 * @property {function} hasUppercase - Checks if the input has at least one uppercase letter.
 * @property {function} hasLowerCase - Checks if the input has at least one lowercase letter.
 * @property {function} hasNumber - Checks if the input has at least one numeric digit.
 * @property {function} hasSpecialCharacter - Checks if the input has at least one special character.
 * @property {function} hasAlphabetic - Checks if the input contains at least one alphabetic character.
 * @property {function} hasNumeric - Checks if the input contains at least one numeric digit.
 * @property {function} hasAlphanumeric - Checks if the input contains only alphanumeric characters.
 * @property {function} hasWhitespace - Checks if the input contains any whitespace character.
 * @property {function} hasNonAlphanumeric - Checks if the input contains any non-alphanumeric character.
 * @property {function} hasMinLength - Checks if the input has a minimum length.
 * @property {function} hasMaxLength - Checks if the input has a maximum length.
 * @property {function} matchesCustomPattern - Checks if the input matches a custom regex pattern.
 */
const inputValidator = (input) => ({
  /**
   * Checks if the input has at least one uppercase letter.
   * @function
   * @returns {boolean} - True if the input has at least one uppercase letter, otherwise false.
   */
  hasUppercase: () => /(?=.*[A-Z])/.test(input),

  /**
   * Checks if the input has at least one lowercase letter.
   * @function
   * @returns {boolean} - True if the input has at least one lowercase letter, otherwise false.
   */
  hasLowerCase: () => /(?=.*[a-z])/.test(input),

  /**
   * Checks if the input has at least one numeric digit.
   * @function
   * @returns {boolean} - True if the input has at least one numeric digit, otherwise false.
   */
  hasNumber: () => /(?=.*\d)/.test(input),

  /**
   * Checks if the input has at least one special character.
   * @function
   * @returns {boolean} - True if the input has at least one special character, otherwise false.
   */
  hasSpecialCharacter: () => /(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(input),

  /**
   * Checks if the input contains at least one alphabetic character.
   * @function
   * @returns {boolean} - True if the input contains at least one alphabetic character, otherwise false.
   */
  hasAlphabetic: () => /[a-zA-Z]/.test(input),

  /**
   * Checks if the input contains at least one numeric digit.
   * @function
   * @returns {boolean} - True if the input contains at least one numeric digit, otherwise false.
   */
  hasNumeric: () => /\d/.test(input),

  /**
   * Checks if the input contains only alphanumeric characters.
   * @function
   * @returns {boolean} - True if the input contains only alphanumeric characters, otherwise false.
   */
  hasAlphanumeric: () => /^[a-zA-Z0-9]+$/.test(input),

  /**
   * Checks if the input contains any whitespace character.
   * @function
   * @returns {boolean} - True if the input contains any whitespace character, otherwise false.
   */
  hasWhitespace: () => /\s/.test(input),

  /**
   * Checks if the input contains any non-alphanumeric character.
   * @function
   * @returns {boolean} - True if the input contains any non-alphanumeric character, otherwise false.
   */
  hasNonAlphanumeric: () => /[^a-zA-Z0-9]/.test(input),

  /**
   * Checks if the input has a minimum length.
   * @function
   * @param {number} minLength - The minimum length to check against.
   * @returns {boolean} - True if the input length is greater than or equal to minLength, otherwise false.
   */
  hasMinLength: (minLength) => input.length >= minLength,

  /**
   * Checks if the input has a maximum length.
   * @function
   * @param {number} maxLength - The maximum length to check against.
   * @returns {boolean} - True if the input length is less than or equal to maxLength, otherwise false.
   */
  hasMaxLength: (maxLength) => input.length <= maxLength,

  /**
   * Checks if the input matches a custom regex pattern.
   * @function
   * @param {RegExp} pattern - The custom regex pattern to match against.
   * @returns {boolean} - True if the input matches the custom pattern, otherwise false.
   */
  matchesCustomPattern: (pattern) => pattern.test(input),
});

module.exports = inputValidator;
