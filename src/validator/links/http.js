const validateUrl = require("./validate.url");

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
    return validateUrl(/(?=.*(HTTP|http))/,url,'http',/(HTTP:|http:)\/\/[^\/]/i);
}
module.exports = isHttp;
