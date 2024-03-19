const inputValidation = require("../../utils/inputValidator");
const { trimmedValue } = require("../../common/validationConstants");
const {
  ifFalsyValue,
  IfNotType,
  IfIsNumber,
  ifTruthyValue,
} = require("../../errors/HandleError");
/**
 * Validates a URL against a specified pattern.
 * @param {string} url - The URL to validate.
 * @param {string} expectedProtocol - The expected protocol name (e.g., "http", "https").
 * @returns {boolean} - True if the URL matches the pattern and protocol, otherwise false.
 * @throws {Error} - Throws an error if the URL is empty, not a string, or does not match the pattern.
 */
function validateUrl(url, expectedProtocol) {
  let protocolPattern = "";
  let urlPattern = "";
  // Set protocol and URL patterns based on the expected protocol
  if (expectedProtocol === "http") {
    protocolPattern = /^(HTTP|http)$/;
    urlPattern = /(HTTP:|http:)\/\/[^\/]/i;
  } else if (expectedProtocol === "https") {
    protocolPattern = /^(HTTPS|https)$/;
    urlPattern = /(HTTPS:|https:)\/\/[^\/]/i;
  } else {
    throw new Error(
      'Invalid expected protocol. Please provide "http" or "https".'
    );
  }
  console.log("urlPattern=>", urlPattern);
  // Check if the URL matches the expected pattern
  ifFalsyValue(
    urlPattern.test(url),
    `The URL must contain the substring "${expectedProtocol}". Please provide a valid URL.`
  );

  // Check if the URL is empty
  if (url === "") {
    throw new Error("URL cannot be empty. Please provide a valid URL.");
  }

  // Perform type and numeric checks
  IfNotType("string", url, "URL must be a string.");
  IfIsNumber(url, "URL must not be a number.");
  // Trim the URL
  url = trimmedValue(url);

  // Parse the URL
  let { protocol, hostname, href } = new URL(url);

  // Convert protocol to lowercase and trim
  protocol = protocol.toLowerCase().trim();

  // Validate the protocol
  ifTruthyValue(
    protocolPattern.test(protocol),
    `Only ${expectedProtocol} URLs are allowed.`
  );
  // Check URL format against the expected pattern
  const hasCorrectFormat = urlPattern.test(url);

  // Validate special characters in the hostname
  const host = hostname.split(".")[1];
  const validator = inputValidation(host);
  const hasSpecialChars = validator.hasSpecialCharacter();
  ifTruthyValue(
    hasSpecialChars,
    `The hostname "${hostname}" in the URL "${href}" must contain at least one special character.`
  );

  // Return true if the URL has the expected format
  return hasCorrectFormat;
}
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
  return validateUrl(url, "https");
}

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
  return validateUrl(url, "http");
}
module.exports = { isHttp, isHttps: isHttpsUrl, validateUrl };
