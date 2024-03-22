const validateEmail = require("../../form/email");
const { validateUrl, isHttp, isHttps } = require("../../links/validate.url");
const Validator = require("../Validator");
/**
 * Validator class for validating email fields in the body object.
 * @extends Validator
 */
class EmailValidator extends Validator {
  /**
   * Validates the email field in the body.
   * @param {string} field - The field name to validate.
   * @param {string} ruleValue - The expected rule value (not used in this validator).
   * @param {object} body - The body object containing the field to validate.
   * @param {object} [options={}] - Additional options for email validation (e.g., { ignoreLength: true }).
   * @returns {string|null} - Returns an error message if validation fails, otherwise null.
   */
  validate(field, ruleValue, body, options = {}) {
    try {
      validateEmail(body[field], options);
      return null;
    } catch (error) {
      return error.message;
    }
  }
}

/**
 * Validator subclass for validating date fields in the body object.
 * @extends Validator
 */
class DateValidator extends Validator {
  /**
   * Validates if the specified field value is a valid date.
   * @param {string} field - The field name to validate.
   * @param {string} ruleValue - The expected rule value (not used in this validator).
   * @param {object} body - The object containing the field to validate.
   * @returns {string|null} - Returns an error message if validation fails, otherwise null.
   */
  validate(field, ruleValue, body) {
    if (isNaN(Date.parse(body[field]))) {
      return `${field} must be a valid date.`;
    }
    return null;
  }
}

/**
 * Validator subclass for validating URL fields in the body object.
 * @extends Validator
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
      validateUrl(body[field], ruleValue);
      return null;
    } catch (error) {
      return error.message;
    }
  }
}

/**
 * Validator subclass for validating HTTP URLs.
 * @extends Validator
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
      return null;
    } catch (error) {
      return error.message;
    }
  }
}

/**
 * Validator subclass for validating HTTPS URLs.
 * @extends Validator
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
      return null;
    } catch (error) {
      return error.message;
    }
  }
}

/**
 * Validator subclass for validating phone number fields in the body object.
 * @extends Validator
 */
class PhoneNumberValidator extends Validator {
  /**
   * Validates if the specified field value is a valid phone number.
   * @param {string} field - The field name to validate.
   * @param {string} ruleValue - The expected rule value (not used in this validator).
   * @param {object} body - The object containing the field to validate.
   * @returns {string|null} - Returns an error message if validation fails, otherwise null.
   */
  validate(field, ruleValue, body) {
    try {
      const validationResult = hasPhone(body[field]);
      if (validationResult.isValid) {
        return null;
      } else {
        return validationResult.error;
      }
    } catch (error) {
      return error.message;
    }
  }
}

/**
 * Validator subclass for validating IPv4 address fields in the body object.
 * @extends Validator
 */
class IPv4Validator extends Validator {
  /**
   * Validates if the specified field value is a valid IPv4 address.
   * @param {string} field - The field name to validate.
   * @param {string} ruleValue - The expected rule value (not used in this validator).
   * @param {object} body - The object containing the field to validate.
   * @returns {string|null} - Returns an error message if validation fails, otherwise null.
   */
  validate(field, ruleValue, body) {
    const ipv4Pattern =
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    const ipAddress = body[field];
    const isValidIPv4 = ipv4Pattern.test(ipAddress);
    return isValidIPv4 ? null : "Invalid IPv4 address format.";
  }
}

/**
 * Validator subclass for validating IPv6 address fields in the body object.
 * @extends Validator
 */
class IPv6Validator extends Validator {
  /**
   * Validates if the specified field value is a valid IPv6 address.
   * @param {string} field - The field name to validate.
   * @param {string} ruleValue - The expected rule value (not used in this validator).
   * @param {object} body - The object containing the field to validate.
   * @returns {string|null} - Returns an error message if validation fails, otherwise null.
   */
  validate(field, ruleValue, body) {
    const ipv6Pattern = /^([\da-f]{1,4}:){7}[\da-f]{1,4}$/i;
    const ipAddress = body[field];
    const isValidIPv6 = ipv6Pattern.test(ipAddress);
    return isValidIPv6 ? null : "Invalid IPv6 address format.";
  }
}

/**
 * Validator subclass for validating fields containing special characters in the body object.
 * @extends Validator
 */
class SpecialCharacterValidator extends Validator {
  /**
   * Validates if the specified field value contains at least one special character.
   * @param {string} field - The field name to validate.
   * @param {string} ruleValue - The expected rule value (not used in this validator).
   * @param {object} body - The object containing the field to validate.
   * @returns {string|null} - Returns an error message if validation fails, otherwise null.
   */
  validate(field, ruleValue, body) {
    if (!this.isSpecialChar(body[field])) {
      return `${field} must contain at least one special character.`;
    }
    return null;
  }
}
// exports
module.exports = {
  EmailValidator,
  DateValidator,
  URLValidator,
  HTTPValidator,
  HTTPSValidator,
  PhoneNumberValidator,
  IPv4Validator,
  IPv6Validator,
  SpecialCharacterValidator,
};
