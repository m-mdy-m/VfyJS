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
    // Implement gender validation logic here
  }
}
class AgeValidator extends Validator {
  validate(field, ruleValue, body) {
    // Implement age validation logic here
  }
}

class DocumentIDValidator extends Validator {
  validate(field, ruleValue, body) {
    // Implement document ID validation logic here
  }
}
