"use strict";
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
const {optionsPassword} = require("./helper/genOption");
const {  validateWithCondition, validateType, validationsLength,ifTruthyValue } = require("../../errors/FormError");
const { validateCommon } = require("./validation.mjs");
const { validateLengthRange, ThrowFalsy } = require("../../errors/Error.mjs");

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
    const value = validateCommon(input,'password',8,64)
    const validator = inputValidator(value);
    // Validate password length
    let min = minLength?.value ?? MIN_LENGTH;
    let max = maxLength?.value ?? MAX_LENGTH;
    validateLengthRange(value,min,max,`length must be between ${min} and ${max} characters.`)
    // Validate individual criteria
    const isUppercase = uppercase?.required?? uppercase
    const isLowercase = lowercase?.required ?? lowercase
    const isNumber = number?.required ?? number
    const hasSpecialChar = specialCharacter?.required ?? specialCharacter
    ThrowFalsy(isUppercase,uppercase.message)
    ThrowFalsy(isLowercase,lowercase.message)
    ThrowFalsy(isNumber,number.message)
    ThrowFalsy(hasSpecialChar,specialCharacter.message)
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