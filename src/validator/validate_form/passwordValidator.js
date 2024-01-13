const hasValidate = require("../../utils/hasUtilsFunction");
const { MIN_LENGTH, MAX_LENGTH } = require("../../common/validationConstants");

function hasRepeatingChar(pass, options) {
    const repeat = options && options.repeatChar ? options.repeatChar : 2;

    for (let i = 0; i < pass.length - repeat + 1; i++) {
      const subString = pass.subString(i, i + repeat);
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
 * @param {boolean} [options.LowerCase] - Require lowercase characters.
 * @param {boolean} [options.UpperCase] - Require uppercase characters.
 * @param {boolean} [options.Number] - Require numeric characters.
 * @param {boolean} [options.SpecialCharacter] - Require special characters.
 * @param {boolean} [options.repeatChar] - Set to false to skip repeating character check.
 * @returns {boolean} - True if the password is valid, false otherwise.
 */
function validatePassword(password, options = {}) {
  const min = options && options.minLength? options.minLength :MIN_LENGTH;
  const max = options && options.maxLength?options.maxLength : MAX_LENGTH;
  if (typeof min !== "number" || typeof max !== "number") {
    throw new Error("Invalid min or max length provided.");
  }
  const has = hasValidate(password);
  const customRegex = !options.Regex || options.Regex.test(password);
  const hasRepeatChar = !options.repeatChar || hasRepeatingChar(password, options);
  const lowercase = !options.LowerCase || has.hasLowerCase()
  const UpperCase = !options.UpperCase || has.hasUppercase()
  const Number = !options.Number || has.hasNumber()
  const SpecialCharacter = !options.SpecialCharacter || has.hasSpecialCharacter()
  return (
    password.length >= min &&
    password.length <= max &&
    lowercase &&
    UpperCase &&
    Number &&
    SpecialCharacter &&
    hasRepeatChar &&
    customRegex
  );
}

module.exports = validatePassword;
