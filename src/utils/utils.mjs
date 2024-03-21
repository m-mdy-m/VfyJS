/**
 * Minimum length requirement for passwords.
 * @constant {number}
 */
export const MIN_LENGTH = 8;

/**
 * Maximum length requirement for passwords.
 * @constant {number}
 */
export const MAX_LENGTH = 64;

/**
 * Removes leading and trailing whitespaces from a string.
 *
 * @function
 * @param {string} value - The input string to be trimmed.
 * @returns {string} - The input string with leading and trailing whitespaces removed.
 *
 * @example
 * // Example: Trimming whitespaces from a string
 * const inputString = '    H   ell o,    World!   ';
 * const result = trimmedValue(inputString);
 * console.log(result);
 * // Output: 'Hello,World!'
 */
export const trimmedValue = (value) => value.replace(/\s/g, "").trim();
/**
 * Module exports containing constants and functions related to password validation.
 * @module validationConstants
 */
export function getRequired(value, defaultValue) {
  return value && value.required ? value.required : defaultValue;
}
export function getFalseRequired(value) {
  return value && !value.required ? value.required : value;
}
export function getValidValue(value, defaultValue) {
  return value && value.value ? value.value : defaultValue;
}
export function isValue(value, defaultValue) {
  if (typeof value === "object") {
    return defaultValue;
  }
  return value ? value : defaultValue;
}
