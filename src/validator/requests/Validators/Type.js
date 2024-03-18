const Validator = require("../Validator");
class StringTypeValidator extends Validator {
  validate(field, ruleValue, body) {
    if (typeof body[field] !== "string") {
      return `${field} must be a string.`;
    }
    if (!this.isAlphaNumeric(body[field])) {
      return `${field} must contain only alphanumeric characters.`;
    }

    return null;
  }
}

class NumberTypeValidator extends Validator {
  validate(field, ruleValue, body) {
    if (typeof body[field] !== "number") {
      return `${field} must be a number.`;
    }
    const valueAsString = body[field].toString();
    if (!this.isNumeric(valueAsString)) {
      return `${field} must contain only numeric characters.`;
    }
    return null;
  }
}
module.exports = { StringTypeValidator, NumberTypeValidator };
