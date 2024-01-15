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

  handleValidationError(uppercase.required ? has.hasUppercase() : true, uppercase.errorMessage);
  handleValidationError(lowercase.required ? has.hasLowerCase() : true , lowercase.errorMessage)
  handleValidationError(number.required ? has.hasNumber() : true , number.errorMessage)
  handleValidationError(specialCharacter.required ? has.hasSpecialCharacter() : true , specialCharacter.errorMessage)
  handleValidationError(alphabetic.required ? has.hasAlphabetic() : true , alphabetic.errorMessage)
  const whitespaceCheck = whitespace.required ? has.hasWhitespace() : !has.hasWhitespace();
  if (!whitespaceCheck) {
    return value = trimmedValue(value);
  } 
  console.log('value =>', value);
  console.log('typeof value =>',typeof value);
  console.log('value.length =>', value.length);
  console.log('minLength =>',typeof minLength);
  console.log('typeof minLength.value =>',typeof minLength.value);
  console.log(' maxLength.value =>', maxLength.value);
  console.log(' minLength.value =>', minLength.value);
  if (typeof minLength.value === 'string' || typeof minLength.value === 'string') {
    minLength.value = +minLength.value;
    maxLength.value =+maxLength.value
}
  if (
    typeof minLength.value !== 'undefined' &&
    typeof maxLength.value !== 'undefined' &&
    (typeof minLength.value !== 'boolean') &&
    (typeof maxLength.value !== 'boolean') &&
    (typeof minLength.value !== 'number' || typeof maxLength.value !== 'number')
  ) {
    throw new Error("min or max Length just for true or false");
  }
  
  if (
    typeof minLength.value === 'number' &&
    typeof maxLength.value === 'number' &&
    (value.length < minLength.value || value.length > maxLength.value)
  ) {
    throw new Error(`Password length must be between ${minLength.value} and ${maxLength.value} characters.`);
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
const result = validatePassword("Mahd223@#Asd$",{
  minLength: { value: "3", errorMessage: 'Password must be at least 10 characters long.' },
  maxLength: { value: 20, errorMessage: 'Password cannot exceed 30 characters.' },
  uppercase: { required: false, errorMessage: 'uppercase .' },
  lowercase: { required: true, errorMessage: 'lowercase r.' },
  number: { required: false, errorMessage: 'number .' },
  specialCharacter: { required: false, errorMessage: 'specialCharacter' },
  alphabetic: { required: true, errorMessage: 'alphabetic ' },
  whitespace: { required: false, errorMessage: 'whitespace ' },
});
console.log("Validation Result:", result);

module.exports = validatePassword;
