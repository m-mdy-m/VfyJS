const Validator = require("../Validator");

/**
 * Validator for ensuring that a field's value meets a minimum length requirement.
 * @extends Validator
 */
class MinLengthValidator extends Validator {
  /**
   * Validates the length of the field's value against the specified minimum length.
   * @param {string} field - The name of the field to validate.
   * @param {string} ruleValue - The minimum length required for the field's value.
   * @param {Object} body - The request body object containing the field to validate.
   * @returns {string|null} - A validation error message if the length is less than the specified minimum, otherwise null.
   */
  validate(field, ruleValue, body) {
    if (!body[field]) {
      return `${field} is required.`;
    }

    if (body[field].length < parseInt(ruleValue)) {
      return `${field} must be at least ${ruleValue} characters long.`;
    }

    return null;
  }
}

/**
 * Validator for ensuring that a field's value does not exceed a maximum length.
 * @extends Validator
 */
class MaxLengthValidator extends Validator {
  /**
   * Validates the length of the field's value against the specified maximum length.
   * @param {string} field - The name of the field to validate.
   * @param {string} ruleValue - The maximum length allowed for the field's value.
   * @param {Object} body - The request body object containing the field to validate.
   * @returns {string|null} - A validation error message if the length exceeds the specified maximum, otherwise null.
   */
  validate(field, ruleValue, body) {
    if (!body[field]) {
      return `${field} is required.`;
    }

    if (body[field].length > parseInt(ruleValue)) {
      return `${field} cannot exceed ${ruleValue} characters.`;
    }

    return null;
  }
}

/**
 * Validator for ensuring that a field's value falls within a specified range of lengths.
 * @extends Validator
 */
class LengthRangeValidator extends Validator {
  /**
   * Validates the length of the field's value against the specified range.
   * @param {string} field - The name of the field to validate.
   * @param {string} ruleValue - The range of lengths allowed for the field's value (format: 'minLength,maxLength').
   * @param {Object} body - The request body object containing the field to validate.
   * @returns {string|null} - A validation error message if the length is outside the specified range, otherwise null.
   */
  validate(field, ruleValue, body) {
    const [minLength, maxLength] = ruleValue
      .split(",")
      .map((value) => parseInt(value));

    // Check if ruleValue is valid
    if (isNaN(minLength) || isNaN(maxLength)) {
      throw new Error(
        `Invalid rule value for ${field}. Please provide a valid range in the format 'minLength,maxLength'.`
      );
    }

    const fieldLength = body[field].length;
    if (fieldLength < minLength || fieldLength > maxLength) {
      return `${field} must be between ${minLength} and ${maxLength} characters long.`;
    }
    return null;
  }
}

/**
 * Validator for ensuring that a field's value falls within a specified date range.
 * @extends Validator
 */
class DateRangeValidator extends Validator {
  /**
   * Validates the value of a date field against the specified date range.
   * @param {string} field - The name of the field to validate.
   * @param {string} ruleValue - The range of dates allowed for the field's value (format: 'startDate,endDate').
   * @param {Object} body - The request body object containing the field to validate.
   * @returns {string|null} - A validation error message if the date is outside the specified range, otherwise null.
   */
  validate(field, ruleValue, body) {
    const [startDate, endDate] = ruleValue
      .split(",")
      .map((date) => new Date(date));
    const fieldValue = new Date(body[field]);

    // Check if ruleValue is valid dates
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      throw new Error(
        `Invalid rule value for ${field}. Please provide valid start and end dates.`
      );
    }

    if (fieldValue < startDate || fieldValue > endDate) {
      return `${field} must be between ${startDate.toDateString()} and ${endDate.toDateString()}.`;
    }
    return null;
  }
}
/**
 * Validator for ensuring that an array field contains a specific number of elements.
 * @extends Validator
 */
class ArrayLengthValidator extends Validator {
  /**
   * Validates the length of an array field against the specified number of elements.
   * @param {string} field - The name of the field to validate.
   * @param {string} ruleValue - The expected length of the array.
   * @param {Object} body - The request body object containing the field to validate.
   * @returns {string|null} - A validation error message if the array length does not match the expected length, otherwise null.
   */
  validate(field, ruleValue, body) {
    const expectedLength = parseInt(ruleValue);

    // Check if the field is an array
    if (!Array.isArray(body[field])) {
      return `${field} must be an array.`;
    }

    // Check if the array length matches the expected length
    if (body[field].length !== expectedLength) {
      return `${field} must contain exactly ${expectedLength} elements.`;
    }

    return null;
  }
}
/**
 * Validator for ensuring that an array field contains a number of elements within a specified range.
 * @extends Validator
 */
class ArrayRangeValidator extends Validator {
  /**
   * Validates the length of an array field against the specified range of lengths.
   * @param {string} field - The name of the field to validate.
   * @param {string} ruleValue - The range of lengths allowed for the array (format: 'minLength,maxLength').
   * @param {Object} body - The request body object containing the field to validate.
   * @returns {string|null} - A validation error message if the array length is outside the specified range, otherwise null.
   * @throws {Error} - Throws an error if the rule value is invalid or if the field is not an array.
   */
  validate(field, ruleValue, body) {
    const [minLength, maxLength] = ruleValue
      .split(",")
      .map((value) => parseInt(value));

    // Check if ruleValue is valid
    if (
      isNaN(minLength) ||
      isNaN(maxLength) ||
      minLength < 0 ||
      maxLength < 0 ||
      minLength > maxLength
    ) {
      throw new Error(
        `Invalid rule value for ${field}. Please provide a valid range in the format 'minLength,maxLength'.`
      );
    }

    const array = body[field];

    // Check if the field is an array
    if (!Array.isArray(array)) {
      return `${field} must be an array.`;
    }

    const arrayLength = array.length;

    // Check if the array length is within the specified range
    if (arrayLength < minLength || arrayLength > maxLength) {
      return `${field} must contain between ${minLength} and ${maxLength} elements.`;
    }

    return null;
  }
}

module.exports = {
  MaxLengthValidator,
  MinLengthValidator,
  LengthRangeValidator,
  DateRangeValidator,
  ArrayLengthValidator,
  ArrayRangeValidator,
};
