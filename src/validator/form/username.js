"use strict";

/**
 * Options for customizing password validation criteria.
 *
 * @typedef {Object} options
 * @property {Object} minLength - Minimum length requirements for the password.
 * @property {(number|string)} minLength.value - The minimum length value. If not provided, it defaults to the value from the validation constants.
 * @property {string} minLength.errorMessage - Error message for minimum length validation failure.
 * @property {Object} maxLength - Maximum length requirements for the password.
 * @property {(number|string)} maxLength.value - The maximum length value. If not provided, it defaults to the value from the validation constants.
 * @property {string} maxLength.errorMessage - Error message for maximum length validation failure.
 * @property {Object} uppercase - Uppercase letter requirements for the password.
 * @property {boolean} uppercase.required - Whether uppercase letters are required.
 * @property {string} uppercase.errorMessage - Error message for uppercase letter validation failure.
 * @property {Object} number - Lowercase letter requirements for the password.
 * @property {boolean} number.required - Whether lowercase letters are required.
 * @property {string} number.errorMessage - Error message for lowercase letter validation failure.
 * @property {Object} NonAlphanumeric - Numeric digit requirements for the password.
 * @property {boolean} NonAlphanumeric.required - Whether numeric digits are required.
 * @property {string} NonAlphanumeric.errorMessage - Error message for numeric digit validation failure.
 * @property {Object} trim - Special character requirements for the password.
 * @property {boolean} trim.required - Whether special characters are required.
 * @property {string} trim.errorMessage - Error message for special character validation failure.
 * @property {Object} repeat - Alphabetic character requirements for the password.
 * @property {boolean} repeat.required - Whether alphabetic characters are required.
 * @property {string} repeat.errorMessage - Error message for alphabetic character validation failure.
 */

const {MAX_LENGTH,MIN_LENGTH,trimmedValue,getValidValue,isValue,getRequired } = require("../../common/validationConstants");
const inputValidator = require("../../utils/inputValidator");
const createValidationOptions = require('../../utils/handleOption')
const { handleValidationError } = require("../../errors/HandleError");
/**
 * Validates a password based on the provided options.
 *
 * @param {string} value - The password string to be validated.
 * @param {options} options - Options for customizing validation criteria.
 * @returns {boolean} - True if the password is valid, otherwise false.
 * @throws {Error} - Throws an error if validation fails.
 * @example
 * const { username } = require("vfyjs");
 * const isValid = username("StringUsername123");
 * console.log(isValid); // true
 */
function validateUsername(username, options = {}) {
    const validator = inputValidator(username);
    const optionName = ['minLength', 'maxLength', 'uppercase','number','NonAlphanumeric','trim','repeat']
    const validation = 
    [
        validator.hasMinLength(MIN_LENGTH),
        validator.hasMaxLength(MAX_LENGTH),
        validator.hasUppercase(),
        validator.hasNumber(),
        validator.hasNonAlphanumeric(),
        validator.hasWhitespace(),
        validator.hasRepeat()
    ]
    const messageError = 
    [
        'Username must be at least 8 characters long.',
        'Username cannot exceed 64 characters.',
        'Username must contain at least one uppercase letter.',
        'Username must have at least one number.',
        'Username must not contain non-alphanumeric characters.',
        'Username cannot contain whitespace.',
        'Username must not have consecutive repeated characters.'
    ]
    let objectOption = createValidationOptions(optionName,validation,messageError)
    objectOption = {...objectOption, ...options}
    const {minLength,
        maxLength,
        uppercase,
        number,
        NonAlphanumeric,
        trim,
        repeat } = objectOption
    handleValidationError(uppercase.required ? validator.hasUppercase() : true  , uppercase.errorMessage)
    handleValidationError(number.required , number.errorMessage)
        console.log('NonAlphanumeric =>',NonAlphanumeric);
    const isNonAlphanumeric = getRequired(NonAlphanumeric,false)
    console.log('isNonAlphanumeric =>',isNonAlphanumeric);
    if(isNonAlphanumeric){
        handleValidationError(NonAlphanumeric && !isNonAlphanumeric, 'Value must be alphanumeric. Example: ABC123');
    }

    if (repeat.required) {
        handleValidationError(!repeat.required ? validator.hasRepeat() : true, repeat.errorMessage)
    }
    let checkWhiteSpace = !trim.required || trim
    
    if(!checkWhiteSpace){
        username = trimmedValue(username)
        checkWhiteSpace = true
    }               
    let minValue = getValidValue(minLength , minLength);
    let maxValue = getValidValue(maxLength , maxLength);
        
    const min = isValue(minValue,MIN_LENGTH)
    const max = isValue(maxValue,MAX_LENGTH)
    // console.log('min =>',min);
    // console.log('max =>',max);
    // console.log('checkWhiteSpace =>', checkWhiteSpace);
    // console.log('NonAlphanumeric =>',NonAlphanumeric);
    // console.log('repeat =>',repeat);
    // console.log('uppercase =>',uppercase);
    // console.log('repeat =>',repeat);
    // console.log('trim =>',trim);
    if (typeof minValue === 'string' || typeof maxValue === 'string') {
        minValue = +minValue;
        maxValue =+maxValue
    }
    // console.log(`username.length-${username.length} <`,min);
    // console.log(`username.length-${username.length} >`,max);
    if (typeof min === 'number' &&typeof max === 'number' &&(username.length < min || username.length > max)){
        throw new Error("Invalid configuration for minLength or maxLength. They must be either true, false, or a numeric value or string.");
    }
    if(typeof max === 'number' && username.length > max){
        throw new Error('Username length exceeds the maximum allowed length.');
    }
    
    if (
    typeof minValue !== 'undefined' &&
    typeof maxValue !== 'undefined' &&
    (typeof minValue !== 'boolean') &&
    (typeof maxValue !== 'boolean') &&
    (typeof minValue !== 'number' && typeof max !== 'number')
    ) {
    throw new Error("min or max Length just for true or false");
    }
    
    const isValid = min && max && (uppercase.required ? validator.hasUppercase() : true) && (number.required ? validator.hasNumber() : true)  && isNonAlphanumeric &&checkWhiteSpace && repeat.required ? validator.hasRepeat() : true
    return isValid;
}

const result = validateUsername("St!#@!#%%serna@me123", {
    minLength: { value: 5, errorMessage: "must be at least 5 characters long" },
    maxLength: { value: 20, errorMessage: "cannot exceed 15 characters" },
    uppercase: { required: true, errorMessage: "must have at least one uppercase letter" },
    number: { required: true, errorMessage: "must have at least one number" },
    NonAlphanumeric: { required: false, errorMessage: "should not contain non-alphanumeric characters" },
    trim: { required: true, errorMessage: "cannot contain leading or trailing whitespaces" },
    repeat: { required: true, errorMessage: "cannot have consecutive repeated characters" },
  })
console.log('result =>', result);
module.exports = validateUsername;
