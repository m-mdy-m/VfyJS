"use strict";
const { MAX_LENGTH, MIN_LENGTH } = require("../../common/validationConstants");
const hasOption = require("../../common/hasOption");
const inputValidator = require("../../utils/inputValidator");
function validatePassword(value, options = {}) {
  const has = inputValidator(value);
  const upperCase = has.hasUppercase();
  const lowerCase = has.hasLowerCase();
  const number = has.hasNumber();
  const specialCharacter = has.hasSpecialCharacter();
  const Alphabetic = has.hasAlphabetic();
  const whitespace = !has.hasWhitespace(); 
  const minLength = has.hasMinLength(MIN_LENGTH);
  const maxLength = has.hasMaxLength(MAX_LENGTH);
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
module.exports = validatePassword;
