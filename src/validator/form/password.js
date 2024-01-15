"use strict";
const { MAX_LENGTH, MIN_LENGTH, trimmedValue } = require("../../common/validationConstants");
const hasOption = require("../../common/hasOption");
const inputValidator = require("../../utils/inputValidator");
const {handleValidationError} = require('../../errors/HandleError')

function validatePassword(value, options = {}) {
  const has = inputValidator(value);
  const {
    minLength = { value : has.hasMinLength(MIN_LENGTH), errorMessage: 'Password must be at least 8 characters long.' },
    maxLength = { value : has.hasMaxLength(MAX_LENGTH), errorMessage: 'Password cannot exceed 20 characters.' },
    uppercase = { required: true, errorMessage: 'Password must contain at least one uppercase letter.' },
    lowercase = { required: true, errorMessage: 'Password must contain at least one lowercase letter.' },
    number = { required: true, errorMessage: 'Password must have at least one number.' },
    specialCharacter = { required: true, errorMessage: 'Password must contain at least one special character such as (@#$%^&*).' },
    alphabetic = { required: true, errorMessage: 'Input must contain at least one alphabetic character.' },
    whitespace = { required: false, errorMessage: 'Password cannot contain whitespace.' },
  } = options;

  handleValidationError(uppercase.required ? has.hasUppercase() : false , uppercase.errorMessage)
  handleValidationError(lowercase.required ? has.hasLowerCase() : false , lowercase.errorMessage)
  handleValidationError(number.required ? has.hasNumber() : false , number.errorMessage)
  handleValidationError(specialCharacter.required ? has.hasSpecialCharacter() : false , specialCharacter.errorMessage)
  handleValidationError(alphabetic.required ? has.hasAlphabetic() : false , alphabetic.errorMessage)
  const whitespaceCheck = whitespace.required ? has.hasWhitespace() : !has.hasWhitespace();
  if (!whitespaceCheck) {
    return value = trimmedValue(value);
  } 
  if (typeof MIN_LENGTH !== 'number' || typeof MAX_LENGTH !== 'number' && value.length < MIN_LENGTH || value.length > MAX_LENGTH) {
    if(minLength.errorMessage){
      throw new Error(minLength.errorMessage)
    }else if(maxLength.errorMessage){
      throw new Error(maxLength.errorMessage)
    }else{
      throw new Error('MIN_LENGTH and MAX_LENGTH must be of type number and Password length must be between ${MIN_LENGTH} and ${MAX_LENGTH} characters.');
    }
  }
  const isValid =
    minLength &&
    maxLength &&
    (uppercase.required ? has.hasUppercase() : true) &&
    (lowercase.required ? has.hasLowerCase() : true) &&
    (number.required ? has.hasNumber() : true) &&
    (specialCharacter.required ? has.hasSpecialCharacter() : true) &&
    (alphabetic.required ? has.hasAlphabetic() : true) &&
    whitespaceCheck

  return isValid;
}
const result = validatePassword("    NASDHJsSDA231@#!@#asdsadsad   asdsa    SADS@#@asda      ")
console.log("Validation Result:", result);

module.exports = validatePassword;
