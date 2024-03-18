const { trimmedValue } = require("../../common/validationConstants");
const { IfNotType, IfIsNumber, ifTruthyValue, ifFalsyValue } = require("../../errors/HandleError");
const inputValidation = require('../../utils/inputValidator');

/**
 * Validates if the given URL is an HTTP URL.
 *
 * @param {string} url - The URL to be validated.
 * @returns {boolean} Returns true if the URL is a valid HTTP URL, otherwise false.
 * @throws {TypeError} Throws a TypeError if the input is not a string.
 * @throws {Error} Throws an Error if the input is a number or if the protocol is not 'http:'.
 *
 * @example
 * // Example 1: Valid HTTP URL
 * const result1 = isHttp("http://www.example.com");
 * console.log(result1); // Output: true
 *
 * @example
 * // Example 2: Handling an invalid HTTPS URL with try-catch
 * try {
 *   const result2 = isHttp("https://www.example.com");
 *   console.log(result2);
 * } catch (error) {
 *   console.error(error.message); // Output: "Only HTTP URLs are allowed."
 * }
 */
function isHttp(url) {
    // Check if the URL contains the substring "http"
    const isHttp = /(?=.*(HTTP|http))/.test(url);
    ifFalsyValue(isHttp, 'The URL must contain the substring "http". Please provide a valid URL.');

    // Check if the URL is empty
    if (url === "") {
        throw new Error("URL cannot be empty. Please provide a valid URL.");
    }

    // Perform type and numeric checks
    IfNotType('string', url, 'URL must be a string.');
    IfIsNumber(url, 'URL must not be a number.');

    // Trim the URL
    url = trimmedValue(url);

    /**
     * The URL object representing the validated URL.
     * @type {URL}
     */
    let { protocol, hostname, href } = new URL(url);

    // Convert protocol to lowercase and trim
    protocol = protocol.toLowerCase();
    protocol = trimmedValue(protocol);

    /**
     * Validates if the URL uses the 'https' protocol and throws an error if it does.
     */
    ifTruthyValue(protocol.startsWith('https'), "Only HTTP URLs are allowed.");

    // Check HTTP format
    const hasHttp = /(HTTP:|http:)\/\/[^\/]/i.test(url);

    // Validate special characters in the hostname
    const host = hostname.split('.')[1];
    const validator = inputValidation(host);
    const hasSpecial = validator.hasSpecialCharacter();
    ifTruthyValue(hasSpecial, `The hostname "${hostname}" in the URL "${href}" must contain at least one special character.`);

    // Check if the protocol is 'http' and the URL is in the correct format
    return hasHttp;
}
module.exports = isHttp;
