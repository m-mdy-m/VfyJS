const hasValidate = require("../../utils/hasUtilsFunction");
const { MIN_LENGTH } = require("../../common/validationConstants");
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
 * @returns {boolean} - True if the password is valid, false otherwise.
 */
function validatePassword(password, options = {}) {
  const min = options.minLength || MIN_LENGTH;
  const max = options.maxLength || 100;
  if (typeof min !== 'number' || typeof max !== 'number') {
    throw new Error('Invalid min or max length provided.');
  }
  const has = hasValidate(password);
  return (
    password.length >= min &&
    password.length <= max &&
    (!options.LowerCase || has.hasLowerCase()) &&
    (!options.UpperCase || has.hasUppercase()) &&
    (!options.Number || has.hasNumber()) &&
    (!options.SpecialCharacter || has.hasSpecialCharacter())
  );
}

module.exports = validatePassword;
