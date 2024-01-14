const hasValidate = require("../../utils/hasFunction");
const { MIN_LENGTH, MAX_LENGTH } = require("../../common/validationConstants");
function hasRepeatingChar(pass, options) {
  const repeat = options && options.repeatChar ? options.repeatChar : 2;

  for (let i = 0; i < pass.length - repeat + 1; i++) {
    const subString = pass.substring(i, i + repeat);
    if (subString.length === new Set(subString).size) {
      continue;
    }
    return true;
  }
  return false;
}
function hasOption (option , name){
  if(option[name]){
    return option[name]
  }else{
    return false
  }
}
function validatePassword(password, options = {}) {
  const min = options.minLength || MIN_LENGTH;
  const max = options.maxLength ||  MAX_LENGTH;
  if (typeof min !== "number" || typeof max !== "number") {
    throw new Error(
      "Sorry, you must enter a number for the min or max length entry!"
    );
  }
  const hasVal = hasValidate(password);
  const lowerCase = hasOption(options,"lowerCase") || hasVal.hasLowerCase();
  const upperCase = hasOption(options,"lowerCase") || hasVal.hasUppercase()
  const number = hasOption(options,"upperCase")|| hasVal.hasNumber()
  const SpecialCharacter = hasOption(options,"specialCharacter") || hasVal.hasSpecialCharacter()
  const String = hasOption(options,"String")|| hasVal.hasString()
  const customRegex = hasOption(options,"Regex").test(password) || false;
  return (
    password.length >= min &&
    password.length <= max &&
    lowerCase 
  );
}

module.exports = validatePassword;
