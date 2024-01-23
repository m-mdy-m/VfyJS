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
 * Throws a validation error if the specified property is truthy.
 *
 * @param {any} property - The property or condition to be validated.
 * @param {string} message - The error message for the validation failure.
 * @returns {any} - Returns the input property if it is falsy.
 * @throws {ValidationError} - Throws a validation error with the specified property and message if validation fails.
 *
 * @example
 * // Example: Throw error if value is empty
 * try {
 *   ifFalsyValue('', 'Value should not be empty');
 * } catch (error) {
 *   console.error(error.name); // 'ValidationError'
 *   console.error(error.message); // 'Value should not be empty'
 * }
 */
exports.ifFalsyValue = (property, message) => {
  if (!property) {
    throw new ValidationError(property, message || 'Invalid value');
  }
  return property;
};
/**
 * Validates if the provided property is truthy.
 *
 * @param {any} property - The property to be validated.
 * @param {string} message - The error message for the validation failure.
 * @throws {ValidationError} - Throws a validation error with the specified property and message if validation fails.
 * @returns {boolean} - Returns true if the property is falsy.
 *
 * @example
 * // Example: Throw error if value is truthy
 * try {
 *   ifTruthyValue('Some Value', 'Invalid value');
 * } catch (error) {
 *   console.error(error.name); // 'ValidationError'
 *   console.error(error.message); // 'Invalid value'
 * }
 */
exports.ifTruthyValue = (property, message) => {
  if (property) {
    throw new ValidationError(property, message || 'Invalid value');
  }
  return property;
};
/**
 * Validates if both the provided property and method are truthy.
 *
 * @param {any} property - The property to be validated.
 * @param {any} method - The method or condition to be validated.
 * @param {string} message - The error message to be associated with the validation failure.
 * @throws {ValidationError} - Throws a validation error with the specified property and message if validation fails.
 * 
 * @example
 * // Example: Validate if password has at least one number and is not empty
 * const userPassword = 'Secret123';
 * try {
 *   validateIfBothTruthy(
 *     userPassword, 
 *     userPassword && /\d/.test(userPassword), 
 *     'Invalid password. It must contain at least one number and should not be empty.'
 *   );
 *   console.log('Password is valid.');
 * } catch (error) {
 *   console.error(error.name); // 'ValidationError'
 *   console.error(error.message); // 'Invalid password. It must contain at least one number and should not be empty.'
 * }
 */
exports.validateIfBothTruthy = (property, method, message) => {
  if (property) {
    if (method) {
      this.ifTruthyValue(property, message || 'Invalid Input');
    }
  }
};
/**
 * Throws a type error if the type of the specified property is not as expected.
 *
 * @param {string} expectedType - The expected type of the property.
 * @param {any} property - The property to be validated for its type.
 * @param {string} message - The error message to be associated with the type validation failure.
 * @throws {TypeError} - Throws a type error with the specified property and message if type validation fails.
 * 
 * @example
 * // Example: Validate if the age is a number
 * const userAge = '25'; // Note: '25' is a string, not a number
 * try {
 *   IfNotType('number', userAge, 'Age should be a number');
 *   console.log('Age is valid.');
 * } catch (error) {
 *   console.error(error.name); // 'TypeError'
 *   console.error(error.message); // 'Age should be a number'
 * }
 */
exports.IfNotType = (expectedType, property, message) => {
  if (typeof property !== expectedType) {
    throw new TypeError(property, message || `Property should be of type ${expectedType}`);
  }
};
/**
 * Checks if the type of the specified property mismatches the expected type.
 *
 * @param {string} type - The expected type of the property.
 * @param {any} property - The property to be validated for its type.
 * @returns {undefined} - Returns undefined if type matches, indicating a mismatch.
 * @example
 * if (isTypeMismatch('undefined', someProperty)) {
 *   // Handle the type mismatch
 * }
 */
exports.isTypeMismatch = (expectedType, property) => {
  return typeof property !== expectedType;
};
/**
 * Throws a type error if the type of the specified property matches the expected type.
 *
 * This function is used to throw a type error if the type of the provided property matches the expected type.
 *
 * @param {string} expectedType - The expected type of the property.
 * @param {any} property - The property to be validated for its type.
 * @param {string} message - The error message to be associated with the type validation failure.
 * @throws {TypeError} - Throws a type error with the specified property and message if type validation fails.
 *
 * @example
 * // Example: Throw error if value is not a string
 * try {
 *   IfTypeMatches('string', 42, 'Value should be a string');
 * } catch (error) {
 *   console.error(error.name); // 'TypeError'
 *   console.error(error.message); // 'Value should be a string'
 * }
 */
exports.IfTypeMatches = (expectedType, property, message) => {
  if (typeof property === expectedType) {
    throw new TypeError(property, message || `Value should be of type ${expectedType}`);
  }
};

/**
 * Throws a type error if the specified property is a valid number (not NaN).
 *
 * This function checks if the provided property is a valid number (not NaN),
 * and if so, it throws a type error with the specified property and message.
 *
 * @param {any} property - The property to be validated for not being a valid number.
 * @param {string} message - The error message to be associated with the type validation failure.
 * @throws {TypeError} - Throws a type error with the specified property and message if the property is a valid number.
 *
 * @example
 * // Example: Throw error if value is a number
 * const value = 42;
 * try {
 *   IfIsNumber(value, 'Value should not be a number');
 * } catch (error) {
 *   console.error(error.name); // 'TypeError'
 *   console.error(error.message); // 'Value should not be a number'
 * }
 */
exports.IfIsNumber = (property, message) => {
  if (!isNaN(property)) {
    throw new TypeError(property, message || 'Value should not be a number');
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
 * // Example: Validate the length of a string
 * const stringValue = 'abc';
 * try {
 *   validateLength(stringValue, 2, 5, 'Length should be between 2 and 5 characters.');
 *   console.log('Length is valid.');
 * } catch (error) {
 *   console.error(error.message); // 'Length should be between 2 and 5 characters.'
 * }
 */
exports.validateLength = (value, minLength, maxLength, message) => {
  const length = typeof value === 'string' ? value.length : `${value}`.length;
  if (length < minLength || length > maxLength) {
    throw new LengthError(value, message || `Length must be between ${minLength} and ${maxLength || value} characters.`);
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
 * // Example: Validate both type and length of a property
 * const propertyValue = 'abc';
 * try {
 *   validatePropertyLengthAndType(propertyValue, 2, 5, 'number', 'string', 'Invalid value');
 *   console.log('Property is valid.');
 * } catch (error) {
 *   console.error(error.name); // 'TypeError' or 'LengthError'
 *   console.error(error.message); // 'Invalid value' or 'Length must be between 2 and 5 characters.'
 * }
 */
exports.validatePropertyLengthAndType = (minLength,maxLength,minLengthType,maxLengthType,property,message) => {
  this.IfTypeMatches(minLengthType, property, message);
  this.IfTypeMatches(maxLengthType, property, message);
  this.validateLength(property, minLength, maxLength, message);
};
/**
 * Throws a type error if the type of the specified property is not one of the expected types.
 *
 * This function checks if the type of the provided property is not one of the expected types,
 * and if so, it throws a type error with the specified property and message.
 *
 * @param {any} property - The property to be validated for its type.
 * @param {string[]} expectedTypes - An array of expected types.
 * @param {string} [message] - The error message to be associated with the type validation failure.
 * @throws {TypeError} - Throws a type error with the specified property and message if type validation fails.
 *
 * @example
 * // Example: Throw error if value is not a number or a string
 * const value = '42';
 * try {
 *   TypesCheck(value, ['number', 'string'], 'Value should be a number or a string');
 * } catch (error) {
 *   console.error(error.name); // 'TypeError'
 *   console.error(error.message); // 'Value should be a number or a string'
 * }
 */
exports.TypesCheck = (property, types, message) => {
  if (!types.includes(typeof property)) {
    throw new TypeError(property, message || `${property} is not of type ${types.join(' or ')}`);
  }
};
/**
 * Checks if a value is empty and throws an error if it is.
 *
 * This function checks if the provided value is empty (falsy), and if so,
 * it throws an error with the specified message. Otherwise, it returns the input value.
 *
 * @param {any} value - The value to be checked for emptiness.
 * @param {string} [message='Value should not be empty'] - The error message to be associated with the emptiness check failure.
 * @throws {Error} - Throws an error with the specified message if the value is empty.
 * @returns {any} - Returns the input value if it is not empty.
 * 
 * @example
 * try {
 *   isEmpty('someValue', 'The value must not be empty');
 * } catch (error) {
 *   console.error(error.name); // 'Error'
 *   console.error(error.message); // 'The value must not be empty'
 * }
 */
exports.isEmpty = (value, message = 'Value should not be empty') => {
  if (value === null || value === undefined || value === "" || value === 0) {
    throw new ValidationError(value, message);
  }
  return value;
};