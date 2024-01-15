'use strict';
const hasValidate = require("../../utils/hasFunction");
const { MIN_LENGTH, MAX_LENGTH } = require("../../common/validationConstants");
const hasOption = require("../../common/hasOption");
function hasRepeatingChar(pass, options) {
  const repeat = hasOption(options) ? options.repeatChar : 5;

  for (let i = 0; i < pass.length - repeat + 1; i++) {
    const subString = pass.substring(i, i + repeat);
    if (subString.length === new Set(subString).size) {
      continue;
    }
    return true;
  }
  return false;
}
function validatePassword(password, options = {}) {
  const min = options.minLength? options.minLength :  MIN_LENGTH;
  const max = options.maxLength? options.maxLength :  MAX_LENGTH;
  console.log(min)
  console.log(max)
  if (typeof min !== "number" || typeof max !== "number") {
    throw new Error(
      "Sorry, you must enter a number for the min or max length entry!"
    );
  }
  const hasVal = hasValidate(password);
  const lowerCase = options.lowerCase? options.lowerCase :  hasVal.hasLowerCase();
  const upperCase = options.upperCase? options.upperCase : hasVal.hasUppercase();
  const number = options.number? options.number :hasVal.hasNumber();
  const SpecialCharacter = options.specialCharacter? options.specialCharacter : hasVal.hasSpecialCharacter();
  const String = options.String? options.String : hasVal.hasString();
  const customRegex = options.customRegex? options.customRegex.test(password) : undefined;
  if (customRegex !== undefined) {
    return (
      password.length >= min &&
      password.length <= max &&
      customRegex
    );
  }else{
    return (
      password.length >= min &&
    password.length <= max &&
    lowerCase &&
    upperCase &&
    number &&
    SpecialCharacter &&
    String 
    // repeat
    );
  }
  
}

module.exports = validatePassword;
