"use strict";
const { MAX_LENGTH, MIN_LENGTH } = require("../../common/validationConstants");
const hasOption = require("../../utils/inputValidator");
const inputValidator = require("../../utils/inputValidator");
function validatePassword(value, options= {}) {
  const minLength =  MIN_LENGTH;
  const maxLength =  MAX_LENGTH;
  const has = inputValidator(value);
  const upperCase = has.hasUppercase();
  const lowerCase = has.hasLowerCase();
  const number = has.hasNumber();
  const specialCharacter = has.hasSpecialCharacter();
  const string = has.hasString();
  console.log("upperCase =>", upperCase);
  console.log("lowerCase =>", lowerCase);
  console.log("number =>", number);
  console.log("specialCharacter =>", specialCharacter);
  console.log("string =>", string);
  console.log("value =>", value);
  console.log("options =>", options);
  return { 
    value.length > minLength &&
    value.length < maxLength &&
    upperCase &&
    lowerCase &&
    number &&
    specialCharacter &&
    string
  }
}
validatePassword("MAhdia@242@#@#$%")

module.exports = validatePassword