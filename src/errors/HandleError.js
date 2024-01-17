/**
 * Custom error class for validation-related errors.
 * @class
 * @extends Error
 * @param {string} property - The property or field associated with the validation error.
 * @param {string} message - The error message describing the validation failure.
 */
class CustomError extends Error {
  constructor(property, message) {
    super(message);
    this.property = property;
  }
}
/**
 * Specific error class for validation errors.
 * @class
 * @extends CustomError
 */
class ValidationError extends CustomError {}

/**
 * Specific error class for type errors.
 * @class
 * @extends CustomError
 */
class TypeError extends CustomError {}

/**
 * Specific error class for length-related errors.
 * @class
 * @extends CustomError
 */
class LengthError extends CustomError {}

/**
 * Specific error class for type errors.
 * @class
 * @extends CustomError
 */
/**
 * Throws a validation error if the specified property is truthy.
 * @param {any} property - The property or condition to be validated.
 * @param {string} message - The error message to be associated with the validation failure.
 * @returns {any} - Returns the input property if it is falsy.
 * @throws {ValidationError} - Throws a validation error with the specified property and message if validation fails.
 * @example
 * try {
 *   ValidationError('', 'Value should not be empty');
 * } catch (error) {
 *   console.error(error.name); // 'ValidationError'
 *   console.error(error.message); // 'Value should not be empty'
 * }
 */
exports.ifFalsyValue = (property, message) => {
  if (!property) {
    throw new ValidationError(property, message);
  }
  return property;
};
/**
 * Throws a validation error if the specified property is truthy.
 *
 * This function checks if the provided property is truthy, and if so,
 * it throws a validation error with the specified property and message.
 * Otherwise, it returns the input property.
 *
 * @param {any} property - The property or condition to be validated.
 * @param {string} message - The error message to be associated with the validation failure.
 * @returns {any} - Returns the input property if it is falsy.
 * @throws {ValidationError} - Throws a validation error with the specified property and message if validation fails.
 *
 * @example
 * try {
 *   IfTruthy('Some Value', 'Value should be empty');
 * } catch (error) {
 *   console.error(error.name); // 'ValidationError'
 *   console.error(error.message); // 'Value should be empty'
 * }
 *
 * @example
 * try {
 *   IfTruthy('', 'This should not throw an error');
 * } catch (error) {
 *   // Will not reach here if validation fails
 * }
 */
exports.ifTruthyValue = (property, message) => {
  if (property) {
    throw new ValidationError(property, message);
  }
  return property;
};
exports.validateIfBothTruthy  = (property, method , message)=>{
  if (property) {
    if (method) {
      this.ifTruthyValue(property, message);
    }
  }
  return true
}
/**
 * Throws a type error if the type of the specified property is not as expected.
 * @param {string} type - The expected type of the property.
 * @param {any} property - The property to be validated for its type.
 * @param {string} message - The error message to be associated with the type validation failure.
 * @throws {TypeError} - Throws a type error with the specified property and message if type validation fails.
 * @example
 * try {
 *   wrongType('string', 42, 'Value should be a string');
 * } catch (error) {
 *   console.error(error.name); // 'TypeError'
 *   console.error(error.message); // 'Value should be a string'
 * }
 */
exports.IfNotType = (type, property, message) => {
  if (typeof property !== type) {
    throw new TypeError(property, message);
  }
};

exports.isTypeMismatch = (type, property) => {
  if (typeof property !== type) {
    return;
  }
};
exports.throwErrorMinMatch = (messageError) => {
  throw TypeError(messageError);
};
exports.IfTypeMatches = (type, property, message) => {
  if (typeof property === type) {
    throw new TypeError(property, message);
  }
};
/**
 * Validates the length of a value within the specified range.
 *
 * This function checks if the length of the provided value is within the specified range,
 * and if not, it throws an error with the specified message.
 *
 * @param {string} value - The value to be validated.
 * @param {number} minLength - The minimum allowed length.
 * @param {number} maxLength - The maximum allowed length.
 * @param {string} [message] - The error message to be associated with the length validation failure.
 * @throws {Error} - Throws an error with the specified message if length validation fails.
 *
 * @example
 * try {
 *   validateLength('abc', 2, 5, 'Length should be between 2 and 5 characters.');
 * } catch (error) {
 *   console.error(error.message); // 'Length should be between 2 and 5 characters.'
 * }
 */
exports.validateLength = (value, minLength, maxLength, message) => {
  const length = value.length;
  if (length < minLength || length > maxLength) {
    throw new LengthError(
      message ||
        `Length must be between ${minLength} and ${maxLength} characters.`
    );
  }
};
/**
 * Validates the length and type of a property.
 *
 * This function combines type validation and length validation for a given property.
 * If the type or length validation fails, it throws an error with the specified message.
 *
 * @param {any} property - The property to be validated.
 * @param {number} minLength - The minimum allowed length.
 * @param {number} maxLength - The maximum allowed length.
 * @param {string} minLengthType - The expected type for minLength.
 * @param {string} maxLengthType - The expected type for maxLength.
 * @param {string} message - The error message to be associated with the validation failure.
 * @throws {TypeError|LengthError} - Throws a TypeError or LengthError with the specified message if type or length validation fails.
 *
 * @example
 * try {
 *   validatePropertyLengthAndType('abc', 2, 5, 'number', 'number', 'Invalid value');
 * } catch (error) {
 *   console.error(error.name); // 'TypeError' or 'LengthError'
 *   console.error(error.message); // 'Invalid value' or 'Length must be between 2 and 5 characters.'
 * }
 */
exports.validatePropertyLengthAndType = (
  minLength,
  maxLength,
  minLengthType,
  maxLengthType,
  property,
  message
) => {
  this.IfTypeMatches(minLengthType, property, message);
  this.IfTypeMatches(maxLengthType, property, message);
  this.validateLength(property, minLength, maxLength, message);
};
