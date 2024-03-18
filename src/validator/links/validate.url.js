const inputValidation = require('../../utils/inputValidator');
const { trimmedValue } = require("../../common/validationConstants");
const {
  ifFalsyValue,
  IfNotType,
  IfIsNumber,
  ifTruthyValue,
} = require("../../errors/HandleError");
/**
 * Validates a URL against a specified pattern.
 * @param {RegExp} expectedPattern - The regular expression pattern to match against the URL.
 * @param {string} url - The URL to validate.
 * @param {string} expectedProtocol - The expected protocol name (e.g., "http", "https").
 * @param {RegExp} protocolPattern - The pattern to match the expected protocol.
 * @returns {boolean} - True if the URL matches the pattern and protocol, otherwise false.
 * @throws {Error} - Throws an error if the URL is empty, not a string, or does not match the pattern.
 */
function validateUrl(urlPattern, url, nameUrl,patternFormat) {
  const pattern = urlPattern.test(url);
  ifFalsyValue(
    pattern,
    `The URL must contain the substring "${nameUrl}". Please provide a valid URL.`
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
  ifTruthyValue(protocol.startsWith(nameUrl), `Only ${nameUrl} URLs are allowed.`);
  // Check HTTP format
  const hasHttp = patternFormat.test(url);

  // Validate special characters in the hostname
  const host = hostname.split('.')[1];
  const validator = inputValidation(host);
  const hasSpecial = validator.hasSpecialCharacter();
  ifTruthyValue(hasSpecial, `The hostname "${hostname}" in the URL "${href}" must contain at least one special character.`);

  // Check if the protocol is 'http' and the URL is in the correct format
  return protocol && hasHttp;
}

module.exports = validateUrl;
