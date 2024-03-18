const Validator = require("../Validator");

class UppercaseValidator extends Validator {
  validate(field, ruleValue, body) {
    if (!/[A-Z]/.test(body[field])) {
      return `${field} must contain at least one uppercase letter.`;
    }
    return null;
  }
}

class LowercaseValidator extends Validator {
  validate(field, ruleValue, body) {
    if (!/[a-z]/.test(body[field])) {
      return `${field} must contain at least one lowercase letter.`;
    }
    return null;
  }
}

module.exports = { LowercaseValidator, UppercaseValidator };
