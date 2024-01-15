"use strict";
const { MAX_LENGTH, MIN_LENGTH, trimmedValue } = require("../../common/validationConstants");
const hasOption = require("../../common/hasOption");
const inputValidator = require("../../utils/inputValidator");
const {handleValidationError} = require('../../errors/HandleError')
function validatePassword(value, options = {}) {
  const has = inputValidator(value);
  const upperCase = has.hasUppercase();
  handleValidationError(upperCase,'Password must contain at least one uppercase letter.')
  const lowerCase = has.hasLowerCase();
  handleValidationError(lowerCase ,'Password must contain at least one lowerCase letter.')
  const number = has.hasNumber();
  handleValidationError(number ,'Password must have at least one number.')
  const specialCharacter = has.hasSpecialCharacter();
  handleValidationError(specialCharacter ,'The password must contain at least one special character such as (@#$%^&*).')
  const Alphabetic = has.hasAlphabetic();
  handleValidationError(specialCharacter ,'Input must contain at least one alphabetic character.')
  const whitespace = !has.hasWhitespace(); 
  if (!whitespace) {
    return value = trimmedValue(value);
  }
  const minLength = has.hasMinLength(MIN_LENGTH);
  const maxLength = has.hasMaxLength(MAX_LENGTH);
  if (typeof MIN_LENGTH !== 'number' || typeof MAX_LENGTH !== 'number') {
    throw new Error('MIN_LENGTH and MAX_LENGTH must be of type number');
  }
  if (value.length < MIN_LENGTH || value.length > MAX_LENGTH) {
    throw new Error(`Password length must be between ${MIN_LENGTH} and ${MAX_LENGTH} characters.`);
  }
  const isValid =
    minLength &&
    maxLength &&
    upperCase &&
    lowerCase &&
    number &&
    specialCharacter &&
    Alphabetic &&
    whitespace;
  return isValid;
}
const result = validatePassword("    NASDHJsSDA231@#!@#asdsadsad   asdsa    SADS@#@asda      ")
console.log("Validation Result:", result);

module.exports = validatePassword;
