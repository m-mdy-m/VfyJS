"use strict";
const {getTelResource,readPhoneCodeData} = require("../config/phoneDataHandler")
const { trimmedValue } = require('../../../common/validationConstants')
const { TypesCheck, isEmpty, validateLength, ifFalsyValue }= require('../../../errors/HandleError')
const inputValidator = require('../../../utils/inputValidator')
const MAX_LENGTH_CODE = 10
const MIN_LENGTH_CODE = 1
const MAX_LENGTH_PHONE_NUMBER = 25
const MIN_LENGTH_PHONE_NUMBER = 6

/**
 * Validates a given value based on specified criteria.
 *
 * @param {string|number} value - The value to be validated.
 * @param {number} min - The minimum length allowed.
 * @param {number} max - The maximum length allowed.
 * @param {string} [ContentError=String] - The type of content being validated (default is 'String').
 * @returns {string} - The trimmed and validated value.
 */
function ChecKValue(value, min, max, ContentError = String) {
    // Check for empty value
    isEmpty(value, `${ContentError} should not be empty. Please provide a valid ${ContentError}.`);
    // Check for valid types
    TypesCheck(value, ['string', 'number'], `Invalid ${ContentError}. ${ContentError} should be a string or a number.`);
    // Convert value to a number for additional validation
    
    let numberCode = +value;
    if (numberCode !== value) {
        throw new Error('value is not valid')
    }
    const validator = inputValidator(numberCode);
    // Check for numeric characters
    ifFalsyValue(validator.hasNumeric(), `Invalid ${ContentError} format. The ${ContentError} should contain numeric characters.`);
    // Convert to string if the value is a number
    if (typeof numberCode === 'number') {
        numberCode = `${numberCode}`;
    }
    // Validate length
    validateLength(numberCode, min, max, `Invalid ${ContentError} length. The ${ContentError} should be between ${min} and ${max} characters.`);
    // Trim and return the validated value
    // console.log('value =>',value);
    // console.log('numberCode =>',numberCode);
    return trimmedValue(numberCode);
}
/**
 * Represents the result of validating a phone code.
 * @typedef {Object} PhoneCodeValidationResult
 * @property {string} code - Validated phone code.
 * @property {string} country - Validated country.
 * @property {string} iso - Validated ISO code.
 * @property {boolean} hasCode - Indicates if the code is valid (true) or not (false).
 * @example
 * const validatedCode = await hasCode('98');
 * if (validatedCode) {
 *    console.log(validatedCode.code); // Validated phone code
 *    console.log(validatedCode.country); // Validated country
 *    console.log(validatedCode.iso); // Validated ISO code
 *    console.log(validatedCode.hasCode); // true
 * } else {
 *    console.log('Invalid phone code');
 * }
 */
async function hasCode(code) {
    // Validate the code using ChecKValue function
    const validatedValue = ChecKValue(code, MIN_LENGTH_CODE, MAX_LENGTH_CODE, 'Code');

    // Fetch phone code data
    const phoneCodeData = await readPhoneCodeData();

    // Check for error fetching data
    ifFalsyValue(phoneCodeData, 'Error fetching phone code data. Please try again later.');

    // Retrieve phone codes, iso codes, and countries
    const phoneCodes = phoneCodeData.phoneCodes;
    const isoCodes = phoneCodeData.isoCodes;
    const countries = phoneCodeData.countries;

    // Find the index of the validated code
    const index = phoneCodes.indexOf(validatedValue);

    // Return information if valid, otherwise false
    return index !== -1 ? {
        code: phoneCodes[index],
        country: countries[index],
        iso: isoCodes[index],
        hasCode: true,
        code : validatedValue,
    } : false;
}
/**
 * Represents the result of validating a phone number.
 * @typedef {Object} PhoneNumberValidationResult
 * @property {string} phone - Validated phone number.
 * @property {boolean} hasPhone - Indicates if the phone number is valid (true) or not (false).
 * @example
 * const validatedPhoneNumber = hasPhone('9115291407');
 * if (validatedPhoneNumber) {
 *    console.log(validatedPhoneNumber.phone); // Validated phone number
 *    console.log(validatedPhoneNumber.hasPhone); // true
 * } else {
 *    console.log('Invalid phone number');
 * }
 */

function hasPhone(phone) {
    // Validate the phone number using ChecKValue function
    const validatedPhoneNumber = ChecKValue(phone, MIN_LENGTH_PHONE_NUMBER, MAX_LENGTH_PHONE_NUMBER, "Phone Number");

    // Return information if valid, otherwise false
    return validatedPhoneNumber ? {
        phone: validatedPhoneNumber,
        hasPhone: true
    } : false;
}
/**
 * Represents the result of retrieving continent and formatting patterns information for a phone code.
 * @typedef {Object} ContinentInfoResult
 * @property {string} continent - The continent associated with the phone code.
 * @property {Array} patterns - An array of formatting patterns for the phone code.
 *   Each pattern is an object with 'type' and 'pattern' properties.
 * @example
 * const continentInfo = await getContinentInfo('98');
 * if (continentInfo) {
 *    console.log(continentInfo.continent); // Continent information
 *    console.log(continentInfo.patterns); // Formatting patterns
 * } else {
 *    console.log('Invalid phone code');
 * }
 */
async function getContinentInfo(code) {
    try {
        const phoneData = await getTelResource();
        const index = phoneData.phoneCodes.indexOf(code);
        // Return information if valid, otherwise false
        return index !== -1 ? {
            continent: phoneData.continent[index],
            patterns: phoneData.format[index],
        } : false;
    } catch (error) {
        // Log unexpected errors and throw a generic error message
        throw new Error('Internal server error. Please try again later.');
    }
}
/**
 * Represents the result of validating both country code and phone number.
 * @typedef {Object} ValidationResult
 * @property {string} continent - Validated continent.
 * @property {string} code - Validated phone code.
 * @property {string} country - Validated country.
 * @property {string} iso - Validated ISO code.
 * @property {string} phone - Validated phone number.
 * @property {Array} patterns - An array of formatting patterns for the phone code.
 *   Each pattern is an object with 'type' and 'pattern' properties.
 * @property {boolean} hasCode - Indicates if the code is valid (true) or not (false).
 * @property {boolean} hasPhone - Indicates if the phone number is valid (true) or not (false).
 */
/**
 * Validates both country code and phone number and returns information if both are valid.
 *
 * @param {string|number} code - The country code to be validated.
 * @param {string|number} phone - The phone number to be validated.
 * @returns {ValidationResult} - An object with validated information.
 * @throws Will throw an error if validation fails.
 */

async function GlobalVal(code, phone) {
        // Validate country code and phone number
        const validatedCode = await hasCode(code);
        const validatedPhone = await hasPhone(phone);

        const ContinentInfo =await getContinentInfo(validatedCode.code)
        // Check for validation failures
        ifFalsyValue(validatedCode, 'Failed to validate country code.');
        ifFalsyValue(validatedPhone, 'Failed to validate phone number.');

        // Return validated information
        return {
            continent : ContinentInfo.continent,
            code: validatedCode.code,
            country: validatedCode.country,
            iso: validatedCode.iso,
            phone: validatedPhone.phone,
            patterns: ContinentInfo.patterns,
            hasCode: validatedCode.hasCode,
            hasPhone: validatedPhone.hasPhone,
        };
}
const result = hasPhone('1234567890123456789012345678')
console.log(result);
module.exports = {hasCode,hasPhone,getContinentInfo,GlobalVal,ChecKValue};