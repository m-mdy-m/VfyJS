const inputValidator = require("../../../utils/inputValidator");
const Validator = require("../Validator");
class StringTypeValidator extends Validator {
  validate(field, ruleValue, body) {
    if (typeof body[field] !== "string") {
      return `${field} must be a string.`;
    }
    const validator = inputValidator(field);
    if (!validator.hasAlphanumeric(body[field])) {
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
    // Convert the number to a string for alphanumeric validation
    const valueAsString = body[field].toString();
    const validator = inputValidator(field);
    if (!validator.hasNumeric(valueAsString)) {
      return `${field} must contain only numeric characters.`;
    }
    return null;
  }
}
module.exports = { StringTypeValidator, NumberTypeValidator };
