/**
 * Provides functions for validating various input types, such as passwords, emails,
 * usernames, URLs, phone numbers, and colors. Additionally, utility functions for input
 * validation and error handling are included.
 *
 * @module Validator
 * @namespace
 */

// Importing password validation function
const passwordValidate = require("./src/validator/form/password");

// Importing email validation function
const emailValidate = require("./src/validator/form/email");

// Importing username validation function
const userValidate = require("./src/validator/form/username");

// Importing HTTP link validation function
const isHttp = require("./src/validator/links/http");

// Importing HTTPS link validation function
const isHttps = require("./src/validator/links/https");

// Importing color validation function
const colorValidate = require("./src/validator/colors/isColor");

// Importing phone number validation function
const validatePhoneNumber = require("./src/validator/phone/phoneValidator");

// Importing utility functions for input validation
const inputValidations = require("./src/utils/inputValidator");

// Importing utility function for extracting substrings
const {
  getSubstring,
} = require("./src/validator/phone/utils/FormatValidation");

// Importing utility function for trimming values
const { trimmedValue } = require("./src/common/validationConstants");

// Importing error handling module
const HandleError = require("./src/errors/HandleError");
// Importing math operations module
const MathOperations = require("./src/utils/operations/mathUtils");

module.exports = {
  /**
   * Validates a password based on specified criteria.
   *
   * @function
   * @param {string} value - The password string to be validated.
   * @param {Object} options - Options for customizing validation criteria.
   * @returns {boolean} - True if the password is valid, otherwise false.
   * @throws {Error} - Throws an error if validation fails.
   */
  isPassword: passwordValidate,
  /**
   * Validates an email address.
   *
   * @function
   * @param {string} email - The email address to be validated.
   * @returns {boolean} - True if the email is valid, otherwise false.
   * @throws {Error} - Throws an error if validation fails.
   */
  isEmail: emailValidate,
  /**
   * Validates a username.
   *
   * @function
   * @param {string} username - The username to be validated.
   * @returns {boolean} - True if the username is valid, otherwise false.
   * @throws {Error} - Throws an error if validation fails.
   */
  isUsername: userValidate,
  /**
   * Validates a color string.
   *
   * @function
   * @param {string} color - The color string to be validated.
   * @returns {boolean} - True if the color is valid, otherwise false.
   * @throws {Error} - Throws an error if validation fails.
   */
  isColor: colorValidate,

  /**
   * Validates an HTTP link.
   *
   * @function
   * @param {string} link - The HTTP link to be validated.
   * @returns {boolean} - True if the link is valid, otherwise false.
   * @throws {Error} - Throws an error if validation fails.
   */
  isHttp: isHttp,
  /**
   * Validates an HTTPS link.
   *
   * @function
   * @param {string} link - The HTTPS link to be validated.
   * @returns {boolean} - True if the link is valid, otherwise false.
   * @throws {Error} - Throws an error if validation fails.
   */
  isHttps: isHttps,
  /**
   * Validates a phone number.
   *
   * @function
   * @param {string} phoneNumber - The phone number to be validated.
   * @returns {boolean} - True if the phone number is valid, otherwise false.
   * @throws {Error} - Throws an error if validation fails.
   */
  hasPhone: validatePhoneNumber,
  /**
   * Provides utility functions for input validation.
   *
   * @namespace
   * @property {function}
   */
  inputValidations: inputValidations,
  /**
   * Extracts a substring from a phone number.
   *
   * @function
   * @param {string} phoneNumber - The phone number from which to extract a substring.
   * @returns {string} - The extracted substring.
   */
  getSubstring: getSubstring,

  /**
   * Trims a value.
   *
   * @function
   * @param {any} value - The value to be trimmed.
   * @returns {any} - The trimmed value.
   */
  trimValue: trimmedValue,
  /**
   * Provides functions for handling errors, including numeric type checks.
   *
   * @namespace
   * @property {function}
   */
  HandleError: HandleError,
  /**
   * Provides utility functions for mathematical operations.
   *
   * @namespace
   * @property {MathOperations}
   */
  mathOperations: MathOperations,
};
