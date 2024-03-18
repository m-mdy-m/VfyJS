const validateEmail = require("../../form/email");
const { validateUrl, isHttp, isHttps } = require("../../links/validate.url");
const { hasPhone } = require("../../phone/utils/GlobalValidation");
const Validator = require("../Validator");
class EmailValidator extends Validator {
  validate(field, ruleValue, body, options = {}) {
    try {
      validateEmail(body[field], options)
      return null
    } catch (error) {
        return error.message
    }
  }
}
class DateValidator extends Validator {
  validate(field, ruleValue, body) {
    // Check if the date value is a valid date
    if (isNaN(Date.parse(body[field]))) {
      return `${field} must be a valid date.`;
    }
    return null;
  }
}
/**
 * Validator subclass for validating URL fields in the body object.
 */
class URLValidator extends Validator {
  /**
   * Validates the URL field in the body.
   * @param {string} field - The field name to validate.
   * @param {string} ruleValue - The expected protocol ("http" or "https").
   * @param {object} body - The body object containing the field to validate.
   * @returns {string|null} - Returns an error message if validation fails, otherwise null.
   */
  validate(field, ruleValue, body) {
    try {
      // Call the validateUrl function with the provided field value and expected protocol
      validateUrl(body[field], ruleValue);
      // Return null if validation succeeds
      return null;
    } catch (error) {
      // Return the error message if validation fails
      return error.message;
    }
  }
}
/**
 * Validator subclass for validating HTTP URLs.
 */
class HTTPValidator extends Validator {
  /**
   * Validates if the specified field value is an HTTP URL.
   * @param {string} field - The field name to validate.
   * @param {string} ruleValue - The expected rule value (not used in this validator).
   * @param {object} body - The object containing the field to validate.
   * @returns {string|null} - Returns an error message if validation fails, otherwise null.
   */
  validate(field, ruleValue, body) {
    try {
      isHttp(body[field]);
      // Return null if validation succeeds
      return null;
    } catch (error) {
      return error.message;
    }
  }
}

/**
 * Validator subclass for validating HTTPS URLs.
 */
class HTTPSValidator extends Validator {
  /**
   * Validates if the specified field value is an HTTPS URL.
   * @param {string} field - The field name to validate.
   * @param {string} ruleValue - The expected rule value (not used in this validator).
   * @param {object} body - The object containing the field to validate.
   * @returns {string|null} - Returns an error message if validation fails, otherwise null.
   */
  validate(field, ruleValue, body) {
    try {
      isHttps(body[field]);
      // Return null if validation succeeds
      return null;
    } catch (error) {
      return error.message;
    }
  }
}
class PhoneNumberValidator extends Validator {
  validate(field, ruleValue, body) {
    try {
      const validationResult = hasPhone(body[field]);
      if (validationResult.isValid) {
        return null; // No error if phone number is valid
      } else {
        return validationResult.error; // Return error message if phone number is invalid
      }
    } catch (error) {
      return error.message; // Return error message if an exception occurs
    }
  }
}
class IPv4Validator extends Validator {
  validate(field, ruleValue, body) {
    // Regular expression pattern for IPv4 validation
    const ipv4Pattern =
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

    // Get the IP address value from the body
    const ipAddress = body[field];

    // Check if the IP address matches the IPv4 pattern
    const isValidIPv4 = ipv4Pattern.test(ipAddress);

    // Return null if validation succeeds, otherwise return an error message
    return isValidIPv4 ? null : "Invalid IPv4 address format.";
  }
}

class IPv6Validator extends Validator {
  validate(field, ruleValue, body) {
    // Regular expression pattern for IPv6 validation
    const ipv6Pattern = /^([\da-f]{1,4}:){7}[\da-f]{1,4}$/i;

    // Get the IP address value from the body
    const ipAddress = body[field];

    // Check if the IP address matches the IPv6 pattern
    const isValidIPv6 = ipv6Pattern.test(ipAddress);

    // Return null if validation succeeds, otherwise return an error message
    return isValidIPv6 ? null : "Invalid IPv6 address format.";
  }
}

class SpecialCharacterValidator extends Validator {
  validate(field, ruleValue, body) {
    if (!this.isSpecialChar(body[field])) {
      return `${field} must contain at least one special character.`;
    }
    return null;
  }
}
