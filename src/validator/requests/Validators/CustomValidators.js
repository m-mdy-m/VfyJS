const { validateLength } = require("../../../errors/HandleError");
const checkValueColor = require("../../colors/isColor");
const validateFormPassword = require("../../form/password");
const validateUsername = require("../../form/username");
const Validator = require("../Validator");

class PasswordValidator extends Validator {
  validate(field, ruleValue, body,options={}) {
    try {
      validateFormPassword(body[field],options)
      return null
    } catch (error) {
      return error.message
    }
  }
}
class UsernameValidator extends Validator {
  validate(field, ruleValue, body,options) {
   try {
    validateUsername(body[field],options)
  } catch (error) {
    return error.message
   }
  }
}
class HexColorValidator extends Validator {
  validate(field, ruleValue, body) {
    try {
      checkValueColor(body[field])
      return null
    } catch (error) {
      return error.message
    }
  }
}
class IPLocationValidator extends Validator {
  validate(field, ruleValue, body) {
    // Implement IP location validation logic here
  }
}
class JSONValidator extends Validator {
  validate(field, ruleValue, body) {
    // Implement JSON validation logic here
  }
}
class NameValidator extends Validator {
  validate(field, ruleValue, body) {
    // Implement name validation logic here
  }
}
class AlphanumericValidator extends Validator {
  validate(field, ruleValue, body) {
    // Implement alphanumeric validation logic here
  }
}
class LanguageValidator extends Validator {
  validate(field, ruleValue, body) {
    // Implement language code validation logic here
  }
}
class GenderValidator extends Validator {
  validate(field, ruleValue, body) {
    const gender = body[field];

    if (typeof gender !== 'string') {
      return `${field} must be a string representing gender.`;
    }

    // Assuming gender must be one of these values: 'male', 'female'
    const validGenders = ['male', 'female'];

    if (!validGenders.includes(gender.toLowerCase())) {
      return `${field} must be one of the following values: ${validGenders.join(', ')}.`;
    }

    return null; // Indicates no validation error
  }
}

class AgeValidator extends Validator {
  validate(field, ruleValue, body, options = {}) {
    const age = body[field];

    if (typeof age !== 'number' || isNaN(age)) {
      return `${field} must be a valid number representing age.`;
    }

    const minAge = options.min || 0;
    const maxAge = options.max || Number.POSITIVE_INFINITY;

    if (age < minAge || age > maxAge) {
      return `${field} must be between ${minAge} and ${maxAge} years old.`;
    }

    return null; // Indicates no validation error
  }
}

class DocumentIDValidator extends Validator {
  validate(field, ruleValue, body) {
    // Implement document ID validation logic here
  }
}
