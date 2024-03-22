"use strict";
/**
 * Options for customizing username validation criteria.
 *
 * @typedef {Object} UsernameOptions
 * @property {Object} minLength - Minimum length requirements for the username.
 * @property {(number|string)} minLength.value - The minimum length value. If not provided, it defaults to the value from the validation constants.
 * @property {string} minLength.errorMessage - Error message for minimum length validation failure.
 * @property {Object} maxLength - Maximum length requirements for the username.
 * @property {(number|string)} maxLength.value - The maximum length value. If not provided, it defaults to the value from the validation constants.
 * @property {string} maxLength.errorMessage - Error message for maximum length validation failure.
 * @property {Object} uppercase - Uppercase letter requirements for the username.
 * @property {boolean} uppercase.required - Whether uppercase letters are required.
 * @property {string} uppercase.errorMessage - Error message for uppercase letter validation failure.
 * @property {Object} number - Numeric digit requirements for the username.
 * @property {boolean} number.required - Whether numeric digits are required.
 * @property {string} number.errorMessage - Error message for numeric digit validation failure.
 * @property {Object} nonAlphanumeric - Non-alphanumeric character requirements for the username.
 * @property {boolean} nonAlphanumeric.required - Whether non-alphanumeric characters are required.
 * @property {string} nonAlphanumeric.errorMessage - Error message for non-alphanumeric character validation failure.
 * @property {Object} trim - Whitespace requirements for the username.
 * @property {boolean} trim.required - Whether leading or trailing whitespaces are disallowed.
 * @property {string} trim.errorMessage - Error message for whitespace validation failure.
 * @property {Object} repeat - Consecutive character requirements for the username.
 * @property {boolean} repeat.required - Whether consecutive characters are disallowed.
 * @property {string} repeat.errorMessage - Error message for consecutive character validation failure.
 */

// Import necessary modules and constants
const inputValidator = require("../../utils/inputValidator");
const { option } = require("./helper/config");
const validateCommon = require("./validation");
const { ThrowFalsy } = require("../../errors/Error");

/**
 * Validates a username based on the provided options.
 *
 * @param {string} input - The username string to be validated.
 * @param {UsernameOptions} options - Options for customizing validation criteria.
 * @returns {boolean} - True if the username is valid, otherwise false.
 * @throws {Error} - Throws an error if validation fails.
 * @example
 * const { validateUsername } = require("vfyjs");
 * const isValid = validateUsername("StringUsername123");
 * console.log(isValid); // true
 */
function validateUsername(input, options = {}) {
  const {
    minLength,
    maxLength,
    uppercase,
    number,
    lowercase,
    specialCharacter,
    whitespace,
    repeat,
  } = option(options);
  const value = validateCommon(
    input,
    "username",
    minLength?.value,
    maxLength?.value
  );
  const validator = inputValidator(value);
  if (uppercase?.required) {
    ThrowFalsy(validator.hasUppercase(), uppercase.message);
  }
  if (lowercase?.required) {
    ThrowFalsy(validator.hasLowerCase(), lowercase.message);
  }
  if (whitespace?.required) {
    ThrowFalsy(validator.hasWhitespace(), whitespace.message);
  }
  if (repeat?.required) {
    ThrowFalsy(validator.hasRepeat(), repeat.message);
  }
  if (number?.required) {
    ThrowFalsy(validator.hasNumber(), number.message);
  }
  if (specialCharacter?.required) {
    ThrowFalsy(validator.hasSpecialCharacter(), specialCharacter.message);
  }
  // Check if the username is valid
  return true;
}

module.exports = validateUsername;
try {
  const isValid = validateUsername("m__mdy__m");
  console.log("isValid :", isValid);
} catch (error) {
  console.log("error =>", error);
}
