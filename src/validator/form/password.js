"use strict";
const { MAX_LENGTH, MIN_LENGTH } = require("../../common/validationConstants");
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
  const specialCharacter = has.hasSpecialCharacter();
  const Alphabetic = has.hasAlphabetic();
  const whitespace = !has.hasWhitespace(); 
  const minLength = has.hasMinLength(MIN_LENGTH);
  const maxLength = has.hasMaxLength(MAX_LENGTH);
  console.log("upperCase:", upperCase);
  console.log("lowerCase:", lowerCase);
  console.log("number:", number);
  console.log("specialCharacter:", specialCharacter);
  console.log("Alphabetic:", Alphabetic);
  console.log("whitespace:", whitespace);
  console.log("minLength:", minLength);
  console.log("maxLength:", maxLength);
  console.log("Password Length:", value.length);
  console.log("Whitespace Check:", whitespace);
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
const a = 'adwadaw sa as'
const v = a.toUpperCase(a)
console.log('v =>', v);
const result = validatePassword("NASDHJsSDA@242@#@#$%")
console.log("Validation Result:", result);

module.exports = validatePassword;
