"use strict";

import inputValidator  from "../../utils/inputValidator"
import { getValidValue }  from "../../common/validationimportants"
import { optionEmail }  from "./helper/genOption.mjs"
import { toString }  from "./helper/dataConversion"
import { NotType, ThrowFalsy, ThrowTruthy, isEmpty, validationsLength }  from "../../errors/Error.mjs"

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
  isEmpty(value,'Email is required')
  // Extracting options and error messages
  const {maxLenDomain, maxLenLocal, maxLenSubdomain, minLenDomain, minLenLocal, minLenSubdomain, msgError } = optionEmail(options);

  // Check if the input is a string
  NotType(value,'string','Please enter a valid email as a string.')
  
  // Basic email format validation
  const hasSymbol = /^(?!.*@.*@)[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  ThrowFalsy(hasSymbol,'Email must contain @')
  
  const hasOneDot = /(?=.*(\.)\1)/.test(value);
  ThrowTruthy(hasOneDot,'Must have at most one dot.')
  
  // Local part length validation
  const localPart = value.split('@')[0];
  validationsLength(localPart,{
    min: minLenLocal.value,
    max: maxLenLocal.value,
    minError: minLenLocal.message,
    maxError: maxLenLocal.message
  })

  // Domain and subdomain length validation
  const ArrayDomain = value.split('@')[1].split('.');
  const domain = value.split('@')[1].trim();
  const domainPart = ArrayDomain[ArrayDomain.length - 1];
  const subdomain = domain.split(domainPart)[0].trim();
  const hasSpecialChar = inputValidator(domainPart).hasSpecialCharacter();
  ThrowTruthy(hasSpecialChar, 'Subdomains cannot contain special characters.')
  validationsLength(subdomain, {
    min: minLenSubdomain.value,
    max: maxLenSubdomain.value,
    minError: minLenSubdomain.message,
    maxError: maxLenSubdomain.message,
  })

  validationsLength(domainPart, {
    min:minLenDomain.value,
    max: minLenDomain.value,
    minError: minLenDomain.message,
    maxError: maxLenDomain.message,
  });

  // Email format validation using inputValidator
  const validator = inputValidator(value);
  const email = localPart + '@' + subdomain + domainPart;
  const isValidEmail = email === value;
  const isValidFormat = validator.matchesEmailFormat(value);
  validateType('boolean', isValidFormat, 'Unexpected validation result for email format.', input, msgError, 'Email Format');
  throwIfFalsy(isValidFormat, input, msgError, 'Email Format', `The provided email address '${value}' is not valid. Please enter a valid email.`);
  const isValid = isValidFormat && hasSymbol && isValidEmail;

  // If the input is a string and has a valid email format, return true
  return isValid;
}
module.exports = validateEmail;
