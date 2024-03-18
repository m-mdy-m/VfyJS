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

class RangeLengthValidator extends Validator {
  validate(field, ruleValue, body) {
    const [minLength, maxLength] = ruleValue.split(",").map(value => parseInt(value));

    // Check if ruleValue is valid
    if (isNaN(minLength) || isNaN(maxLength)) {
      throw new Error(`Invalid rule value for ${field}. Please provide a valid range in the format 'minLength,maxLength'.`);
    }

    const fieldLength = body[field].length;
    if (fieldLength < minLength || fieldLength > maxLength) {
      return `${field} must be between ${minLength} and ${maxLength} characters long.`;
    }
    return null;
  }
}

module.exports = { MaxLengthValidator, MinLengthValidator,RangeLengthValidator };
