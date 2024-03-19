const Validator = require("../Validator");

/**
 * UppercaseValidator class for validating if a field contains at least one uppercase letter.
 * @extends Validator
 */
class UppercaseValidator extends Validator {
  /**
   * Validates if the specified field contains at least one uppercase letter.
   * @param {string} field - The name of the field to validate.
   * @param {any} ruleValue - The value of the validation rule (not used in this validator).
   * @param {Object} body - The request body object containing the field to validate.
   * @returns {string|null} - Returns a validation error message if the field does not contain at least one uppercase letter, otherwise returns null.
   */
  validate(field, ruleValue, body) {
    if (!this.isUppercase(body[field])) {
      return `${field} must contain at least one uppercase letter.`;
    }
    return null;
  }
}

/**
 * LowercaseValidator class for validating if a field contains at least one lowercase letter.
 * @extends Validator
 */
class LowercaseValidator extends Validator {
  /**
   * Validates if the specified field contains at least one lowercase letter.
   * @param {string} field - The name of the field to validate.
   * @param {any} ruleValue - The value of the validation rule (not used in this validator).
   * @param {Object} body - The request body object containing the field to validate.
   * @returns {string|null} - Returns a validation error message if the field does not contain at least one lowercase letter, otherwise returns null.
   */
  validate(field, ruleValue, body) {
    if (!this.isLowerCase(body[field])) {
      return `${field} must contain at least one lowercase letter.`;
    }
    return null;
  }
}

module.exports = { LowercaseValidator, UppercaseValidator };
