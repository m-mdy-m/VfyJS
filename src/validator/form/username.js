"use strict";

/**
 * Options for customizing username validation criteria.
 *
 * @typedef {Object} UsernameOptions
 * @property {Object} minLength - Minimum length requirements for the username.
 * @property {(number|string)} minLength.value - The minimum length value. If not provided, it defaults to the value from the validation constants.
 * @property {string} minLength.errorMessage - Error message for minimum length validation failure.
 * @property {Object} maxLength - Maximum length requirements for the username.
 * @property {(number|string)} maxLength.value - The maximum length value. If not provided, it defaults to the value from the validation constants.
 * @property {string} maxLength.errorMessage - Error message for maximum length validation failure.
 * @property {Object} uppercase - Uppercase letter requirements for the username.
 * @property {boolean} uppercase.required - Whether uppercase letters are required.
 * @property {string} uppercase.errorMessage - Error message for uppercase letter validation failure.
 * @property {Object} number - Numeric digit requirements for the username.
 * @property {boolean} number.required - Whether numeric digits are required.
 * @property {string} number.errorMessage - Error message for numeric digit validation failure.
 * @property {Object} nonAlphanumeric - Non-alphanumeric character requirements for the username.
 * @property {boolean} nonAlphanumeric.required - Whether non-alphanumeric characters are required.
 * @property {string} nonAlphanumeric.errorMessage - Error message for non-alphanumeric character validation failure.
 * @property {Object} trim - Whitespace requirements for the username.
 * @property {boolean} trim.required - Whether leading or trailing whitespaces are disallowed.
 * @property {string} trim.errorMessage - Error message for whitespace validation failure.
 * @property {Object} repeat - Consecutive character requirements for the username.
 * @property {boolean} repeat.required - Whether consecutive characters are disallowed.
 * @property {string} repeat.errorMessage - Error message for consecutive character validation failure.
 */

// Import necessary modules and constants
const {MAX_LENGTH, MIN_LENGTH, getFalseRequired, trimmedValue, getValidValue, isValue, getRequired} = require("../../common/validationConstants");
const inputValidator = require("../../utils/inputValidator");
const {isTypeMismatch} = require("../../errors/HandleError");
const {optionUsername} = require("./helper/genOption");
const {validateWithCondition, throwIfFalsy, ifTruthyValue, IfBothTruthy, validationsLength, TypeMatches} = require("../../errors/FormError");
const {getErrorMessage} = require("./helper/getValues");

/**
 * Validates a username based on the provided options.
 *
 * @param {string} input - The username string to be validated.
 * @param {UsernameOptions} options - Options for customizing validation criteria.
 * @returns {boolean} - True if the username is valid, otherwise false.
 * @throws {Error} - Throws an error if validation fails.
 * @example
 * const { validateUsername } = require("vfyjs");
 * const isValid = validateUsername("StringUsername123");
 * console.log(isValid); // true
 */
function validateUsername(input, options = {}) {
    let username = input.value ? input.value : input; // Get the username value
    const validator = inputValidator(username); // Create a validator instance
    // Extract options
    const {minLength, maxLength, uppercase, number, nonAlphanumeric, trim, repeat, messageError} = optionUsername(username, options);

    // Validate uppercase requirement
    validateWithCondition(uppercase, validator.hasUppercase(), input, messageError, 'hasUppercase', getErrorMessage(uppercase));

    // Validate number requirement
    throwIfFalsy(number.required, input, messageError, 'Required Number', getErrorMessage(number));

    // Check for whitespace if required
    let checkWhiteSpace = getRequired(trim, false);
    if (checkWhiteSpace) {
        throwIfFalsy(!checkWhiteSpace, validator.hasWhitespace(), messageError, 'hasWhitespace', 'Invalid input. Value cannot contain leading or trailing whitespaces.');
    }

    // Trim username value
    username = trimmedValue(username);

    // Validate non-alphanumeric requirement
    const isNonAlphanumeric = getRequired(nonAlphanumeric, false);
    ifTruthyValue('Value must be alphanumeric. Example: ABC123', isNonAlphanumeric, input, messageError, 'isNonAlphanumeric');

    // Validate number requirement
    const isNumber = getRequired(number, validator.hasNumber());
    IfBothTruthy(isNumber, !validator.hasNumber() && !validator.hasNumeric(), 'Invalid input. The password must contain at least one number.', input, messageError, 'isNumber');

    // Validate repeat requirement
    let isRepeat = getFalseRequired(repeat, validator.hasRepeat());
    IfBothTruthy(isRepeat, validator.hasRepeat(), 'Invalid input. Password cannot have consecutive repeated characters.', input, messageError, 'isRepeat');

    // Validate length requirements
    let minValue = getValidValue(minLength, minLength);
    let maxValue = getValidValue(maxLength, maxLength);
    
    // Get min and max lengths
    const min = isValue(minValue, MIN_LENGTH);
    const max = isValue(maxValue, MAX_LENGTH);

    // Convert string lengths to numbers
    if (typeof minValue === 'string' || typeof maxValue === 'string') {
        minValue = +minValue;
        maxValue = +maxValue;
    }

    // Validate type and length
    TypeMatches(username, 'string', getErrorMessage(username), input, messageError, 'Check Type');
    validationsLength(username, null, min, max, `Invalid configuration for minimum and maximum length. Ensure that ${min} and ${max} are either set to true, false, or numeric values or strings.`, input, messageError, 'Validation Length');

    // Check if username length exceeds maximum length
    if (typeof max === 'number' && username.length > max) {
        throw new Error('Username length exceeds the maximum allowed length.');
    }

    // Type mismatch validations
    isTypeMismatch('undefined', minValue, "undefined 1");
    isTypeMismatch('undefined', maxValue, "undefined 2");
    isTypeMismatch('boolean', minValue, "boolean 1");
    isTypeMismatch('boolean', maxValue, "boolean 2");
    isTypeMismatch('number', min, "number 1");
    isTypeMismatch('number', max, "number 2");

    // Check if the username is valid
    const isValid = min && max && (uppercase.required ? validator.hasUppercase() : true) && isNumber && !isNonAlphanumeric && !checkWhiteSpace && !isRepeat;
    return isValid;
}

module.exports = validateUsername;
