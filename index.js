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
const { isHttp, isHttps } = require("./src/validator/links/validate.url");

// Importing color validation function
const colorValidate = require("./src/validator/colors/isColor");

// Importing phone number validation function

// Importing utility functions for input validation
const inputValidations = require("./src/utils/inputValidator");

// import global config password and username
const {
  setUsernameConfig,
  setPasswordConfig,
} = require("./src/validator/form/global.config");
// Importing RequestValidator module
const RequestValidator = require("./src/validator/requests/request");

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
   * Provides utility functions for input validation.
   *
   * @namespace
   * @property {function}
   */
  inputValidations: inputValidations,
  /**
   * Sets the configuration options for username validation.
   *
   * @function
   * @param {Object} options - Options object for customizing username validation criteria.
   * @throws {Error} Throws an error if the provided options are invalid.
   * @example
   * // Set custom username validation options
   * setUsernameConfig({
   *   minLength: { value: 4 },
   *   maxLength: { value: 20 },
   *   uppercase: { required: true },
   *   number: { required: true },
   *   nonAlphanumeric: { required: true },
   *   trim: { required: true },
   *   repeat: { required: true }
   * });
   */
  setUsernameConfig: setUsernameConfig,

  /**
   * Sets the configuration options for password validation.
   *
   * @function
   * @param {Object} options - Options object for customizing password validation criteria.
   * @throws {Error} Throws an error if the provided options are invalid.
   * @example
   * // Set custom password validation options
   * setPasswordConfig({
   *   minLength: { value: 8 },
   *   maxLength: { value: 50 },
   *   uppercase: { required: true },
   *   lowercase: { required: true },
   *   number: { required: true },
   *   specialCharacter: { required: true },
   *   alphabetic: { required: false },
   *   whitespace: { required: false }
   * });
   */
  setPasswordConfig: setPasswordConfig,
  /**
   * RequestValidator class provides a comprehensive set of functions for validating incoming request data
   * based on specified rules. It offers a flexible and extensible solution for ensuring the integrity
   * and correctness of various types of input data, including strings, numbers, arrays, and objects.
   * Additionally, it includes utility functions for input validation and error handling.
   *
   * @class
   * @name RequestValidator
   * @memberof module:Validator
   * @constructor
   * @param {Object} req - The request object containing the data to be validated.
   * @example
   * const express = require('express');
   * const { RequestValidator } = require('your-validator-module');
   *
   * const app = express();
   * app.use(express.json());
   *
   * // Endpoint for user registration
   * app.post('/register', (req, res) => {
   *   // Instantiate RequestValidator with the request body
   *   const validator = new RequestValidator(req.body);
   *
   *   // Define validation rules for the registration data
   *   const rules = {
   *     username: 'string|min:5|max:20|alphanumeric',
   *     email: 'email',
   *     password: 'string|min:8|max:20',
   *     confirmPassword: 'string|equals:' + req.body.password,
   *   };
   *
   *   // Validate the request data against the defined rules
   *   const errors = validator.validate(rules);
   *
   *   // Check if there are validation errors
   *   if (Object.keys(errors).length === 0) {
   *     // Data is valid, proceed with registration
   *     res.status(200).json({ message: 'Registration successful!' });
   *   } else {
   *     // Validation errors, return error response
   *     res.status(400).json({ errors });
   *   }
   * });
   *
   * // Start the Express server
   * const PORT = process.env.PORT || 3000;
   * app.listen(PORT, () => {
   *   console.log(`Server is running on port ${PORT}`);
   * });
   */
  RequestValidator,
};
