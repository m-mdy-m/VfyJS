const validateEmail = require("../../form/email");
const { validateUrl, isHttp, isHttps } = require("../../links/validate.url");
const Validator = require("../Validator");

class EmailValidator extends Validator {
  validate(field, ruleValue, body, options = {}) {
    return validateEmail(body[field], options);
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
      if (!isHttp(body[field])) {
        throw new Error(`${field} must be an HTTP URL.`);
      }
      return null;
    } catch (error) {
      return error.message;
    }
  }
}

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
      if (!isHttps(body[field])) {
        throw new Error(`${field} must be an HTTPS URL.`);
      }
      return null;
    } catch (error) {
      return error.message;
    }
  }
}
class PhoneNumberValidator extends Validator {
  validate(field, ruleValue, body) {
    // Implement phone number validation logic here
  }
}
class IPv4Validator extends Validator {
  validate(field, ruleValue, body) {
    // Implement IPv4 validation logic here
  }
}

class IPv6Validator extends Validator {
  validate(field, ruleValue, body) {
    // Implement IPv6 validation logic here
  }
}
class SpecialCharacterValidator extends Validator {
  validate(field, ruleValue, body) {
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(body[field])) {
      return `${field} must contain at least one special character.`;
    }
    return null;
  }
}
