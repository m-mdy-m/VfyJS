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
  console.log("upperCase:", upperCase);
  console.log("lowerCase:", lowerCase);
  console.log("number:", number);
  console.log("specialCharacter:", specialCharacter);
  console.log("Alphabetic:", Alphabetic);
  console.log("whitespace:", whitespace);
  console.log("minLength:", minLength);
  console.log("maxLength:", maxLength);
  const isValid =
    value.length >= minLength &&
    value.length <= maxLength &&
    upperCase &&
    lowerCase &&
    number &&
    specialCharacter &&
    Alphabetic &&
    whitespace;
  return isValid;
}

const result = validatePassword("MAhdia@242@#@#$%");
console.log("Validation Result:", result);

module.exports = validatePassword;
