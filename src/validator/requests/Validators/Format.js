class EmailValidator extends Validator {
  validate(field, ruleValue, body) {
    const emailPattern = /^\S+@\S+\.\S+$/;
    if (!emailPattern.test(body[field])) {
      return `${field} must be a valid email address.`;
    }
    return null;
  }
}
class DateValidator extends Validator {
  validate(field, ruleValue, body) {
    // Implement URL validation logic here
  }
}

class URLValidator extends Validator {
  validate(field, ruleValue, body) {
    // Implement URL validation logic here
  }
}
class PhoneNumberValidator extends Validator {
  validate(field, ruleValue, body) {
    // Implement phone number validation logic here
  }
}
class IPv4Validator extends Validator {
  validate(field, ruleValue, body) {
    // Implement IPv4 validation logic here
  }
}

class IPv6Validator extends Validator {
  validate(field, ruleValue, body) {
    // Implement IPv6 validation logic here
  }
}
class SpecialCharacterValidator extends Validator {
  validate(field, ruleValue, body) {
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(body[field])) {
      return `${field} must contain at least one special character.`;
    }
    return null;
  }
}
