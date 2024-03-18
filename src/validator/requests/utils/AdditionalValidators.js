const Validator = require("../Validator");

class WhitespaceValidator extends Validator {
  validate(field, ruleValue, body) {
    if (/\s/.test(body[field])) {
      return `${field} cannot contain whitespace.`;
    }
    return null;
  }
}

class TrimValidator extends Validator {
    validate(field, ruleValue, body) {
      if (body[field].trim() !== body[field]) {
        return `${field} cannot have leading or trailing whitespace.`;
      }
      return null;
    }
  }

class FileValidator extends Validator {
  validate(field, ruleValue, body) {
    // Implement file validation logic here
  }
}

class EnumValidator extends Validator {
  validate(field, ruleValue, body) {
    // Implement enum validation logic here
  }
}

class RegexValidator extends Validator {
  validate(field, ruleValue, body) {
    // Implement regex validation logic here
  }
}

module.exports = {
  WhitespaceValidator,
  TrimValidator,
  FileValidator,
  EnumValidator,
  RegexValidator,
};
