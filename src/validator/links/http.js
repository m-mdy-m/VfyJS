const { trimmedValue } = require("../../common/validationConstants");
const { IfNotType, IfIsNumber, ifTruthyValue, ifFalsyValue } = require("../../errors/HandleError")
const inputValidation = require('../../utils/inputValidator')

/**
 * Validates if the given URL is an HTTP URL.
 *
 * @param {string} url - The URL to be validated.
 * @returns {boolean} Returns true if the URL is a valid HTTP URL, otherwise false.
 * @throws {TypeError} Throws a TypeError if the input is not a string.
 * @throws {Error} Throws an Error if the input is a number or if the protocol is not 'http:'.
 *
 * @example
 * const result = isHttpUrl("http://www.example.com");
 * console.log(result); // Output: true
 *
 * @example
 * try {
 *   isHttpUrl("https://www.example.com");
 * } catch (error) {
 *   console.error(error.message); // Output: "Only HTTP URLs are allowed."
 * }
 */
/**
 * Validates if the given URL is an HTTP URL.
 *
 * @param {string} url - The URL to be validated.
 * @returns {boolean} Returns true if the URL is a valid HTTP URL, otherwise false.
 * @throws {TypeError} Throws a TypeError if the input is not a string.
 * @throws {Error} Throws an Error if the input is a number or if the protocol is not 'http:'.
 *
 * @example
 * const result = isHttpUrl("http://www.example.com");
 * console.log(result); // Output: true
 *
 * @example
 * try {
 *   isHttpUrl("https://www.example.com");
 * } catch (error) {
 *   console.error(error.message); // Output: "Only HTTP URLs are allowed."
 * }
 */
function isHttpUrl(url) {
    // Parse URL components
    const { protocol, hostname, href } = new URL(url);

    // Perform type and numeric checks
    IfNotType('string', url, 'URL must be a string.');
    IfIsNumber(url, 'URL must not be a number.');

    // Trim the URL
    url = trimmedValue(url);

    // Extract subdomain
    const ArrayDomain = url.split(".");
    const subdomain = ArrayDomain[ArrayDomain.length - 1];

    // Validate subdomain presence
    ifFalsyValue(subdomain, 'Subdomain must be provided in the URL.');

    // Extract name from hostname
    const name = hostname.split('.')[1];

    // Check HTTP format
    const hasHttp = /^http:\/\/[a-zA-Z0-9-]+(\.[a-z]{2,})+$/.test(url);

    // Validate special characters in the hostname
    const validator = inputValidation(name);
    const hasSpecial = validator.hasSpecialCharacter();
    ifTruthyValue(hasSpecial, `The hostname "${hostname}" in the URL "${href}" must contain at least one special character.`);

    // Check if the protocol is 'http:' and the URL is in the correct format
    return protocol === 'http:' && hasHttp;
}

const result = isHttpUrl('HTTP://www.example.com')
console.log('result =>', result);
module.exports = isHttpUrl