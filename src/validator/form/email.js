"use strict";

const inputValidator = require("../../utils/inputValidator");
const { ifFalsyValue,IfNotType , ifTruthyValue, validationsLen } = require("../../errors/HandleError");
const createValidationOptions = require("../../utils/handleOption");
const { getValidValue } = require("../../common/validationConstants");

/**
 * Validates whether the provided value is a valid email.
 *
 * @param {string} value - The input string to be validated as an email.
 * @param {Object} [options={}] - Additional options for email validation.
 * @param {number} [options.minLenLocal=3] - The minimum length allowed for the local part of the email.
 * @param {number} [options.maxLenLocal=255] - The maximum length allowed for the local part of the email.
 * @param {number} [options.minLenDomain=3] - The minimum length allowed for the domain part of the email.
 * @param {number} [options.maxLenDomain=255] - The maximum length allowed for the domain part of the email.
 * @param {number} [options.minLenSubdomain=2] - The minimum length allowed for the subdomain part of the email.
 * @param {number} [options.maxLenSubdomain=255] - The maximum length allowed for the subdomain part of the email.
 * @returns {boolean} - True if the input is a valid email, otherwise false.
 * @throws {TypeError} - Throws a TypeError if the input is not a string.
 * @throws {ValidationError} - Throws a ValidationError if the email format is invalid.
 * @example
 * const { email } = require('vfyjs');
 * const isValid = email('mahdimamashli1383@gmail.com', { minLenLocal: 3, maxLenLocal: 255 });
 * console.log(isValid); // true
 */
function validateEmail(value, options = {}) {
  // Check if the input is a string
  IfNotType('string', value, `Invalid input type. Please enter a valid email as a string.`);

  // Basic email format validation
  const hasSymbol = /^(?!.*@.*@)[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  ifFalsyValue(hasSymbol, 'Email address must contain the "@" symbol.');
  const hasOneDot = /(?=.*(\.)\1)/.test(value);
  ifTruthyValue(hasOneDot,'The value must have at most one dot.')
  // Set standard length
  const standardMaxLength = 255;
  const standardMinLength = 3
  // Validation options
  const optionName = ['minLenLocal', 'minLenDomain', 'minLenSubdomain', 'maxLenLocal', 'maxLenDomain', 'maxLenSubdomain'];
  const optionValidations = [standardMinLength,standardMinLength,2, standardMaxLength,standardMaxLength,standardMaxLength];
  const msgError = 
  [
    `Local part must have between ${standardMinLength} and ${standardMaxLength} characters.`,
    `Domain part must have between ${standardMinLength} and ${standardMaxLength} characters.`,
    `Subdomain must have between 2 and ${standardMaxLength} characters.`,
    `Local part must have at most ${standardMaxLength} characters.`,
    `Domain part must have at most ${standardMaxLength} characters.`,
    `Subdomain must have at most ${standardMaxLength} characters.`,
  ];
  var objectOPtion = createValidationOptions(optionName,optionValidations,msgError);
  
  objectOPtion = { ...objectOPtion, ...options };

  const { minLenLocal, minLenDomain, minLenSubdomain, maxLenLocal, maxLenDomain, maxLenSubdomain } = objectOPtion;

  // Local part length validation
  const localPart = value.split('@')[0];
  validationsLen(localPart,{
    min : getValidValue(minLenLocal,minLenLocal),
    max : getValidValue(maxLenLocal,maxLenLocal),
    minMessage : minLenLocal.errorMessage,
    maxMessage : maxLenLocal.errorMessage
  })
  // Domain and subdomain length validation
  const ArrayDomain = value.split('@')[1].split('.');
  const domain = value.split('@')[1].trim();
  const domainPart = ArrayDomain[ArrayDomain.length - 1];
  const subdomain = domain.split(domainPart)[0].trim();
  const hasSpecialChar = inputValidator(domainPart).hasSpecialCharacter()
  ifTruthyValue(hasSpecialChar,'Subdomain should not contain special characters')
  validationsLen(subdomain, {
    min: getValidValue(minLenSubdomain,minLenSubdomain),
    max:  getValidValue(maxLenSubdomain,maxLenSubdomain),
    minMessage: minLenSubdomain.errorMessage,
    maxMessage: maxLenSubdomain.errorMessage,
  });
  validationsLen(domainPart, {
    min: getValidValue(minLenDomain, minLenDomain),
    max: getValidValue(maxLenDomain, maxLenDomain),
    minMessage: minLenDomain.errorMessage,
    maxMessage: maxLenDomain.errorMessage,
  });
  // Email format validation using inputValidator
  const validator = inputValidator(value);
  const email = localPart+'@'+subdomain+domainPart
  const isValidEmail = email ===value
  const isValidFormat = validator.matchesEmailFormat(value);
  IfNotType('boolean', isValidFormat, `Unexpected validation result. The email validation should return a boolean.`);
  ifFalsyValue(isValidFormat, `The provided email address '${value}' is not valid. Please enter a valid email.`);
  const isValid = isValidFormat && hasSymbol && isValidEmail
  // If the input is a string and has a valid email format, return true
  return isValid;
}
module.exports = validateEmail;
