const Validator = require("../Validator");

class ObjectKeyValidator extends Validator {
  validate(field, ruleValue, body) {
    const expectedKeys = ruleValue.split(",");
    const actualKeys = Object.keys(body[field]);

    // Find missing keys
    const missingKeys = expectedKeys.filter((key) => !actualKeys.includes(key));

    // If missing keys are found, return an error message
    if (missingKeys.length > 0) {
      return `Missing keys in '${field}': ${missingKeys.join(", ")}.`;
    }

    return null; // Return null if all keys are present
  }
}

module.exports = { ObjectKeyValidator };
