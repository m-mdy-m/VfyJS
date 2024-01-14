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
  const min = options.minLength || MIN_LENGTH;
  const max = options.maxLength || MAX_LENGTH;
  if (typeof min !== "number" || typeof max !== "number") {
    throw new Error(
      "Sorry, you must enter a number for the min or max length entry!"
    );
  }
  const hasVal = hasValidate(password);
  const lowerCase = hasOption(options, "lowerCase") || hasVal.hasLowerCase();
  const upperCase = hasOption(options, "lowerCase") || hasVal.hasUppercase();
  const number = hasOption(options, "upperCase") || hasVal.hasNumber();
  const SpecialCharacter = hasOption(options, "specialCharacter") || hasVal.hasSpecialCharacter();
  const String = hasOption(options, "String") || hasVal.hasString();
  // const customRegex = hasOption(options, "Regex");
  // const repeat = hasRepeatingChar(password, options) 
  return (
    password.length >= min &&
    password.length <= max &&
    lowerCase &&
    upperCase &&
    number &&
    SpecialCharacter &&
    String 
    // customRegex 
    // repeat
  );
}

module.exports = validatePassword;
