const hasValidate = require("../../utils/hasUtilsFunction");
const { MIN_LENGTH, MAX_LENGTH } = require("../../common/validationConstants");

/**
 * Validates a password based on specified options.
 * @param {string} password - The password to validate.
 * @param {Object} options - Validation options.
 * @param {number} [options.minLength] - Minimum length requirement.
 * @returns {number} [options.maxLength] - Maximum length requirement.
 */
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

function validatePassword(password, options = {}) {
  const min = options.minLength ? options.minLength : MIN_LENGTH;
  const max = options.minLength ? options.maxLength : MAX_LENGTH;
  if (typeof min !== "number" || typeof max !== "number") {
    throw new Error(
      "Sorry, you must enter a number for the min or max length entry!"
    );
  }
  //   if (typeof min !== "number" || typeof max !== "number") {
  //     throw new Error("Invalid min or max length provided.");
  //   }
  // const lowercase = options.lowerCase !== undefined ? options.lowerCase : has.hasLowerCase();
  // const uppercase = options.upperCase !== undefined ? options.upperCase : has.hasUppercase();
  // const number = options.number !== undefined ? options.number : has.hasNumber();
  // const specialCharacter = options.specialCharacter !== undefined ? options.specialCharacter : has.hasSpecialCharacter();

  // const customRegex = !options.Regex || options.Regex.test(password);
  // const hasRepeatChar = options.repeatChar !== undefined ? options.repeatChar : hasRepeatingChar(password, options);
  const hasVal = hasValidate(password);
  // return (
  //   password.length >= min &&
  //   password.length <= max &&
  //   lowercase &&
  //   uppercase &&
  //   number &&
  //   specialCharacter &&
  //   hasRepeatChar &&
  //   customRegex
  // );
  return (
    password.length >= min &&
    password.length <= max &&
    hasVal.hasLowerCase() &&
    hasVal.hasNumber() &&
    hasVal.hasSpecialCharacter() &&
    hasVal.hasString() &&
    hasVal.hasUppercase()
  );
}

module.exports = validatePassword;
