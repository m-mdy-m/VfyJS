"use strict";
const { MAX_LENGTH, MIN_LENGTH } = require("../../common/validationConstants");
const hasOption = require("../../common/hasOption");
const inputValidator = require("../../utils/inputValidator");
function validatePassword(value, options= {}) {
  const minLength = hasOption(options,'minLength') || MIN_LENGTH;
  const maxLength = hasOption(options,'maxLength') || MAX_LENGTH;
  const has = inputValidator(value);
  const upperCase = hasOption(options, 'upperCase') || has.hasUppercase();
  const lowerCase = hasOption(options, 'lowerCase') || has.hasLowerCase();
  const number = hasOption(options, 'number') || has.hasNumber();
  const specialCharacter = hasOption(options, 'specialCharacter') ||has.hasSpecialCharacter();
  const string = hasOption(options, 'string') || has.hasString();
  const whitespace = has.hasW
  const isValid = (
    value.length >= minLength &&
    value.length <= maxLength &&
    hasOption(options, 'upperCase') || has.hasUppercase() &&
    hasOption(options, 'lowerCase') || has.hasLowerCase() &&
    hasOption(options, 'number') || has.hasNumber() &&
    hasOption(options, 'specialCharacter') || has.hasSpecialCharacter() &&
    hasOption(options, 'string') || has.hasString()
  );
  return isValid
}
const result = validatePassword("MAhdia@242@#@#$%");
console.log("Validation Result:", result);

module.exports = validatePassword