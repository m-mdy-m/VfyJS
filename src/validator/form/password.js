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
/**
 * Validates a password based on the specified options.
 * @param {string} password - The password to validate.
 * @param {object} options - The validation options.
 * @param {number} options.minLength - The minimum length of the password.
 * @param {number} options.maxLength - The maximum length of the password.
 * @param {boolean} [options.lowerCase] - Whether the password should contain lowercase characters.
 * @param {boolean} [options.upperCase] - Whether the password should contain uppercase characters.
 * @param {boolean} [options.number] - Whether the password should contain numbers.
 * @param {boolean} [options.specialCharacter] - Whether the password should contain special characters.
 * @param {boolean} [options.String] - Whether the password should contain only strings.
 * @param {RegExp} [options.customRegex] - A custom regular expression to validate the password.
 * @returns {boolean} True if the password is valid, false otherwise.
 */
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
  const upperCase = hasOption(options, "upperCase") || hasVal.hasUppercase();
  const number = hasOption(options, "number") || hasVal.hasNumber();
  const SpecialCharacter = hasOption(options, "specialCharacter") || hasVal.hasSpecialCharacter();
  const String = hasOption(options, "String") || hasVal.hasString();
  const customRegex = hasOption(options, "customRegex") && options.customRegex.test(password);
    // ... (existing code)
  
    console.log('Condition 1:', password.length >= min);
    console.log('Condition 2:', password.length <= max);
    console.log('Condition 3:', lowerCase);
    console.log('Condition 4:', upperCase);
    console.log('Condition 5:', number);
    console.log('Condition 6:', SpecialCharacter);
    console.log('Condition 7:', String);
    console.log('Condition 8:', customRegex);
  
    // ... (existing code)
  

  if (customRegex) {
    return (
      password.length >= min &&
      password.length <= max &&
      customRegex
    );
  }
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

module.exports = validatePassword;
