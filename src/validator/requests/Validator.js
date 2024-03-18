const inputValidator = require("../../utils/inputValidator");

/**
 * Validator class for validating input values.
 */
class Validator {
  /**
   * Constructs a new Validator instance.
   * @param {string} field - The field name to be validated.
   */
  constructor(field) {
    this.field = field;
    // Initialize the validator with the provided field
    this.validator = inputValidator(field);
  }

  /**
   * Validates if the input value contains only alphanumeric characters.
   * @param {string} value - The value to be validated.
   * @returns {boolean} - True if the value contains only alphanumeric characters, otherwise false.
   */
  isAlphaNumeric(value) {
    if (!this.validator || typeof this.validator.hasAlphanumeric !== 'function') {
      throw new Error('Input validator or hasAlphanumeric method not available.');
    }
    return this.validator.hasAlphanumeric(value);
  }

  /**
   * Validates if the input value contains only numeric characters.
   * @param {string} value - The value to be validated.
   * @returns {boolean} - True if the value contains only numeric characters, otherwise false.
   */
  isNumeric(value) {
    if (!this.validator || typeof this.validator.hasNumeric !== 'function') {
      throw new Error('Input validator or hasNumeric method not available.');
    }
    return this.validator.hasNumeric(value);
  }

  /**
   * Placeholder method for validation. To be implemented by subclasses.
   * @abstract
   * @throws {Error} - Method not implemented error.
   */
  validate() {
    throw new Error("Method not implemented.");
  }
  isUppercase(value){
    return /[A-Z]/.test(value)
  }
  isLowerCase(value){
    return /[a-z]/.test(value)
  }
}

module.exports = Validator;
