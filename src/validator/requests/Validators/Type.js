const Validator = require("../Validator");
/**
 * Validator subclass for validating string types.
 * @extends Validator
 */
class StringTypeValidator extends Validator {
  /**
   * Validates if the specified field value is a string.
   * @param {string} field - The field name to validate.
   * @param {string} ruleValue - The expected rule value (not used in this validator).
   * @param {object} body - The object containing the field to validate.
   * @returns {string|null} - Returns an error message if validation fails, otherwise null.
   */
  validate(field, ruleValue, body) {
    if (typeof body[field] !== "string") {
      return `${field} must be a string.`;
    }
    return null;
  }
}

/**
 * Validator subclass for validating number types.
 * @extends Validator
 */
class NumberTypeValidator extends Validator {
  /**
   * Validates if the specified field value is a number.
   * @param {string} field - The field name to validate.
   * @param {string} ruleValue - The expected rule value (not used in this validator).
   * @param {object} body - The object containing the field to validate.
   * @returns {string|null} - Returns an error message if validation fails, otherwise null.
   */
  validate(field, ruleValue, body) {
    console.log('body.body[field]=>',body.body[field]);
    if (typeof body.body[field] !== "number") {
      return `${field} must be a number.`;
    }
    return null;
  }
}

/**
 * Validator subclass for validating boolean types.
 * @extends Validator
 */
class BooleanTypeValidator extends Validator {
  /**
   * Validates if the specified field value is a boolean.
   * @param {string} field - The field name to validate.
   * @param {string} ruleValue - The expected rule value (not used in this validator).
   * @param {object} body - The object containing the field to validate.
   * @returns {string|null} - Returns an error message if validation fails, otherwise null.
   */
  validate(field, ruleValue, body) {
    if (typeof body[field] !== "boolean") {
      return `${field} must be a boolean.`;
    }
    if (body[field] !== true && body[field] !== false) {
      return `${field} must be either true or false.`;
    }
    return null;
  }
}

/**
 * Validator subclass for validating object types.
 * @extends Validator
 */
class ObjectTypeValidator extends Validator {
  /**
   * Validates if the specified field value is an object.
   * @param {string} field - The field name to validate.
   * @param {string} ruleValue - The expected rule value (not used in this validator).
   * @param {object} body - The object containing the field to validate.
   * @returns {string|null} - Returns an error message if validation fails, otherwise null.
   */
  validate(field, ruleValue, body) {
    if (
      typeof body[field] !== "object" ||
      body[field] === null ||
      Array.isArray(body[field])
    ) {
      return `${field} must be an object.`;
    }
    return null;
  }
}

/**
 * Validator subclass for validating array types.
 * @extends Validator
 */
class ArrayTypeValidator extends Validator {
  /**
   * Validates if the specified field value is an array.
   * @param {string} field - The field name to validate.
   * @param {string} ruleValue - The expected rule value (not used in this validator).
   * @param {object} body - The object containing the field to validate.
   * @returns {string|null} - Returns an error message if validation fails, otherwise null.
   */
  validate(field, ruleValue, body) {
    if (!Array.isArray(body[field])) {
      return `${field} must be an array.`;
    }
    return null;
  }
}

/**
 * Validator subclass for validating function types.
 * @extends Validator
 */
class FunctionTypeValidator extends Validator {
  /**
   * Validates if the specified field value is a function.
   * @param {string} field - The field name to validate.
   * @param {string} ruleValue - The expected rule value (not used in this validator).
   * @param {object} body - The object containing the field to validate.
   * @returns {string|null} - Returns an error message if validation fails, otherwise null.
   */
  validate(field, ruleValue, body) {
    if (typeof body[field] !== "function") {
      return `${field} must be a function.`;
    }
    return null;
  }
}

module.exports = {
  StringTypeValidator,
  NumberTypeValidator,
  BooleanTypeValidator,
  ObjectTypeValidator,
  ArrayTypeValidator,
  FunctionTypeValidator,
};
