const Validator = require("../Validator");

class StringTypeValidator extends Validator {
  validate(field, ruleValue, body) {
    if (typeof body[field] !== "string") {
      return `${field} must be a string.`;
    }
    return null;
  }
}

class NumberTypeValidator extends Validator {
  validate(field, ruleValue, body) {
    if (typeof body[field] !== "number") {
      return `${field} must be a number.`;
    }
    return null;
  }
}
module.exports = { StringTypeValidator, NumberTypeValidator };
