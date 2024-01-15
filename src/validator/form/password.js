'use strict';
const hasValidate = require("../../utils/hasFunction");
const { MIN_LENGTH, MAX_LENGTH } = require("../../common/validationConstants");
const hasOption = require("../../common/hasOption");

function validatePassword(password, options = {}) {
  const min = options.minLength ? options.minLength : MIN_LENGTH;
  const max = options.maxLength ? options.maxLength : MAX_LENGTH;

  if (typeof min !== "number" || typeof max !== "number") {
    throw new Error("Sorry, you must enter a number for the min or max length entry!");
  }

  const hasVal = hasValidate(password);
  const lowerCase = hasOption(options, 'lowerCase') ? options.lowerCase : hasVal.hasLowerCase();
  const upperCase = hasOption(options, 'upperCase') ? options.upperCase : hasVal.hasUppercase();
  const number = hasOption(options, 'number') ? options.number : hasVal.hasNumber();
  const specialCharacter = hasOption(options, 'specialCharacter') ? options.specialCharacter : hasVal.hasSpecialCharacter();
  const string = hasOption(options, 'string') ? options.string : hasVal.hasString();
  console.log(lowerCase);
  console.log(upperCase);
  console.log(number);
  console.log(specialCharacter);
  console.log(string);
  return (
    password.length >= min &&
    password.length <= max &&
    lowerCase &&
    upperCase &&
    number &&
    specialCharacter &&
    string
  );
}

module.exports = validatePassword;
