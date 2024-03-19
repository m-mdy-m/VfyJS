const Validator = require("../Validator");

class ObjectKeyValidator extends Validator {
  validate(field, ruleValue, body) {
    const expectedKeys = ruleValue.split(",");
    const actualKeys = Object.keys(body[field]);
    const missingKeys = expectedKeys.filter((key) => !actualKeys.includes(key));
    if (missingKeys.length > 0) {
      return `Missing keys in ${field}: ${missingKeys.join(", ")}.`;
    }
    return null;
  }
}
// Example rule: "user": "objectKeys:id,name,email"

module.exports = { ObjectKeyValidator };
