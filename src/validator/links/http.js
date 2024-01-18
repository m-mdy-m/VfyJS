const { IfNotType, IfIsNumber } = require("../../errors/HandleError")
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
function isHttpUrl(url){
    const { protocol } = new URL(url);
    const hasHttp = /^http:\/\/[a-zA-Z0-9-]+(\.[a-z]{2,})+$/.test(url);
    IfNotType('string', url, 'URL must be a string.');
    IfIsNumber(url, 'URL must not be a number.');

    return protocol === 'http:' && hasHttp;

}
const result = isHttpUrl("https://www.example.com");
console.log('result =>', result);


module.exports = isHttpUrl