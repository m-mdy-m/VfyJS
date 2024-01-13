const hasValidate = require("../../utils/hasUtilsFunction");
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


/**
 * Validates a password based on specified options.
 * @param {string} password - The password to validate.
 * @param {Object} options - Validation options.
 * @param {number} [options.minLength] - Minimum length requirement.
 * @param {number} [options.maxLength] - Maximum length requirement.
 * @param {boolean} [options.lowerCase] - Require lowercase characters.
 * @param {boolean} [options.upperCase] - Require uppercase characters.
 * @param {boolean} [options.number] - Require numeric characters.
 * @param {boolean} [options.specialCharacter] - Require special characters.
 * @param {boolean} [options.repeatChar] - Set to false to skip repeating character check.
 * @returns {boolean} - True if the password is valid, false otherwise.
 */
function validatePassword(password, options = {}) {
    const min = options.minLength || MIN_LENGTH;
    const max = options.maxLength || MAX_LENGTH;
    if (typeof min !== "number" || typeof max !== "number") {
      throw new Error("Invalid min or max length provided.");
    }
  const has = hasValidate(password);
  const lowercase = options.lowerCase !== undefined ? options.lowerCase : has.hasLowerCase();
  const uppercase = options.upperCase !== undefined ? options.upperCase : has.hasUppercase();
  const number = options.number !== undefined ? options.number : has.hasNumber();
  const specialCharacter = options.specialCharacter !== undefined ? options.specialCharacter : has.hasSpecialCharacter();
  
  const customRegex = !options.Regex || options.Regex.test(password);
  const hasRepeatChar = options.repeatChar !== undefined ? options.repeatChar : hasRepeatingChar(password, options);

  return (
    password.length >= min &&
    password.length <= max &&
    lowercase &&
    uppercase &&
    number &&
    specialCharacter &&
    hasRepeatChar &&
    customRegex
  );
}

module.exports = validatePassword;
