"use strict";

const inputValidator = require("../../utils/inputValidator");
const { ifFalsyValue,IfNotType , validationsLen } = require("../../errors/HandleError");
const { getValidValue } = require("../../common/validationConstants");
const { optionEmail } = require("./helper/genOption");
const { validationsLength, throwIfFalsy, ifTruthyValue, TypeMatches } = require("../../errors/FormError");
const { toString } = require("./helper/dataConversion");

/**
 * Validates whether the provided value is a valid email.
 *
 * @param {string|{value: string}} input - The input string or object containing a 'value' property to be validated as an email.
 * @param {Object} [options={}] - Additional options for email validation.
 * @param {number} [options.minLenLocal=3] - The minimum length allowed for the local part of the email.
 * @param {number} [options.maxLenLocal=255] - The maximum length allowed for the local part of the email.
 * @param {number} [options.minLenDomain=3] - The minimum length allowed for the domain part of the email.
 * @param {number} [options.maxLenDomain=255] - The maximum length allowed for the domain part of the email.
 * @param {number} [options.minLenSubdomain=2] - The minimum length allowed for the subdomain part of the email.
 * @param {number} [options.maxLenSubdomain=255] - The maximum length allowed for the subdomain part of the email.
 * @param {Object} [options.msgError={}] - Custom error messages for validation failures.
 * @returns {boolean} - True if the input is a valid email, otherwise false.
 * @throws {TypeError} - Throws a TypeError if the input is not a string.
 * @throws {ValidationError} - Throws a ValidationError if the email format is invalid.
 * @example
 * const { validateEmail } = require('vfyjs');
 * const isValid = validateEmail('mahdimamashli1383@gmail.com', { minLenLocal: 3, maxLenLocal: 255 });
 * console.log(isValid); // true
 */
function validateEmail(input, options = {}) {
  // Extracting value from input or using input directly if it's a string
  const value = input.value ? input.value : input;

  // Extracting options and error messages
  const {maxLenDomain, maxLenLocal, maxLenSubdomain, minLenDomain, minLenLocal, minLenSubdomain, msgError } = optionEmail(options);

  // Check if the input is a string
  TypeMatches('string', value, `Invalid input type. Please enter a valid email as a string.`, input, msgError, 'Check Type');

  // Convert value to string
  toString(value);
  
  // Basic email format validation
  const hasSymbol = /^(?!.*@.*@)[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  throwIfFalsy(hasSymbol, input, msgError, 'hasSymbol', 'Email address must contain the "@" symbol.');
  
  const hasOneDot = /(?=.*(\.)\1)/.test(value);
  ifTruthyValue('The value must have at most one dot.', hasOneDot, input, msgError, 'hasOneDot');

  // Local part length validation
  const localPart = value.split('@')[0];
  validationsLen(localPart, {
    min: getValidValue(minLenLocal, minLenLocal),
    max: getValidValue(maxLenLocal, maxLenLocal),
    minMessage: minLenLocal.errorMessage,
    maxMessage: maxLenLocal.errorMessage
  });

  // Domain and subdomain length validation
  const ArrayDomain = value.split('@')[1].split('.');
  const domain = value.split('@')[1].trim();
  const domainPart = ArrayDomain[ArrayDomain.length - 1];
  const subdomain = domain.split(domainPart)[0].trim();
  const hasSpecialChar = inputValidator(domainPart).hasSpecialCharacter();
  ifTruthyValue('Subdomain should not contain special characters', hasSpecialChar, input, msgError, 'hasSpecialChar');
  validationsLength(subdomain, {
    min: getValidValue(minLenSubdomain, minLenSubdomain),
    max: getValidValue(maxLenSubdomain, maxLenSubdomain),
    minMessage: minLenSubdomain.errorMessage,
    maxMessage: maxLenSubdomain.errorMessage,
  }, null, null, null, input, msgError, "validation SubDomain False");

  validationsLength(domainPart, {
    min: getValidValue(minLenDomain, minLenDomain),
    max: getValidValue(maxLenDomain, maxLenDomain),
    minMessage: minLenDomain.errorMessage,
    maxMessage: maxLenDomain.errorMessage,
  }, null, null, null, input, msgError, "validation Domain False");

  // Email format validation using inputValidator
  const validator = inputValidator(value);
  const email = localPart + '@' + subdomain + domainPart;
  const isValidEmail = email === value;
  const isValidFormat = validator.matchesEmailFormat(value);
  TypeMatches('boolean', isValidFormat, `Unexpected validation result. The email validation should return a boolean.`, input, msgError, 'Format email is False');
  throwIfFalsy(isValidFormat, input, msgError, 'Format email is False', `The provided email address '${value}' is not valid. Please enter a valid email.`);
  const isValid = isValidFormat && hasSymbol && isValidEmail;

  // If the input is a string and has a valid email format, return true
  return isValid;
}
module.exports = validateEmail;
