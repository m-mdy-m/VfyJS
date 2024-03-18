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
    const file = body[field];
    if (!file || !file.mimetype) {
      return `${field} must be a file.`;
    }
    // Add more file validation logic here if needed
    return null;
  }
}

class EnumValidator extends Validator {
  validate(field, ruleValue, body) {
    const enumValues = ruleValue.split(",");
    if (!enumValues.includes(body[field])) {
      return `${field} must be one of the following values: ${enumValues.join(
        ", "
      )}.`;
    }
    return null;
  }
}

class RegexValidator extends Validator {
  validate(field, ruleValue, body) {
    try {
      const regex = new RegExp(ruleValue);
      if (!regex.test(body[field])) {
        return `${field} does not match the required pattern.`;
      }
      return null;
    } catch (error) {
      // Handle regex compilation errors
      return `Invalid regex pattern for ${field}: ${error.message}`;
    }
  }
}

module.exports = {
  WhitespaceValidator,
  TrimValidator,
  FileValidator,
  EnumValidator,
  RegexValidator,
};
