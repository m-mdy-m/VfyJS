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
  static formatMessage =
    `${this.name}: ${this.message}` +
    (this.details ? ` (${this.details})` : "");
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

// Function to throw an error if the value is falsy
exports.ThrowFalsy = (property, message) => {
  if (!property) {
    throw new BooleanError(
      message || "Value cannot be falsy",
      property,
      "Falsy"
    );
  }
  return property;
};

// Function to throw an error if the value is truthy
exports.ThrowTruthy = (property, message) => {
  if (property) {
    throw new BooleanError(
      message || "Value must be falsy",
      property,
      "Truthy"
    );
  }
  return property;
};

// Function to throw an error if the type of the property does not match the expected type
exports.NotType = (property, expectedType, message) => {
  if (typeof property !== expectedType) {
    throw new TypeError(message, property, "Type Not Match");
  }
};

// Function to throw an error if the type of the property matches the expected type
exports.TypeMatches = (property, expectedType, message) => {
  if (typeof property === expectedType) {
    throw new TypeError(message, property, "Match Type");
  }
};

// Function to validate length range of a property
exports.validateLengthRange = (property, min, max, message) => {
  const length =
    typeof property === "string" ? property.length : `${property}`.length;
  if (length < min || length > max) {
    throw new LengthError(message, property, "Length");
  }
};

// Function to validate minimum length of a property
exports.validateMinLength = (property, min, message) => {
  const length =
    typeof property === "string" ? property.length : `${property}`.length;
  if (property < min) {
    throw new LengthError(message, property, "Length");
  }
};

// Function to validate maximum length of a property
exports.validateMaxLength = (property, max, message) => {
  const length =
    typeof property === "string" ? property.length : `${property}`.length;
  if (property < max) {
    throw new LengthError(message, property, "Length");
  }
};

// Function to check if a value is empty
exports.isEmpty = (value, message = "Value should not be empty") => {
  if (value === null || value === undefined || value === "" || value === 0) {
    throw new ValidationError(message, value, "Empty");
  }
  return value;
};

// Function to validate length range with custom options
exports.validationsLength = (value, options) => {
  const length = typeof value === "string" ? value.length : `${value}`.length;
  if (options.min && length < options.min) {
    throw new LengthError(
      options.minError || `Length must be at least ${options.min} characters.`,
      value,
      "Length"
    );
  }

  if (options.max && length > options.max) {
    throw new LengthError(
      options.maxError || `Length must be at most ${options.max} characters.`,
      value,
      "Length"
    );
  }
};

// Function to check if property type matches any of the specified types
exports.TypesCheck = (
  property,
  types,
  message = `${property} is not of type ${types.join(" or ")}`
) => {
  if (!types.includes(typeof property)) {
    throw new TypeError(message, property, "Type");
  }
};
