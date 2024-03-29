const inputValidation = require("../../utils/inputValidator");
const {
  isEmpty,
  ThrowFalsy,
  NotType,
  ThrowTruthy,
} = require("../../errors/Error");
/**
 * Validates a URL against a specified pattern.
 * @param {string} url - The URL to validate.
 * @param {string} expectedProtocol - The expected protocol name (e.g., "http", "https").
 * @returns {boolean} - True if the URL matches the pattern and protocol, otherwise false.
 * @throws {Error} - Throws an error if the URL is empty, not a string, or does not match the pattern.
 */
function validateUrl(url, expectedProtocol) {
  // Trim the expected protocol
  expectedProtocol = expectedProtocol.trim();
  // Check if the URL is empty
  isEmpty(url, "URL cannot be empty. Please provide a valid URL.");
  let protocolPattern = "",urlPattern = "";
  // Set protocol and URL patterns based on the expected protocol
  if (expectedProtocol === "http") {
    protocolPattern = /^(HTTP:|http:)$/;
    urlPattern = /(HTTP:|http:)\/\/[^\/]/i;
  } else if (expectedProtocol === "https") {
    protocolPattern = /^(HTTPS:|https:)$/;
    urlPattern = /(HTTPS:|https:)\/\/[^\/]/i;
  } else {
    throw new Error(
      'Invalid expected protocol. Please provide "http" or "https".'
    );
  }
  ThrowFalsy(
    urlPattern.test(url),
    `Only ${expectedProtocol} URLs are allowed.`
  );

  // Perform type and numeric checks
  NotType(url, "string", "URL must be a string.");
  // Parse the URL
  let { protocol, hostname } = new URL(url);

  // Convert protocol to lowercase and trim
  protocol = protocol.toLowerCase().trim();
  // Validate the protocol
  ThrowFalsy(
    protocolPattern.test(protocol),
    `Only ${expectedProtocol} URLs are allowed.`
  );
  // Validate special characters in the hostname
  const hostnameParts = hostname.split(".");
  if (hostnameParts.length < 2) {
    throw new Error("Invalid hostname in the URL.");
  }
  const domain = hostnameParts.slice(-2).join(".");
  const validator = inputValidation(domain);
  ThrowFalsy(
    validator.hasSpecialCharacter(),
    `The domain "${domain}" must contain at least one special character.`
  );

  // Return true if the URL has the expected format
  return true;
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
function isHttps(url) {
  try {
    return validateUrl(url, "https");
  } catch (error) {
    throw new Error(error.message);
  }
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
  try {
    return validateUrl(url, "http");
  } catch (error) {
    throw new Error(error.message);
  }
}
module.exports = { isHttp, isHttps, validateUrl };