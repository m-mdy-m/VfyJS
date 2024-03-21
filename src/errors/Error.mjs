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
  constructor(message, property, fieldType) {
    super(message, { property, fieldType });
  }
}

// Custom error classes for specific error types
class TypeError extends ValidationError {}
class BooleanError extends ValidationError {}
class LengthError extends ValidationError {}
  
export function ThrowFalsy(message, property) {
  if (!property) {
    throw new BooleanError(message || 'Value cannot be falsy', property, 'Falsy');
  }
}

export function ThrowTruthy(message, property) {
  if (property) {
    throw new BooleanError(message || 'Value must be falsy', property,"Truthy");
  }
}
export function NotType(message,expectedType,property){
    if (typeof property !== expectedType) {
        throw new TypeError(message,property,'Type Not Match')
    }
}
export function TypeMatches(message,expectedType,property){
    if (typeof property === expectedType) {
        throw new TypeError (message,property,'Match Type')
    }
}

export function CheckLengths(message,min,max,property){
    const length = typeof property === 'string' ? property.length : `${property}`.length;
    if (length < min || length > max) {
        throw new LengthError(message,property,'Length');
      }
}
export function MinCheck(message,min,property){
    const length = typeof property === 'string' ? property.length : `${property}`.length;
    if (property < min) {
        throw new LengthError(message,property,'Length')
    }
}
export function MaxCheck(message,max,property){
    const length = typeof property === 'string' ? property.length : `${property}`.length;
    if (property < max) {
        throw new LengthError(message,property,'Length')
    }
}
export function isEmpty(value, message = 'Value should not be empty'){
    if (value === null || value === undefined || value === "" || value === 0) {
      throw new ValidationError(message,value,'Empty');
    }
    return value;
};
export function validateDate(dateString) {
    const isValidDate = !isNaN(Date.parse(dateString));
    if (!isValidDate) {
        throw new ValidationError('Invalid date format', dateString, 'Date');
    }
    return dateString;
}