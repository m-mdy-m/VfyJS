"use strict";
/**
 * Validates a password based on specified criteria.
 *
 * @typedef {Object} PasswordOptions
 * @property {Object} options - Options for customizing validation criteria.
 * @property {Object} options.minLength - Minimum length requirements for the password.
 * @property {number|string} options.minLength.value - The minimum length value. If not provided, it defaults to the value from the validation constants.
 * @property {string} options.minLength.errorMessage - Error message for minimum length validation failure.
 * @property {Object} options.maxLength - Maximum length requirements for the password.
 * @property {number|string} options.maxLength.value - The maximum length value. If not provided, it defaults to the value from the validation constants.
 * @property {string} options.maxLength.errorMessage - Error message for maximum length validation failure.
 * @property {Object} options.uppercase - Uppercase letter requirements for the password.
 * @property {boolean} options.uppercase.required - Whether uppercase letters are required.
 * @property {string} options.uppercase.errorMessage - Error message for uppercase letter validation failure.
 * @property {Object} options.lowercase - Lowercase letter requirements for the password.
 * @property {boolean} options.lowercase.required - Whether lowercase letters are required.
 * @property {string} options.lowercase.errorMessage - Error message for lowercase letter validation failure.
 * @property {Object} options.number - Numeric digit requirements for the password.
 * @property {boolean} options.number.required - Whether numeric digits are required.
 * @property {string} options.number.errorMessage - Error message for numeric digit validation failure.
 * @property {Object} options.specialCharacter - Special character requirements for the password.
 * @property {boolean} options.specialCharacter.required - Whether special characters are required.
 * @property {string} options.specialCharacter.errorMessage - Error message for special character validation failure.
 * @property {Object} options.alphabetic - Alphabetic character requirements for the password.
 * @property {boolean} options.alphabetic.required - Whether alphabetic characters are required.
 * @property {string} options.alphabetic.errorMessage - Error message for alphabetic character validation failure.
 * @property {Object} options.whitespace - Whitespace requirements for the password.
 * @property {boolean} options.whitespace.required - Whether whitespace is not allowed.
 * @property {string} options.whitespace.errorMessage - Error message for whitespace validation failure.
 */

/**
 * Options for customizing password validation criteria.
 *
 * @typedef {Object} options
 * @property {Object} minLength - Minimum length requirements for the password.
 * @property {number|string} minLength.value - The minimum length value. If not provided, it defaults to the value from the validation constants.
 * @property {string} minLength.errorMessage - Error message for minimum length validation failure.
 * @property {Object} maxLength - Maximum length requirements for the password.
 * @property {number|string} maxLength.value - The maximum length value. If not provided, it defaults to the value from the validation constants.
 * @property {string} maxLength.errorMessage - Error message for maximum length validation failure.
 * @property {Object} uppercase - Uppercase letter requirements for the password.
 * @property {boolean} uppercase.required - Whether uppercase letters are required.
 * @property {string} uppercase.errorMessage - Error message for uppercase letter validation failure.
 * @property {Object} lowercase - Lowercase letter requirements for the password.
 * @property {boolean} lowercase.required - Whether lowercase letters are required.
 * @property {string} lowercase.errorMessage - Error message for lowercase letter validation failure.
 * @property {Object} number - Numeric digit requirements for the password.
 * @property {boolean} number.required - Whether numeric digits are required.
 * @property {string} number.errorMessage - Error message for numeric digit validation failure.
 * @property {Object} specialCharacter - Special character requirements for the password.
 * @property {boolean} specialCharacter.required - Whether special characters are required.
 * @property {string} specialCharacter.errorMessage - Error message for special character validation failure.
 * @property {Object} alphabetic - Alphabetic character requirements for the password.
 * @property {boolean} alphabetic.required - Whether alphabetic characters are required.
 * @property {string} alphabetic.errorMessage - Error message for alphabetic character validation failure.
 * @property {Object} whitespace - Whitespace requirements for the password.
 * @property {boolean} whitespace.required - Whether whitespace is not allowed.
 * @property {string} whitespace.errorMessage - Error message for whitespace validation failure.
 */

const { MAX_LENGTH, MIN_LENGTH, getValidValue, isValue, } = require("../../common/validationConstants");
const inputValidator = require("../../utils/inputValidator");
const {isTypeMismatch, isEmpty,}= require('../../errors/HandleError');
const { toString } = require("./helper/dataConversion");
const {optionsPassword} = require("./helper/genOption");
const { getReq, getErrorMessage } = require("./helper/getValues");
const {  validateWithCondition, validateType, validationsLength,ifTruthyValue } = require("../../errors/FormError");

/**
 * Validates a password based on the provided options.
 *
 * @param {string} input - The password string to be validated.
 * @param {options} options - Options for customizing validation criteria.
 * @returns {boolean} - True if the password is valid, otherwise false.
 * @throws {Error} - Throws an error if validation fails.
 * @example
 * const { isPassword } = require("vfyjs");
 * const isValid = isPassword("StrongPwd@123", { minLength: 8, uppercase: true, number: true });
 * console.log(isValid); // true
 */
function validateFormPassword(input, options = {}) {
    const { lowercase, uppercase, number, specialCharacter, alphabetic, whitespace, minLength, maxLength, msgError } = optionsPassword(options);
    isEmpty(input)
    const value = input.value ? input.value : input
    const validator = inputValidator(value);
    // Validate password length
    const minValidLength = getValidValue(minLength, MIN_LENGTH);
    const maxValidLength = getValidValue(maxLength, MAX_LENGTH);
    let min = isValue(minLength, minValidLength);
    let max = isValue(maxLength, maxValidLength);

    if (typeof min === 'string' || typeof min === 'string') {
        min = +min;
        max = +max;
    }

    if (isTypeMismatch('undefined', min) &&
        isTypeMismatch('undefined', max) &&
        isTypeMismatch('boolean', min) &&
        isTypeMismatch('boolean', max) &&
        isTypeMismatch('number', min) &&
        isTypeMismatch('number', max)) {
        throw new TypeError("Invalid configuration for minLength or maxLength. They must be either true, false, or a numeric value or string.");
    }

    validateType('number', min, getErrorMessage(minLength));
    validateType('number', max, getErrorMessage(maxLength));
    validationsLength(value,null, min, max, `length must be between ${min} and ${max} characters.`, input, msgError, 'validations Length');
    toString(value,'Password is required.');
    // Validate individual criteria
    validateWithCondition(getReq(uppercase), validator.hasUppercase(), input, msgError, 'hasUppercase', getErrorMessage(uppercase));
    validateWithCondition(getReq(lowercase), validator.hasLowerCase(), input, msgError, 'hasLowerCase', getErrorMessage(lowercase));
    validateWithCondition(getReq(number), validator.hasNumber(), input, msgError, 'hasNumber', getErrorMessage(number));
    validateWithCondition(getReq(specialCharacter), validator.hasSpecialCharacter(), input, msgError, 'hasSpecialCharacter', getErrorMessage(specialCharacter));
    validateWithCondition(getReq(alphabetic), validator.hasAlphabetic(), input, msgError, 'hasAlphabetic', getErrorMessage(alphabetic));
    // Validate whitespace
    ifTruthyValue(whitespace.errorMessage,validator.hasWhitespace(),input,msgError,'hasWhitespace');
    const isValid = min &&
        max &&
        (uppercase.required ? validator.hasUppercase() : true) &&
        (lowercase.required ? validator.hasLowerCase() : true) &&
        (number.required ? validator.hasNumber() : true) &&
        (specialCharacter.required ? validator.hasSpecialCharacter() : true) &&
        (alphabetic.required ? validator.hasAlphabetic() : true) &&
        whitespace.required ? !validator.hasWhitespace() : true

    return isValid;
}
module.exports = validateFormPassword;