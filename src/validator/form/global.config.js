/**
 * Default options for password and username validation.
 */
let defaultOptions = {
  // Default options for password validation
  password: {
    minLength: {
      value: 8,
      errorMessage: "must be at least 8 characters long.",
    },
    maxLength: {
      value: 64,
      errorMessage: "cannot exceed 50 characters.",
    },
    uppercase: {
      required: true,
      errorMessage: "must contain at least one uppercase letter.",
    },
    lowercase: {
      required: true,
      errorMessage: "must contain at least one lowercase letter.",
    },
    number: {
      required: true,
      errorMessage: "must contain at least one numeric digit.",
    },
    specialCharacter: {
      required: true,
      errorMessage: "must contain at least one special character.",
    },
    alphabetic: {
      required: false,
      errorMessage: "may not contain alphabetic characters.",
    },
    whitespace: {
      required: true,
      errorMessage: "Whitespace is not allowed in the password.",
    },
  },

  // Default options for username validation
  username: {
    minLength: {
      value: 4,
      errorMessage: "must be at least 4 characters long.",
    },
    maxLength: {
      value: 20,
      errorMessage: "cannot exceed 20 characters.",
    },
    uppercase: {
      required: false,
      errorMessage: "Uppercase letters are not allowed in the username.",
    },
    number: {
      required: false,
      errorMessage: "Numeric digits are not allowed in the username.",
    },
    nonAlphanumeric: {
      required: false,
      errorMessage:
        "Non-alphanumeric characters are not allowed in the username.",
    },
    trim: {
      required: true,
      errorMessage:
        "Leading or trailing whitespace is not allowed in the username.",
    },
    repeat: {
      required: true,
      errorMessage: "Consecutive characters are not allowed in the username.",
    },
  },
};
/**
 * Sets the configuration options for password validation.
 *
 * @function
 * @param {Object} option - Options object for customizing password validation criteria.
 * @param {Object} option.minLength - Minimum length requirements for the password.
 * @param {(number|string)} option.minLength.value - The minimum length value. If not provided, it defaults to the value from the validation constants.
 * @param {string} option.minLength.errorMessage - Error message for minimum length validation failure.
 * @param {Object} option.maxLength - Maximum length requirements for the password.
 * @param {(number|string)} option.maxLength.value - The maximum length value. If not provided, it defaults to the value from the validation constants.
 * @param {string} option.maxLength.errorMessage - Error message for maximum length validation failure.
 * @param {Object} option.uppercase - Uppercase letter requirements for the password.
 * @param {boolean} option.uppercase.required - Whether uppercase letters are required.
 * @param {string} option.uppercase.errorMessage - Error message for uppercase letter validation failure.
 * @param {Object} option.lowercase - Lowercase letter requirements for the password.
 * @param {boolean} option.lowercase.required - Whether lowercase letters are required.
 * @param {string} option.lowercase.errorMessage - Error message for lowercase letter validation failure.
 * @param {Object} option.number - Numeric digit requirements for the password.
 * @param {boolean} option.number.required - Whether numeric digits are required.
 * @param {string} option.number.errorMessage - Error message for numeric digit validation failure.
 * @param {Object} option.specialCharacter - Special character requirements for the password.
 * @param {boolean} option.specialCharacter.required - Whether special characters are required.
 * @param {string} option.specialCharacter.errorMessage - Error message for special character validation failure.
 * @param {Object} option.alphabetic - Alphabetic character requirements for the password.
 * @param {boolean} option.alphabetic.required - Whether alphabetic characters are required.
 * @param {string} option.alphabetic.errorMessage - Error message for alphabetic character validation failure.
 * @param {Object} option.whitespace - Whitespace requirements for the password.
 * @param {boolean} option.whitespace.required - Whether whitespace is not allowed.
 * @param {string} option.whitespace.errorMessage - Error message for whitespace validation failure.
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
 * @param {string} option.minLength.errorMessage - Error message for minimum length validation failure.
 * @param {Object} option.maxLength - Maximum length requirements for the username.
 * @param {(number|string)} option.maxLength.value - The maximum length value. If not provided, it defaults to the value from the validation constants.
 * @param {string} option.maxLength.errorMessage - Error message for maximum length validation failure.
 * @param {Object} option.uppercase - Uppercase letter requirements for the username.
 * @param {boolean} option.uppercase.required - Whether uppercase letters are required.
 * @param {string} option.uppercase.errorMessage - Error message for uppercase letter validation failure.
 * @param {Object} option.number - Numeric digit requirements for the username.
 * @param {boolean} option.number.required - Whether numeric digits are required.
 * @param {string} option.number.errorMessage - Error message for numeric digit validation failure.
 * @param {Object} option.nonAlphanumeric - Non-alphanumeric character requirements for the username.
 * @param {boolean} option.nonAlphanumeric.required - Whether non-alphanumeric characters are required.
 * @param {string} option.nonAlphanumeric.errorMessage - Error message for non-alphanumeric character validation failure.
 * @param {Object} option.trim - Whitespace requirements for the username.
 * @param {boolean} option.trim.required - Whether leading or trailing whitespaces are disallowed.
 * @param {string} option.trim.errorMessage - Error message for whitespace validation failure.
 * @param {Object} option.repeat - Consecutive character requirements for the username.
 * @param {boolean} option.repeat.required - Whether consecutive characters are disallowed.
 * @param {string} option.repeat.errorMessage - Error message for consecutive character validation failure.
 */
function setUsernameConfig(option) {
  defaultOptions = { ...defaultOptions, ...option };
}

// Export default options and configuration function
module.exports = {
  defaultOptions,
  setPasswordConfig,
  setUsernameConfig,
};
