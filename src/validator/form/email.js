"use strict";

const inputValidator = require("../../utils/inputValidator");
const { ifFalsyValue } = require("../../errors/HandleError");

/**
 * Validates whether the provided value is a valid email.
 *
 * @param {string} value - The input string to be validated as an email.
 * @returns {boolean} - True if the input is a valid email, otherwise false.
 * @example
 * const { email } = require('vfyjs')
 * const isValid = email('mahdimamashli1383@gmail.com')
 * console.log(isValid); //true
 */
function validateEmail(value) {
  // Check if the input is a string
  if (typeof value !== "string") {
    ifFalsyValue(
      value,
      `Invalid input type. Please enter a valid email as a string.`
    );
    return false;
  }

  const validator = inputValidator(value);

  // Check if the email format is valid
  const isValidFormat = validator.matchesEmailFormat(value);
  if (typeof isValidFormat !== "boolean") {
    ifFalsyValue(
      isValidFormat,
      `Unexpected validation result. The email validation should return a boolean.`
    );
    return false;
  }
  console.log(`isValid Format ${value} =>`, isValidFormat);
  if (!isValidFormat) {
    ifFalsyValue(
      isValidFormat,
      `${value} is not a valid email address. Please enter a valid email.`
    );
    return false;
  }

  // If the input is a string and has a valid email format, return true
  return true;
}
module.exports = validateEmail;
