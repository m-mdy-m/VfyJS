"use strict";

const inputValidator = require("../../utils/inputValidator.js"); // Importing inputValidator module for input validation.
const { optionPassword } = require("./helper/config.js"); // Importing optionPassword function from config file.
const validateCommon = require("./validation.js"); // Importing common validation function.
const { ThrowFalsy } = require("../../errors/Error.js"); // Importing ThrowFalsy function from Error module.

/**
 * Validates a password input based on specified criteria for enhanced security.
 *
 * @param {string} input - The password input to be validated.
 * @param {Object} options - Options for password validation criteria.
 * @param {Object} options.lowercase - Criteria for lowercase letters.
 * @param {boolean} options.lowercase.required - Whether lowercase letters are required.
 * @param {string} options.lowercase.message - Error message for missing lowercase letters.
 * @param {Object} options.uppercase - Criteria for uppercase letters.
 * @param {boolean} options.uppercase.required - Whether uppercase letters are required.
 * @param {string} options.uppercase.message - Error message for missing uppercase letters.
 * @param {Object} options.number - Criteria for numbers.
 * @param {boolean} options.number.required - Whether numbers are required.
 * @param {string} options.number.message - Error message for missing numbers.
 * @param {Object} options.specialCharacter - Criteria for special characters.
 * @param {boolean} options.specialCharacter.required - Whether special characters are required.
 * @param {string} options.specialCharacter.message - Error message for missing special characters.
 * @param {Object} options.whitespace - Criteria for whitespace characters.
 * @param {boolean} options.whitespace.required - Whether whitespace characters are required.
 * @param {string} options.whitespace.message - Error message for missing whitespace characters.
 * @param {Object} options.minLength - Minimum length criteria.
 * @param {number} options.minLength.value - Minimum length value.
 * @param {string} options.minLength.message - Error message for minimum length requirement.
 * @param {Object} options.maxLength - Maximum length criteria.
 * @param {number} options.maxLength.value - Maximum length value.
 * @param {string} options.maxLength.message - Error message for maximum length requirement.
 * @returns {boolean} True if the password input meets all criteria for enhanced security, otherwise false.
 * @throws {Error} Throws an error if validation fails.
 * @example
 * const { validatePassword } = require("vfyjs");
 * const isValid = validatePassword("StrongPwd@123", { minLength: { value: 8, message: "Password must be at least 8 characters long." }, uppercase: { required: true, message: "Password must contain at least one uppercase letter." }, number: { required: true, message: "Password must contain at least one number." }, specialCharacter: { required: true, message: "Password must contain at least one special character." } });
 * console.log(isValid); // true
 */

/**
 * Validates a password based on the provided options.
 *
 * @param {string} input - The password string to be validated.
 * @param {options} options - Options for customizing validation criteria.
 * @returns {boolean} - True if the password is valid, otherwise false.
 * @throws {Error} - Throws an error if validation fails.
 * @example
 * const { validatePassword } = require("vfyjs");
 * const isValid = validatePassword("StrongPwd@123", { minLength: { value: 8, message: "Password must be at least 8 characters long." }, uppercase: { required: true, message: "Password must contain at least one uppercase letter." }, number: { required: true, message: "Password must contain at least one number." }, specialCharacter: { required: true, message: "Password must contain at least one special character." } });
 * console.log(isValid); // true
 */
function validatePassword(input, options = {}) {
  const {
    lowercase, maxLength, minLength, number, specialCharacter, uppercase, whitespace } = optionPassword(options);
  // Common validation for password
  const value = validateCommon(
    input,
    "Password",
    minLength?.value,
    maxLength?.value
  );
  // Password length requirements
  // Criteria for enhanced password security
  const validator = inputValidator(value);
  if (uppercase?.required) {
    ThrowFalsy(validator.hasUppercase(), uppercase.message);
  }
  if (lowercase?.required) {
    ThrowFalsy(validator.hasLowerCase(), lowercase.message);
  }
  if (number?.required) {
    ThrowFalsy(validator.hasNumber(), number.message);
  }
  if (specialCharacter?.required) {
    ThrowFalsy(validator.hasSpecialCharacter(), specialCharacter.message);
  }
  if (whitespace?.required) {
    ThrowFalsy(validator.hasWhitespace(), whitespace.message);
  }
  return true;
}
module.exports = validatePassword;