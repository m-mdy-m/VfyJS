const {
  MAX_LENGTH,
  MIN_LENGTH,
  trimmedValue,
} = require("../../common/validationConstants");
const inputValidator = require("../../utils/inputValidator");
const { handleValidationError } = require("../../errors/HandleError");
const handleOption = require('../../utils/handleOption')
function validateUsername(username, options = {}) {
  console.log(username);

  
  const validator = inputValidator(username);
  const minLength = MIN_LENGTH;
  const maxLength = MAX_LENGTH;
  const allow = validator.hasAlphanumeric();
  let whitespace = !validator.hasWhitespace();
  const number = validator.hasNumber()
  const lowercase = validator.hasLowerCase()
  const uppercase = validator.hasUppercase()
  console.log("whitespace 1=>", whitespace);
  if (!whitespace) {
    username = trimmedValue(username);
    whitespace = true;
  }
  let hasNonAlphanumeric = validator.hasNonAlphanumeric();
  console.log("hasNonAlphanumeric 1=>", hasNonAlphanumeric);
  if(hasNonAlphanumeric){
    throw new Error("Sorry, username cannot contain special characters")
  }
  hasNonAlphanumeric = true;
  
  if (typeof minLength !== "number" || typeof maxLength !== "number") {
    throw new Error("type length just number");
  }
  const length =
    validator.hasMinLength(minLength) && validator.hasMaxLength(maxLength);
  console.log("allow =>", allow);
  console.log("whitespace => 2", whitespace);
  console.log("hasNonAlphanumeric 2=>", hasNonAlphanumeric);
  console.log("length =>", length);

  const isValid = allow && hasNonAlphanumeric && length && whitespace;
  return isValid;
}

const result = validateUsername("mahdi");
console.log("result=>", result);
module.exports = validateUsername;
