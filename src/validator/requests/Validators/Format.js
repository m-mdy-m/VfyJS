const Validator = require("../Validator");

class EmailValidator extends Validator {
  validate(field, ruleValue, body, options = {}) {
    return this.isEmail(body[field], options);
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
  validate(field, ruleValue, body) {
    // Regular expression for validating URL format
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;

    // Check if the URL value matches the URL pattern
    if (!urlPattern.test(body[field])) {
      return `${field} must be a valid URL.`;
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
