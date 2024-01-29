/**
 * @typedef {Object} ValidationOption
 * @property {any} value - The final value of the option after applying the default value or calling the function.
 * @property {string} errorMessage - The provided error message.
 * @property {boolean} validation - The provided validation function or a default value of `true` if no validation function is provided.
 */

/**
 * Utility function to handle default values for options.
 *
 * @param {any|Function} defaultValue - The default value for the option. If it's a function, the function will be called to get the actual value.
 * @param {string} errorMessage - The error message to be displayed if validation fails.
 * @returns {{ value: any, errorMessage: string, validation: boolean }} - An object representing the structured option.
 *
 * @example
 * // Example usage:
 * const option1 = handleOption("default_value", "Invalid input");
 * console.log(option1.value); // "default_value"
 * console.log(option1.errorMessage); // "Invalid input"
 * console.log(option1.validation); // true
 */
function handleOption(defaultValue, errorMessage) {
    let option;
  
   /**
     * Object representing a structured option.
     *
     * @typedef {Object} Option
     * @property {any} value - The final value of the option after applying the default value or calling the function.
     * @property {string} errorMessage - The provided error message.
     * @property {Function|boolean} validation - The provided validation function or a default value of `true` if no validation function is provided.
     */
  
    if (typeof defaultValue === 'number') {
    option = /** @type {ValidationOption} */ {
        value: defaultValue,
        errorMessage: errorMessage,
      };
    } else {
      option = /** @type {ValidationOption} */ {
        required: defaultValue,
        errorMessage: errorMessage,
      };
    }
    return option;
  }


/**
 * Creates validation options based on provided names, validations, and error messages.
 *
 * @param {Array<string>} name - Array of option names.
 * @param {Array<Function|boolean>} validations - Array of validation functions or boolean values.
 * @param {Array<string>} errorMessages - Array of error messages corresponding to each option.
 * @returns {ValidationOptions} - An object containing options with their structured values.
 *
 * @example
 * // Example usage:
 * const name = ['minlength', 'maxLength', 'uppercase'];
 * const validations = [validator.hasMinLength(8), validator.hasMaxLength(20), true];
 * const errorMessages = ['Password must be at least 8 characters long.', 'Password cannot exceed 20 characters.', 'Uppercase letter required.'];
 * const options = createValidationOptions(name, validations, errorMessages);
 * console.log(options.minlength.value); // Value based on validation function or boolean
 * console.log(options.maxLength.value); // Value based on validation function or boolean
 * console.log(options.uppercase.value); // Value based on validation function or boolean
 * console.log(options.minlength.errorMessage); // 'Password must be at least 8 characters long.'
 * console.log(options.maxLength.errorMessage); // 'Password cannot exceed 20 characters.'
 * console.log(options.uppercase.errorMessage); // 'Uppercase letter required.'
 * console.log(options.minlength.validate("example")); // Use the validation method for the "minlength" option
 */
const createValidationOptions = (name = [], validations = [], errorMessages = []) => {
    let options = {};
    for (let i = 0; i < name.length; i++) {
      const optionName = name[i];
      const validation = validations[i];
      const msgError = errorMessages[i];
      options[optionName] = handleOption(validation, msgError);
    }
    return options;
  };
  
  module.exports = createValidationOptions;
