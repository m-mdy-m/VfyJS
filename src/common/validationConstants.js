/**
 * Minimum length requirement for passwords.
 * @constant {number}
 */
const MIN_LENGTH = 8;

/**
 * Maximum length requirement for passwords.
 * @constant {number}
 */
const MAX_LENGTH = 64;

/**
 * Removes leading and trailing whitespaces from a string.
 *
 * @function
 * @param {string} value - The input string to be trimmed.
 * @returns {string} - The input string with leading and trailing whitespaces removed.
 */
const trimmedValue = (value) => value.replace(/\s/g, '').trim();
/**
 * Module exports containing constants and functions related to password validation.
 * @module validationConstants
 */
module.exports = { MIN_LENGTH, MAX_LENGTH, trimmedValue };
