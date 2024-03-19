const checkValueColor = require("../../colors/isColor");
const validateFormPassword = require("../../form/password");
const validateUsername = require("../../form/username");
const { isName } = require("../../form/utils");
const Validator = require("../Validator");
/**
 * Validator for validating password fields.
 * @extends Validator
 */
class PasswordValidator extends Validator {
  /**
   * Validates a password field based on specified options.
   * @param {string} field - The name of the password field.
   * @param {string} ruleValue - The rule value associated with the password validation.
   * @param {Object} body - The request body object containing the password field.
   * @param {Object} [options={}] - Additional options for password validation.
   * @returns {string|null} - A validation error message if validation fails, otherwise null.
   */
  validate(field, ruleValue, body, options = {}) {
    try {
      validateFormPassword(body[field], options);
      return null;
    } catch (error) {
      return error.message;
    }
  }
}

/**
 * Validator for validating username fields.
 * @extends Validator
 */
class UsernameValidator extends Validator {
  /**
   * Validates a username field based on specified options.
   * @param {string} field - The name of the username field.
   * @param {string} ruleValue - The rule value associated with the username validation.
   * @param {Object} body - The request body object containing the username field.
   * @param {Object} [options={}] - Additional options for username validation.
   * @returns {string|null} - A validation error message if validation fails, otherwise null.
   */
  validate(field, ruleValue, body, options) {
    try {
      validateUsername(body[field], options);
      return null;
    } catch (error) {
      return error.message;
    }
  }
}

/**
 * Validator for validating hexadecimal color values.
 * @extends Validator
 */
class HexColorValidator extends Validator {
  /**
   * Validates a hexadecimal color field.
   * @param {string} field - The name of the color field.
   * @param {string} ruleValue - The rule value associated with the color validation.
   * @param {Object} body - The request body object containing the color field.
   * @returns {string|null} - A validation error message if validation fails, otherwise null.
   */
  validate(field, ruleValue, body) {
    try {
      checkValueColor(body[field]);
      return null;
    } catch (error) {
      return error.message;
    }
  }
}

/**
 * Validator for validating IP location fields.
 * @extends Validator
 */
class IPLocationValidator extends Validator {
  /**
   * Validates an IP location field.
   * @param {string} field - The name of the IP location field.
   * @param {string} ruleValue - The rule value associated with the IP location validation.
   * @param {Object} body - The request body object containing the IP location field.
   * @returns {string|null} - A validation error message if validation fails, otherwise null.
   */
  validate(field, ruleValue, body) {
    const ipAddress = body[field];
    if (!ipAddress) {
      return `${field} is required.`;
    }

    // Regular expression pattern for IPv4 and IPv6 addresses
    const ipPattern =
      /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$|^([0-9a-fA-F]{1,4}:){7}([0-9a-fA-F]{1,4})$/;

    // Check if the provided IP address matches the pattern
    if (!ipPattern.test(ipAddress)) {
      return `Invalid format for ${field}. Please provide a valid IP address.`;
    }

    // If the IP address format is valid, return null (indicating no validation errors)
    return null;
  }
}
/**
 * Validator for validating JSON fields.
 * @extends Validator
 */
class JSONValidator extends Validator {
  /**
   * Validates a JSON field.
   * @param {string} field - The name of the JSON field.
   * @param {string} ruleValue - The rule value associated with the JSON validation.
   * @param {Object} body - The request body object containing the JSON field.
   * @returns {string|null} - A validation error message if validation fails, otherwise null.
   */
  validate(field, ruleValue, body) {
    const jsonData = body[field];
    if (!jsonData) {
      return `${field} is required.`;
    }
    // Implement JSON validation logic here
    // Example: Check if jsonData is a valid JSON object
    try {
      JSON.parse(jsonData);
      return null; // JSON is valid
    } catch (error) {
      return `${field} must be a valid JSON object.`;
    }
  }
}
/**
 * Validator for validating names.
 * @extends Validator
 */
class NameValidator extends Validator {
  /**
   * Validates a name field.
   * @param {string} field - The name of the field to validate.
   * @param {string} ruleValue - The rule value associated with the name validation.
   * @param {Object} body - The request body object containing the name field.
   * @returns {string|null} - A validation error message if validation fails, otherwise null.
   */
  validate(field, ruleValue, body) {
    const value = body[field];
    const validationResults = isName(value);
    if (!validationResults.isValid) {
      return `${field} must be a valid name.`;
    }
    return null;
  }
}
/**
 * Validator for validating alphanumeric strings.
 * @extends Validator
 */
class AlphanumericValidator extends Validator {
  /**
   * Validates an alphanumeric field.
   * @param {string} field - The name of the field to validate.
   * @param {string} ruleValue - The rule value associated with the alphanumeric validation.
   * @param {Object} body - The request body object containing the alphanumeric field.
   * @returns {string|null} - A validation error message if validation fails, otherwise null.
   */
  validate(field, ruleValue, body) {
    const value = body[field];
    if (typeof value !== "string") {
      return `${field} must be a string containing alphanumeric characters only.`;
    }

    // Example: Validate if value contains only alphanumeric characters
    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    if (!alphanumericRegex.test(value)) {
      return `${field} must contain only alphanumeric characters.`;
    }

    return null;
  }
}


/**
 * Validator for validating language codes.
 * @extends Validator
 */
class LanguageValidator extends Validator {
  /**
   * Validates a language code field.
   * @param {string} field - The name of the field to validate.
   * @param {string} ruleValue - The rule value associated with the language code validation.
   * @param {Object} body - The request body object containing the language code field.
   * @returns {string|null} - A validation error message if validation fails, otherwise null.
   */
  validate(field, ruleValue, body) {
    const languageCode = body[field];
    if (typeof languageCode !== "string") {
      return `${field} must be a string representing a language code.`;
    }
    if (languageCode.length !== 2 && languageCode.length !== 3) {
      return `${field} must consist of either 2 or 3 characters.`;
    }
    return null;
  }
}

/**
 * Validator for validating gender values.
 * @extends Validator
 */
class GenderValidator extends Validator {
  /**
   * Validates a gender field.
   * @param {string} field - The name of the field to validate.
   * @param {string} ruleValue - The rule value associated with the gender validation.
   * @param {Object} body - The request body object containing the gender field.
   * @returns {string|null} - A validation error message if validation fails, otherwise null.
   */
  validate(field, ruleValue, body) {
    const gender = body[field];

    if (typeof gender !== "string") {
      return `${field} must be a string representing gender.`;
    }

    // Assuming gender must be one of these values: 'male', 'female'
    const validGenders = ["male", "female"];

    if (!validGenders.includes(gender.toLowerCase())) {
      return `${field} must be one of the following values: ${validGenders.join(
        ", "
      )}.`;
    }

    return null; // Indicates no validation error
  }
}

/**
 * Validator for validating age values.
 * @extends Validator
 */
class AgeValidator extends Validator {
  /**
   * Validates an age field.
   * @param {string} field - The name of the field to validate.
   * @param {string} ruleValue - The rule value associated with the age validation.
   * @param {Object} body - The request body object containing the age field.
   * @param {Object} [options={}] - Additional options for validation.
   * @returns {string|null} - A validation error message if validation fails, otherwise null.
   */
  validate(field, ruleValue, body, options = {}) {
    const age = body[field];
    if (typeof age !== "number" || isNaN(age)) {
      return `${field} must be a valid number representing age.`;
    }

    const minAge = options.min || 0;
    const maxAge = options.max || Number.POSITIVE_INFINITY;

    if (age < minAge || age > maxAge) {
      return `${field} must be between ${minAge} and ${maxAge} years old.`;
    }

    return null; // Indicates no validation error
  }
}

/**
 * Validator for ensuring that two fields have the same value.
 * @extends Validator
 */
class SameValidator extends Validator {
  /**
   * Validates if the current field matches another field.
   * @param {string} field - The name of the field to validate.
   * @param {string} ruleValue - The name of the other field to compare with.
   * @param {Object} body - The request body object containing the fields to compare.
   * @returns {string|null} - A validation error message if validation fails, otherwise null.
   * @throws {Error} - Throws an error if the specified other field does not exist in the body.
   */
  validate(field, ruleValue, body) {
    const otherField = ruleValue.trim();

    // Check if the other field exists in the body
    if (!(otherField in body)) {
      throw new Error(
        `Validation rule error: Field '${otherField}' specified in 'same' rule does not exist in the request body.`
      );
    }

    // Compare the values of the current field and the other field
    if (body[field] !== body[otherField]) {
      return `${field} must match ${otherField}.`;
    }

    return null; // Return null if validation passes
  }
}
module.exports = {
  PasswordValidator,
  UsernameValidator,
  HexColorValidator,
  IPLocationValidator,
  JSONValidator,
  NameValidator,
  AlphanumericValidator,
  LanguageValidator,
  GenderValidator,
  AgeValidator,
  SameValidator,
};
