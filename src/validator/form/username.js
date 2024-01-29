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

const {MAX_LENGTH,MIN_LENGTH,getFalseRequired,trimmedValue,getValidValue,isValue,getRequired } = require("../../common/validationConstants");
const inputValidator = require("../../utils/inputValidator");
const { isTypeMismatch} = require("../../errors/HandleError");
const { optionUsername } = require("./helper/genOption");
const { validateWithCondition, throwIfFalsy, ifTruthyValue, IfBothTruthy, validationsLength, TypeMatches } = require("../../errors/FormError");
const { getErrorMessage } = require("./helper/getValues");
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
function validateUsername(input, options = {}) {
    let username = input.value ? input.value : input
    const validator = inputValidator(username);
    const {minLength , maxLength,uppercase,number,NonAlphanumeric,trim,repeat,messageError} = optionUsername(username,options)
    validateWithCondition(uppercase,validator.hasUppercase(),input,messageError,'hasUppercase',getErrorMessage(uppercase))
    throwIfFalsy(number.required,input,messageError,'Required Number',getErrorMessage(number))
    let checkWhiteSpace = getRequired(trim, false)
    if(checkWhiteSpace){
        throwIfFalsy(!checkWhiteSpace,validator.hasWhitespace(),messageError,'hasWhitespace', 'Invalid input. Value cannot contain leading or trailing whitespaces.')
    }  
    username = trimmedValue(username)
    const isNonAlphanumeric = getRequired(NonAlphanumeric,false)
    ifTruthyValue( 'Value must be alphanumeric. Example: ABC123',isNonAlphanumeric,input,messageError,'isNonAlphanumeric');

    const isNumber = getRequired(number,validator.hasNumber())
    IfBothTruthy(isNumber, !validator.hasNumber() && !validator.hasNumeric(),'Invalid input. The password must contain at least one number.',input,messageError,'isNumber')
    let isRepeat = getFalseRequired(repeat , validator.hasRepeat())
    IfBothTruthy(isRepeat,validator.hasRepeat() , 'Invalid input. Password cannot have consecutive repeated characters.',input,messageError,'isRepeat')
    let minValue = getValidValue(minLength , minLength);
    let maxValue = getValidValue(maxLength , maxLength);
        
    const min = isValue(minValue,MIN_LENGTH)
    const max = isValue(maxValue,MAX_LENGTH)
    if (typeof minValue === 'string' || typeof maxValue === 'string') {
        minValue = +minValue;
        maxValue =+maxValue
    }
    TypeMatches(username,'number',getErrorMessage(username),input,messageError,'Check Type')
    validationsLength(username,null,min,max,`Invalid configuration for minimum and maximum length. Ensure that ${min} and ${max} are either set to true, false, or numeric values or strings.`,input,messageError,'Validation Length')
    if(typeof max === 'number' && username.length > max){
        throw new Error('Username length exceeds the maximum allowed length.');
    }
    
    isTypeMismatch('undefined', minValue,"undefined 1") 
    isTypeMismatch('undefined', maxValue,"undefined 2")
    isTypeMismatch('boolean', minValue,"boolean 1") 
    isTypeMismatch('boolean', maxValue,"boolean 2")
    isTypeMismatch('number', min,"number 1") 
    isTypeMismatch('number', max,"number 2")
    const isValid = min && max && (uppercase.required ? validator.hasUppercase() : true) && isNumber && !isNonAlphanumeric && !checkWhiteSpace && !isRepeat
    return isValid;
}
module.exports = validateUsername;
