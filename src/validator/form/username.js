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
 * @property {Object} alphanumeric - Alphanumeric character requirements for the username.
 * @property {boolean} alphanumeric.required - Whether alphanumeric characters are required.
 * @property {string} alphanumeric.message - Error message for alphanumeric character validation failure.
 * @property {Object} whitespace - Whitespace requirements for the username.
 * @property {boolean} whitespace.required - Whether whitespace characters are disallowed.
 * @property {string} whitespace.message - Error message for whitespace validation failure.
 */

// Import necessary modules and constants
const inputValidator = require("../../utils/inputValidator"); // Importing the inputValidator module for input validation.
const { optionUsername } = require("./helper/config"); // Importing optionUsername function from config file.
const validateCommon = require("./validation"); // Importing common validation function.
const { ThrowFalsy } = require("../../errors/Error"); // Importing ThrowFalsy function from Error module.

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
  } = optionUsername(options); // Destructuring options object and getting values for validation.
  const value = validateCommon(
    input,
    "Username",
    minLength?.value,
    maxLength?.value
  ); // Validating common criteria like length.
  const validator = inputValidator(value); // Creating input validator object.
  if (whitespace?.required) {
    ThrowFalsy(validator.hasWhitespace(), whitespace.message); // If whitespace is required, check for its presence.
  }
  if (alphanumeric?.required) {
    ThrowFalsy(validator.hasAlphanumeric(), alphanumeric.message); // If alphanumeric characters are required, check for their presence.
  }
  return true; // Return true if all validation criteria pass.
}

module.exports = validateUsername; 