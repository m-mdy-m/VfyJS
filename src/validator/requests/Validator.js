const inputValidator = require("../../utils/inputValidator");

class Validator {
  constructor(field) {
    this.field = field;
    this.validator = inputValidator(field);
  }
  validate() {
    throw new Error("Method not implemented.");
  }
  isAlpha(value) {
    return this.validator.hasAlphanumeric(value);
  }

  isNumeric(value) {
    return this.validator.hasNumeric(value);
  }
}

module.exports = Validator;
