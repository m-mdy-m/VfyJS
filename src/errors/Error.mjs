/**
 * Represents a generic custom error.
 * @class CustomError
 * @extends Error
 */
class CustomError extends Error {
    /**
     * Creates an instance of CustomError.
     * @param {string} message - The error message.
     * @param {*} [details] - Additional details about the error.
     */
    constructor(message, details) {
      super(message);
      this.name = this.constructor.name;
      this.details = details;
      this.timestamp = new Date();
    }
  
    /**
     * Formats the error message.
     * @returns {string} The formatted error message.
     */
    formatErrorMessage() {
      return `${this.name}: ${this.message}` + (this.details ? ` (${this.details})` : '');
    }
  }
  
  /**
   * Represents a validation error.
   * @class ValidationError
   * @extends CustomError
   */
  class ValidationError extends CustomError {
    /**
     * Creates an instance of ValidationError.
     * @param {string} message - The error message.
     * @param {string} property - The name of the property being validated.
     * @param {*} value - The value causing the validation error.
     * @param {string} fieldType - The type of the field causing the validation error.
     */
    constructor(message, property, value, fieldType) {
      super(message, { property, value, fieldType });
    }
  }
  
  // Custom error classes for specific error types
  class TypeError extends ValidationError {}
  class BooleanError extends ValidationError {}
  class LengthError extends ValidationError {}
  
export function throwFalsy(message, property, value) {
  if (!value) {
    throw new BooleanError(message || 'Value cannot be falsy', property, value, typeof value);
  }
  return value;
}

export function throwTruthy(message, property, value) {
  if (value) {
    throw new BooleanError(message || 'Value must be falsy', property, value, typeof value);
  }
  return value;
}