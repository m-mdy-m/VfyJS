const Validator = require("../Validator");

class MinLengthValidator extends Validator {
  validate(field, ruleValue, body) {
    if (typeof body[field] !== "string") {
      return `${field} must be a string.`;
    }

    if (body[field].length < parseInt(ruleValue)) {
      return `${field} must be at least ${ruleValue} characters long.`;
    }

    return null;
  }
}

class MaxLengthValidator extends Validator {
  validate(field, ruleValue, body) {
    if (typeof body[field] !== "string") {
      return `${field} must be a string.`;
    }

    if (body[field].length > parseInt(ruleValue)) {
      return `${field} cannot exceed ${ruleValue} characters.`;
    }

    return null;
  }
}
module.exports = { MaxLengthValidator, MinLengthValidator };
