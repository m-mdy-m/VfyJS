const Validator = require("../Validator");

/**
 * ObjectKeyValidator class for validating the presence of specific keys in an object field.
 * @extends Validator
 */
class ObjectKeyValidator extends Validator {
  /**
   * Validates the presence of specific keys in the specified object field.
   * @param {string} field - The name of the field to validate.
   * @param {string} ruleValue - A comma-separated string of keys expected to be present in the object field.
   * @param {Object} body - The request body object containing the field to validate.
   * @returns {string|null} - Returns a validation error message if any expected keys are missing, otherwise returns null.
   */
  validate(field, ruleValue, body) {
    try {
      // Ensure that the field exists in the body
      if (!body.hasOwnProperty(field)) {
        throw new Error(`Field '${field}' does not exist in the body.`);
      }

      const expectedKeys = ruleValue.split(",");
      const actualKeys = Object.keys(body[field]);

      // Find missing keys
      const missingKeys = expectedKeys.filter(
        (key) => !actualKeys.includes(key)
      );

      // If missing keys are found, return an error message
      if (missingKeys.length > 0) {
        return `Missing keys in '${field}': ${missingKeys.join(", ")}.`;
      }

      return null; // Return null if all keys are present
    } catch (error) {
      // Handle exceptions gracefully
      return error.message; // Return error message if an exception occurs
    }
  }
}

module.exports = { ObjectKeyValidator };
