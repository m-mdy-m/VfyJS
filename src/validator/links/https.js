const validateUrl = require("./validate.url");

/**
 * Validates if the given URL is an HTTPS URL.
 *
 * @param {string} url - The URL to be validated.
 * @returns {boolean} Returns true if the URL is a valid HTTPS URL, otherwise false.
 * @throws {TypeError} Throws a TypeError if the input is not a string.
 * @throws {Error} Throws an Error if the input is a number or if the protocol is not 'https:'.
 *
 * @example
 * // Example 1: Valid HTTPS URL
 * const result1 = isHttps("https://www.example.com");
 * console.log(result1); // Output: true
 *
 * @example
 * // Example 2: Handling an invalid HTTP URL with try-catch
 * try {
 *   const result2 = isHttps("http://www.example.com");
 *   console.log(result2);
 * } catch (error) {
 *   console.error(error.message); // Output: "Only HTTPS URLs are allowed."
 * }
 */
function isHttpsUrl(url) {
    return validateUrl(url,'https')
}
module.exports = isHttpsUrl;