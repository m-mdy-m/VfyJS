/**
 * @typedef {Object} ValidationFunctions
 * @property {() => boolean} hasUppercase - Checks if the input has at least one uppercase letter.
 * @property {() => boolean} hasLowerCase - Checks if the input has at least one lowercase letter.
 * @property {() => boolean} hasNumber - Checks if the input has at least one numeric digit.
 * @property {() => boolean} hasSpecialCharacter - Checks if the input has at least one special character.
 * @property {() => boolean} hasAlphabetic - Checks if the input contains at least one alphabetic character.
 * @property {() => boolean} hasNumeric - Checks if the input contains at least one numeric digit.
 * @property {() => boolean} hasAlphanumeric - Checks if the input contains only alphanumeric characters.
 * @property {() => boolean} hasWhitespace - Checks if the input contains any whitespace character.
 * @property {() => boolean} hasNonAlphanumeric - Checks if the input contains any non-alphanumeric character.
 * @property {(minLength: number) => boolean} hasMinLength - Checks if the input has a minimum length.
 * @property {(maxLength: number) => boolean} hasMaxLength - Checks if the input has a maximum length.
 * @property {(pattern: RegExp) => boolean} matchesCustomPattern - Checks if the input matches a custom regex pattern.
 * @property {() => boolean} matchesEmailFormat - Checks if the input matches the standard email format.
 * @property {(repeatCount?: number) => boolean} hasRepeat - Checks if the input contains consecutive repeated characters.
 */


/**
 * Input validator function.
 *
 * @function
 * @param {string} input - The input string to be validated.
 * @returns {ValidationFunctions} - An object with validation functions.
 * @example
 * const validator = inputValidator("Sample123");
 * const isValid = validator.hasUppercase() && validator.hasNumber();
 * console.log(isValid); // true
 */
const inputValidator = (input) => ({
  /**
   * Checks if the input has at least one uppercase letter.
   * @returns {boolean} - True if the input has at least one uppercase letter, otherwise false.
   */
  hasUppercase: () => /(?=.*[A-Z])/.test(input),

  /**
   * Checks if the input has at least one lowercase letter.
   * @returns {boolean} - True if the input has at least one lowercase letter, otherwise false.
   */
  hasLowerCase: () => /(?=.*[a-z])/.test(input),

  /**
   * Checks if the input has at least one numeric digit.
   * @returns {boolean} - True if the input has at least one numeric digit, otherwise false.
   */
  hasNumber: () => /(?=.*\d)/.test(input),

  /**
   * Checks if the input has at least one special character.
   * @returns {boolean} - True if the input has at least one special character, otherwise false.
   */
  hasSpecialCharacter: () => /(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(input),

  /**
   * Checks if the input contains at least one alphabetic character.
   * @returns {boolean} - True if the input contains at least one alphabetic character, otherwise false.
   */
  hasAlphabetic: () => /[a-zA-Z]/.test(input),

  /**
   * Checks if the input contains at least one numeric digit.
   * @returns {boolean} - True if the input contains at least one numeric digit, otherwise false.
   */
  hasNumeric: () => /\d/.test(input),

  /**
   * Checks if the input contains only alphanumeric characters.
   * @returns {boolean} - True if the input contains only alphanumeric characters, otherwise false.
   */
  hasAlphanumeric: () => /^[a-zA-Z0-9]+$/.test(input),

  /**
   * Checks if the input contains any whitespace character.
   * @returns {boolean} - True if the input contains any whitespace character, otherwise false.
   */
  hasWhitespace: () => /\s/.test(input),

  /**
   * Checks if the input contains any non-alphanumeric character.
   * @returns {boolean} - True if the input contains any non-alphanumeric character, otherwise false.
   */
  hasNonAlphanumeric: () => /[^a-zA-Z0-9]/.test(input),

  /**
   * Checks if the input has a minimum length.
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

  /**
   * Checks if the input matches the standard email format.
   * @returns {boolean} - True if the input is a valid email, otherwise false.
   */
  matchesEmailFormat: () =>/^[\w.+-]+@[a-zA-Z\d.-]+.[a-zAZ]{2,}$/.test(input),
  
  /**
   * Checks if the input contains consecutive repeated characters.
   * @param {number} [repeatCount=3] - The number of consecutive repeated characters to check for. Defaults to 3 if not specified.
   * @returns {boolean} - True if the input contains at least the specified number of consecutive repeated characters, otherwise false.
   */
  hasRepeat: (repeatCount = 3) => new RegExp(`(.)\\1{${repeatCount - 1},}`).test(input)});

module.exports = inputValidator;
