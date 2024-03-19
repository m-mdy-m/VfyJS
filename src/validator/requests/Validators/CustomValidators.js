const checkValueColor = require("../../colors/isColor");
const validateFormPassword = require("../../form/password");
const validateUsername = require("../../form/username");
const { isName } = require("../../form/utils");
const Validator = require("../Validator");

class PasswordValidator extends Validator {
  validate(field, ruleValue, body, options = {}) {
    try {
      validateFormPassword(body[field], options);
      return null;
    } catch (error) {
      return error.message;
    }
  }
}
class UsernameValidator extends Validator {
  validate(field, ruleValue, body, options) {
    try {
      validateUsername(body.body[field], options);
      return null;
    } catch (error) {
      return error.message;
    }
  }
}
class HexColorValidator extends Validator {
  validate(field, ruleValue, body) {
    try {
      checkValueColor(body[field]);
      return null;
    } catch (error) {
      return error.message;
    }
  }
}
class IPLocationValidator extends Validator {
  validate(field, ruleValue, body) {
    const ipAddress = body[field];
    if (!ipAddress) {
      return `${field} is required.`;
    }

    // Regular expression pattern for IPv4 and IPv6 addresses
    const ipPattern =
      /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$|^([0-9a-fA-F]{1,4}:){7}([0-9a-fA-F]{1,4})$/;

    // Check if the provided IP address matches the pattern
    if (!ipPattern.test(ipAddress)) {
      return `Invalid format for ${field}. Please provide a valid IP address.`;
    }

    // If the IP address format is valid, return null (indicating no validation errors)
    return null;
  }
}
class JSONValidator extends Validator {
  validate(field, ruleValue, body) {
    const jsonData = body[field];
    if (!jsonData) {
      return `${field} is required.`;
    }
    // Implement JSON validation logic here
    // Example: Check if jsonData is a valid JSON object
    try {
      JSON.parse(jsonData);
      return null; // JSON is valid
    } catch (error) {
      return `${field} must be a valid JSON object.`;
    }
  }
}
class NameValidator extends Validator {
  validate(field, ruleValue, body) {
    const value = body[field];
    const validationResults = isName(value);
    if (!validationResults.isValid) {
      return `${field} must be a valid name.`;
    }
    return null;
  }
}
class AlphanumericValidator extends Validator {
  validate(field, ruleValue, body) {
    const value = body[field];

    if (typeof value !== "string") {
      return `${field} must be a string containing alphanumeric characters only.`;
    }

    // Example: Validate if value contains only alphanumeric characters
    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    if (!alphanumericRegex.test(value)) {
      return `${field} must contain only alphanumeric characters.`;
    }

    return null;
  }
}

class LanguageValidator extends Validator {
  validate(field, ruleValue, body) {
    const languageCode = body[field];

    if (typeof languageCode !== "string") {
      return `${field} must be a string representing a language code.`;
    }
    if (languageCode.length !== 2 && languageCode.length !== 3) {
      return `${field} must consist of either 2 or 3 characters.`;
    }
    return null;
  }
}

class GenderValidator extends Validator {
  validate(field, ruleValue, body) {
    const gender = body[field];

    if (typeof gender !== "string") {
      return `${field} must be a string representing gender.`;
    }

    // Assuming gender must be one of these values: 'male', 'female'
    const validGenders = ["male", "female"];

    if (!validGenders.includes(gender.toLowerCase())) {
      return `${field} must be one of the following values: ${validGenders.join(
        ", "
      )}.`;
    }

    return null; // Indicates no validation error
  }
}

class AgeValidator extends Validator {
  validate(field, ruleValue, body, options = {}) {
    const age = body[field];

    if (typeof age !== "number" || isNaN(age)) {
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

class SameValidator extends Validator {
  validate(field, ruleValue, body) {
    const otherField = ruleValue.trim();

    // Check if the other field exists in the body
    if (!(otherField in body)) {
      throw new Error(
        `Validation rule error: Field '${otherField}' specified in 'same' rule does not exist in the request body.`
      );
    }

    // Compare the values of the current field and the other field
    if (body[field] !== body[otherField]) {
      return `${field} must match ${otherField}.`;
    }

    return null; // Return null if validation passes
  }
}
module.exports = {
  PasswordValidator,
  UsernameValidator,
  HexColorValidator,
  IPLocationValidator,
  JSONValidator,
  NameValidator,
  AlphanumericValidator,
  LanguageValidator,
  GenderValidator,
  AgeValidator,
  SameValidator,
};
