/**
 * Custom error class for validation-related errors.
 * @class
 * @extends Error
 * @param {string} property - The property or field associated with the validation error.
 * @param {string} message - The error message describing the validation failure.
 */
class ErrorMessage extends Error {
  constructor(property, message) {
    super(message);
    this.property = property;
  }
}

/**
 * Throws a validation error if the specified property is falsy.
 * @param {any} property - The property or condition to be validated.
 * @param {string} message - The error message to be associated with the validation failure.
 * @returns {any} - Returns the input property if it is truthy.
 * @throws {ErrorMessage} - Throws an error with the specified property and message if validation fails.
 */
exports.handleValidationError = (property, message) => {
  if (!property) {
    throw new ErrorMessage(property, message);
  }
  return property;
};
