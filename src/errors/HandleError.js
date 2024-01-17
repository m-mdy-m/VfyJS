/**
 * Custom error class for validation-related errors.
 * @class
 * @extends Error
 * @param {string} property - The property or field associated with the validation error.
 * @param {string} message - The error message describing the validation failure.
 */
class CustomError extends Error{
  constructor(property ,message){
    super(message)
    this.property = property
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
exports.ifFalsyValue  = (property, message) => {
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
exports.ifTruthyValue  =  (property, message) =>{
  if (property) {
    throw new ValidationError(property, message);
  }
  return property;
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
exports.ifWrongType = (type , property , message)=>{
  if(typeof property !== type){
    throw new TypeError (property,message)
  }
}
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
exports.validateLength  = (value, minLength, maxLength, message) =>{
  const length = value.length
  if (length < minLength || length > maxLength) {
    throw new LengthError(message || `Length must be between ${minLength} and ${maxLength} characters.`);
  }
}