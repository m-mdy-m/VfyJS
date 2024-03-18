const Validator = require("../Validator");

class UppercaseValidator extends Validator {
  validate(field, ruleValue, body) {
    if (!this.isUppercase(body[field])) {
      return `${field} must contain at least one uppercase letter.`;
    }
    return null;
  }
}

class LowercaseValidator extends Validator {
  validate(field, ruleValue, body) {
    if (!this.isLowerCase(body[field])) {
      return `${field} must contain at least one lowercase letter.`;
    }
    return null;
  }
}

module.exports = { LowercaseValidator, UppercaseValidator };
