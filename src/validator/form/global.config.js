/**
 * Validates a password based on specified criteria.
 *
 * @typedef {Object} configurePassword
 * @property {Object} options - Options for customizing validation criteria.
 * @property {Object} options.minLength - Minimum length requirements for the password.
 * @property {number|string} options.minLength.value - The minimum length value. If not provided, it defaults to the value from the validation constants.
 * @property {string} options.minLength.errorMessage - Error message for minimum length validation failure.
 * @property {Object} options.maxLength - Maximum length requirements for the password.
 * @property {number|string} options.maxLength.value - The maximum length value. If not provided, it defaults to the value from the validation constants.
 * @property {string} options.maxLength.errorMessage - Error message for maximum length validation failure.
 * @property {Object} options.uppercase - Uppercase letter requirements for the password.
 * @property {boolean} options.uppercase.required - Whether uppercase letters are required.
 * @property {string} options.uppercase.errorMessage - Error message for uppercase letter validation failure.
 * @property {Object} options.lowercase - Lowercase letter requirements for the password.
 * @property {boolean} options.lowercase.required - Whether lowercase letters are required.
 * @property {string} options.lowercase.errorMessage - Error message for lowercase letter validation failure.
 * @property {Object} options.number - Numeric digit requirements for the password.
 * @property {boolean} options.number.required - Whether numeric digits are required.
 * @property {string} options.number.errorMessage - Error message for numeric digit validation failure.
 * @property {Object} options.specialCharacter - Special character requirements for the password.
 * @property {boolean} options.specialCharacter.required - Whether special characters are required.
 * @property {string} options.specialCharacter.errorMessage - Error message for special character validation failure.
 * @property {Object} options.alphabetic - Alphabetic character requirements for the password.
 * @property {boolean} options.alphabetic.required - Whether alphabetic characters are required.
 * @property {string} options.alphabetic.errorMessage - Error message for alphabetic character validation failure.
 * @property {Object} options.whitespace - Whitespace requirements for the password.
 * @property {boolean} options.whitespace.required - Whether whitespace is not allowed.
 * @property {string} options.whitespace.errorMessage - Error message for whitespace validation failure.
 */
let defaultOptions = {};
function configurePassword(option) {
  defaultOptions = { ...defaultOptions, ...option };
}

/**
 * Options for customizing username validation criteria.
 *
 * @typedef {Object} UsernameOptions
 * @property {Object} minLength - Minimum length requirements for the username.
 * @property {(number|string)} minLength.value - The minimum length value. If not provided, it defaults to the value from the validation constants.
 * @property {string} minLength.errorMessage - Error message for minimum length validation failure.
 * @property {Object} maxLength - Maximum length requirements for the username.
 * @property {(number|string)} maxLength.value - The maximum length value. If not provided, it defaults to the value from the validation constants.
 * @property {string} maxLength.errorMessage - Error message for maximum length validation failure.
 * @property {Object} uppercase - Uppercase letter requirements for the username.
 * @property {boolean} uppercase.required - Whether uppercase letters are required.
 * @property {string} uppercase.errorMessage - Error message for uppercase letter validation failure.
 * @property {Object} number - Numeric digit requirements for the username.
 * @property {boolean} number.required - Whether numeric digits are required.
 * @property {string} number.errorMessage - Error message for numeric digit validation failure.
 * @property {Object} nonAlphanumeric - Non-alphanumeric character requirements for the username.
 * @property {boolean} nonAlphanumeric.required - Whether non-alphanumeric characters are required.
 * @property {string} nonAlphanumeric.errorMessage - Error message for non-alphanumeric character validation failure.
 * @property {Object} trim - Whitespace requirements for the username.
 * @property {boolean} trim.required - Whether leading or trailing whitespaces are disallowed.
 * @property {string} trim.errorMessage - Error message for whitespace validation failure.
 * @property {Object} repeat - Consecutive character requirements for the username.
 * @property {boolean} repeat.required - Whether consecutive characters are disallowed.
 * @property {string} repeat.errorMessage - Error message for consecutive character validation failure.
 */
/**
 * Validates a username based on the provided options.
 *
 * @param {string} input - The username string to be validated.
 * @param {UsernameOptions} options - Options for customizing validation criteria.
 * @returns {boolean} - True if the username is valid, otherwise false.
 * @throws {Error} - Throws an error if validation fails.
 * @example
 * const { validateUsername } = require("vfyjs");
 * const isValid = validateUsername("StringUsername123");
 * console.log(isValid); // true
 */
function configureUserName(option){
    defaultOptions = { ...defaultOptions, ...option };
}


// Export default options and configuration function
module.exports = {
    defaultOptions,
    configurePassword,
    configureUserName
};
