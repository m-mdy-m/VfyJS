"use strict";
/**
 * Validates a password based on specified criteria.
 *
 * @typedef {Object} PasswordOptions
 * @property {Object} options - Options for customizing validation criteria.
 * @property {Object} options.minLength - Minimum length requirements for the password.
 * @property {number} options.minLength.value - The minimum length value. If not provided, it defaults to the value from the validation constants.
 * @property {string} options.minLength.errorMessage - Error message for minimum length validation failure.
 * @property {Object} options.maxLength - Maximum length requirements for the password.
 * @property {number} options.maxLength.value - The maximum length value. If not provided, it defaults to the value from the validation constants.
 * @property {string} options.maxLength.errorMessage - Error message for maximum length validation failure.
 * @property {Object} options.uppercase - Uppercase letter requirements for the password.
 * @property {boolean} options.uppercase.required - Whether uppercase letters are required.
 * @property {string} options.uppercase.errorMessage - Error message for uppercase letter validation failure.
 * @property {Object} options.lowercase - Lowercase letter requirements for the password.
 * @property {boolean} options.lowercase.required - Whether lowercase letters are required.
 * @property {string} options.lowercase.errorMessage - Error message for lowercase letter validation failure.
 * @property {Object} options.number - Numeric digit requirements for the password.
 * @property {boolean} options.number.required - Whether numeric digits are required.
 * @property {string} options.number.errorMessage - Error message for numeric digit validation failure.
 * @property {Object} options.specialCharacter - Special character requirements for the password.
 * @property {boolean} options.specialCharacter.required - Whether special characters are required.
 * @property {string} options.specialCharacter.errorMessage - Error message for special character validation failure.
 * @property {Object} options.alphabetic - Alphabetic character requirements for the password.
 * @property {boolean} options.alphabetic.required - Whether alphabetic characters are required.
 * @property {string} options.alphabetic.errorMessage - Error message for alphabetic character validation failure.
 * @property {Object} options.whitespace - Whitespace requirements for the password.
 * @property {boolean} options.whitespace.required - Whether whitespace is not allowed.
 * @property {string} options.whitespace.errorMessage - Error message for whitespace validation failure.
 */


const { MAX_LENGTH, MIN_LENGTH, trimmedValue } = require("../../common/validationConstants");
const inputValidator = require("../../utils/inputValidator");
const {handleValidationError} = require('../../errors/HandleError')
/**
 * Validates a password based on the provided options.
 *
 * @param {string} value - The password string to be validated.
 * @param {options} options - Options for customizing validation criteria.
 * @returns {boolean} - True if the password is valid, otherwise false.
 * @throws {Error} - Throws an error if validation fails.
 */
function validatePassword(value, options = {}) {
  // Input validation functions
  const has = inputValidator(value);
  // Destructuring options with default values and error messages
  const {
    minLength = { value : has.hasMinLength(MIN_LENGTH), errorMessage: 'Password must be at least 8 characters long.' },
    maxLength = { value : has.hasMaxLength(MAX_LENGTH), errorMessage: 'Password cannot exceed 20 characters.' },
    uppercase = { required: true, errorMessage: 'Password must contain at least one uppercase letter.' },
    lowercase = { required: true, errorMessage: 'Password must contain at least one lowercase letter.' },
    number = { required: true, errorMessage: 'Password must have at least one number.' },
    specialCharacter = { required: true, errorMessage: 'Password must contain at least one special character such as (@#$%^&*).' },
    alphabetic = { required: true, errorMessage: 'Input must contain at least one alphabetic character.' },
    whitespace = { required: false, errorMessage: 'Password cannot contain whitespace.' },
  } = options;
/**
 * Options for customizing password validation criteria.
 *
 * @typedef {Object} options
 * @property {Object} minLength - Minimum length requirements for the password.
 * @property {(number|string)} minLength.value - The minimum length value. If not provided, it defaults to the value from the validation constants.
 * @property {string} minLength.errorMessage - Error message for minimum length validation failure.
 * @property {Object} maxLength - Maximum length requirements for the password.
 * @property {(number|string)} maxLength.value - The maximum length value. If not provided, it defaults to the value from the validation constants.
 * @property {string} maxLength.errorMessage - Error message for maximum length validation failure.
 * @property {Object} uppercase - Uppercase letter requirements for the password.
 * @property {boolean} uppercase.required - Whether uppercase letters are required.
 * @property {string} uppercase.errorMessage - Error message for uppercase letter validation failure.
 * @property {Object} lowercase - Lowercase letter requirements for the password.
 * @property {boolean} lowercase.required - Whether lowercase letters are required.
 * @property {string} lowercase.errorMessage - Error message for lowercase letter validation failure.
 * @property {Object} number - Numeric digit requirements for the password.
 * @property {boolean} number.required - Whether numeric digits are required.
 * @property {string} number.errorMessage - Error message for numeric digit validation failure.
 * @property {Object} specialCharacter - Special character requirements for the password.
 * @property {boolean} specialCharacter.required - Whether special characters are required.
 * @property {string} specialCharacter.errorMessage - Error message for special character validation failure.
 * @property {Object} alphabetic - Alphabetic character requirements for the password.
 * @property {boolean} alphabetic.required - Whether alphabetic characters are required.
 * @property {string} alphabetic.errorMessage - Error message for alphabetic character validation failure.
 * @property {Object} whitespace - Whitespace requirements for the password.
 * @property {boolean} whitespace.required - Whether whitespace is not allowed.
 * @property {string} whitespace.errorMessage - Error message for whitespace validation failure.
 */

  // Additional validation checks
  handleValidationError(uppercase.required ? has.hasUppercase() : true, uppercase.errorMessage);
  handleValidationError(lowercase.required ? has.hasLowerCase() : true , lowercase.errorMessage)
  handleValidationError(number.required ? has.hasNumber() : true , number.errorMessage)
  handleValidationError(specialCharacter.required ? has.hasSpecialCharacter() : true , specialCharacter.errorMessage)
  handleValidationError(alphabetic.required ? has.hasAlphabetic() : true , alphabetic.errorMessage)
  // Check and trim whitespace if necessary
  const whitespaceCheck = whitespace.required ? has.hasWhitespace() : !has.hasWhitespace();
  if (!whitespaceCheck) {
    return value = trimmedValue(value);
  } 
  // Convert string values to numbers for minLength and maxLength

  if (typeof minLength.value === 'string' || typeof minLength.value === 'string') {
    minLength.value = +minLength.value;
    maxLength.value =+maxLength.value
  }
  // Check if minLength and maxLength are valid numbers
  if (
    typeof minLength.value !== 'undefined' &&
    typeof maxLength.value !== 'undefined' &&
    (typeof minLength.value !== 'boolean') &&
    (typeof maxLength.value !== 'boolean') &&
    (typeof minLength.value !== 'number' || typeof maxLength.value !== 'number')
  ) {
    throw new Error("min or max Length just for true or false");
  }
  
  // Check if the password length is within the specified range
  if (
    typeof minLength.value === 'number' &&
    typeof maxLength.value === 'number' &&
    (value.length < minLength.value || value.length > maxLength.value)
  ) {
    throw new Error(`Password length must be between ${minLength.value} and ${maxLength.value} characters.`);
  }
  // Final validation check
  const isValid =
    minLength &&
    maxLength &&
    (uppercase.required ? has.hasUppercase() : true) &&
    (lowercase.required ? has.hasLowerCase() : true) &&
    (number.required ? has.hasNumber() : true) &&
    (specialCharacter.required ? has.hasSpecialCharacter() : true) &&
    (alphabetic.required ? has.hasAlphabetic() : true) &&
    whitespaceCheck

  return isValid;
}
module.exports = validatePassword;
