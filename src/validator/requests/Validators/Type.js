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
class BooleanTypeValidator extends Validator {
  validate(field, ruleValue, body) {
    // Implement boolean validation logic here
  }
}
class ObjectTypeValidator extends Validator {
  validate(field, ruleValue, body) {
    if (
      typeof body[field] !== "object" ||
      body[field] === null ||
      Array.isArray(body[field])
    ) {
      return `${field} must be an object.`;
    }
    return null;
  }
}
class ArrayTypeValidator extends Validator {
  validate(field, ruleValue, body) {
    if (!Array.isArray(body[field])) {
      return `${field} must be an array.`;
    }
    return null;
  }
}
class FunctionTypeValidator extends Validator {
  validate(field, ruleValue, body) {
    if (typeof body[field] !== "function") {
      return `${field} must be a function.`;
    }
    return null;
  }
}
module.exports = { StringTypeValidator, NumberTypeValidator };
