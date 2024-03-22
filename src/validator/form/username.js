"use strict";
/**
 * Options for customizing username validation criteria.
 *
 * @typedef {Object} UsernameOptions
 * @property {Object} minLength - Minimum length requirements for the username.
 * @property {(number|string)} minLength.value - The minimum length value. If not provided, it defaults to the value from the validation constants.
 * @property {string} minLength.message - Error message for minimum length validation failure.
 * @property {Object} maxLength - Maximum length requirements for the username.
 * @property {(number|string)} maxLength.value - The maximum length value. If not provided, it defaults to the value from the validation constants.
 * @property {string} maxLength.message - Error message for maximum length validation failure.
 * @property {Object} uppercase - Uppercase letter requirements for the username.
 * @property {boolean} uppercase.required - Whether uppercase letters are required.
 * @property {string} uppercase.message - Error message for uppercase letter validation failure.
 * @property {Object} number - Numeric digit requirements for the username.
 * @property {boolean} number.required - Whether numeric digits are required.
 * @property {string} number.message - Error message for numeric digit validation failure.
 * @property {Object} nonAlphanumeric - Non-alphanumeric character requirements for the username.
 * @property {boolean} nonAlphanumeric.required - Whether non-alphanumeric characters are required.
 * @property {string} nonAlphanumeric.message - Error message for non-alphanumeric character validation failure.
 * @property {Object} trim - Whitespace requirements for the username.
 * @property {boolean} trim.required - Whether leading or trailing whitespaces are disallowed.
 * @property {string} trim.message - Error message for whitespace validation failure.
 * @property {Object} repeat - Consecutive character requirements for the username.
 * @property {boolean} repeat.required - Whether consecutive characters are disallowed.
 * @property {string} repeat.message - Error message for consecutive character validation failure.
 */

// Import necessary modules and constants
const inputValidator = require("../../utils/inputValidator");
const { optionUsername } = require("./helper/config");
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
    alphanumeric, maxLength, minLength, whitespace 
  } = optionUsername(options);
  const value = validateCommon(
    input,
    "Username",
    minLength?.value,
    maxLength?.value
  );
  const validator = inputValidator(value);
  if (whitespace?.required) {
    ThrowFalsy(validator.hasWhitespace(), whitespace.message);
  }
  if (alphanumeric?.required) {
    ThrowFalsy(validator.hasAlphanumeric(), alphanumeric.message);
  }
  return true;
}

module.exports = validateUsername;