/**
 * Default options for password and username validation.
 */
let defaultOptions = {
    minLength: {
      value: 8,
      message: "Must be at least 8 characters long.",
    },
    maxLength: {
      value: 64,
      message: "cannot exceed 64 characters.",
    },
    uppercase: {
      required: true,
      message: "Must contain at least one uppercase letter.",
    },
    lowercase: {
      required: true,
      message: "Must contain at least one lowercase letter.",
    },
    number: {
      required: true,
      message: "Must contain at least one numeric digit.",
    },
    specialCharacter: {
      required: true,
      message: "Must contain at least one special character.",
    },
    whitespace: {
      required: true,
      message: "Whitespace is not allowed in the password.",
    },
};
/**
 * Default options for username validation.
 */
let defaultUsernameOptions = {
  minLength: {
    value: 2,
    message: "Username must be at least 5 characters long.",
  },
  maxLength: {
    value: 32,
    message: "Username cannot exceed 32 characters.",
  },
  alphanumeric: {
    required: true,
    message: "Username must contain only alphanumeric characters.",
  },
  whitespace: {
    required: false,
    message: "Username cannot contain whitespace characters.",
  },
};
/**
 * Sets the configuration options for password validation.
 *
 * @function
 * @param {Object} option - Options object for customizing password validation criteria.
 * @param {Object} option.minLength - Minimum length requirements for the password.
 * @param {(number|string)} option.minLength.value - The minimum length value. If not provided, it defaults to the value from the validation constants.
 * @param {string} option.minLength.message - Error message for minimum length validation failure.
 * @param {Object} option.maxLength - Maximum length requirements for the password.
 * @param {(number|string)} option.maxLength.value - The maximum length value. If not provided, it defaults to the value from the validation constants.
 * @param {string} option.maxLength.message - Error message for maximum length validation failure.
 * @param {Object} option.uppercase - Uppercase letter requirements for the password.
 * @param {boolean} option.uppercase.required - Whether uppercase letters are required.
 * @param {string} option.uppercase.message - Error message for uppercase letter validation failure.
 * @param {Object} option.lowercase - Lowercase letter requirements for the password.
 * @param {boolean} option.lowercase.required - Whether lowercase letters are required.
 * @param {string} option.lowercase.message - Error message for lowercase letter validation failure.
 * @param {Object} option.number - Numeric digit requirements for the password.
 * @param {boolean} option.number.required - Whether numeric digits are required.
 * @param {string} option.number.message - Error message for numeric digit validation failure.
 * @param {Object} option.specialCharacter - Special character requirements for the password.
 * @param {boolean} option.specialCharacter.required - Whether special characters are required.
 * @param {string} option.specialCharacter.message - Error message for special character validation failure.
 * @param {Object} option.alphabetic - Alphabetic character requirements for the password.
 * @param {boolean} option.alphabetic.required - Whether alphabetic characters are required.
 * @param {string} option.alphabetic.message - Error message for alphabetic character validation failure.
 * @param {Object} option.whitespace - Whitespace requirements for the password.
 * @param {boolean} option.whitespace.required - Whether whitespace is not allowed.
 * @param {string} option.whitespace.message - Error message for whitespace validation failure.
 */
function setPasswordConfig(option) {
  defaultOptions = { ...defaultOptions, ...option };
}

/**
 * Sets the configuration options for username validation.
 *
 * @function
 * @param {Object} option - Options object for customizing username validation criteria.
 * @param {Object} option.minLength - Minimum length requirements for the username.
 * @param {(number|string)} option.minLength.value - The minimum length value. If not provided, it defaults to the value from the validation constants.
 * @param {string} option.minLength.message - Error message for minimum length validation failure.
 * @param {Object} option.maxLength - Maximum length requirements for the username.
 * @param {(number|string)} option.maxLength.value - The maximum length value. If not provided, it defaults to the value from the validation constants.
 * @param {string} option.maxLength.message - Error message for maximum length validation failure.
 * @param {Object} option.uppercase - Uppercase letter requirements for the username.
 * @param {boolean} option.uppercase.required - Whether uppercase letters are required.
 * @param {string} option.uppercase.message - Error message for uppercase letter validation failure.
 * @param {Object} option.number - Numeric digit requirements for the username.
 * @param {boolean} option.number.required - Whether numeric digits are required.
 * @param {string} option.number.message - Error message for numeric digit validation failure.
 * @param {Object} option.nonAlphanumeric - Non-alphanumeric character requirements for the username.
 * @param {boolean} option.nonAlphanumeric.required - Whether non-alphanumeric characters are required.
 * @param {string} option.nonAlphanumeric.message - Error message for non-alphanumeric character validation failure.
 * @param {Object} option.whitespace - Whitespace requirements for the username.
 * @param {boolean} option.whitespace.required - Whether leading or trailing whitespaces are disallowed.
 * @param {string} option.whitespace.message - Error message for whitespace validation failure.
 * @param {Object} option.repeat - Consecutive character requirements for the username.
 * @param {boolean} option.repeat.required - Whether consecutive characters are disallowed.
 * @param {string} option.repeat.message - Error message for consecutive character validation failure.
 */
function setUsernameConfig(option) {
  defaultOptions = { ...defaultOptions, ...option };
}

// Export default options and configuration function
module.exports = {
  defaultUsernameOptions,
  defaultOptions,
  setPasswordConfig,
  setUsernameConfig,
};
