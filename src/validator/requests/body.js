class ValidationBody {
  constructor(req) {
    this._body = req.body;
    this.validators = {
      required: new RequiredValidator(),
      string: new StringTypeValidator(),
      number: new NumberTypeValidator(),
      min: new MinLengthValidator(),
      max: new MaxLengthValidator(),
      uppercase: new UppercaseValidator(),
      lowercase: new LowercaseValidator(),
      specialCharacter: new SpecialCharacterValidator(),
      whitespace: new WhitespaceValidator(),
      trim: new TrimValidator(),
      email: new EmailValidator(),
      date: new DateValidator(),
      url: new URLValidator(),
      array: new ArrayValidator(),
      object: new ObjectValidator(),
      phoneNumber: new PhoneNumberValidator(),
      file: new FileValidator(),
      boolean: new BooleanValidator(),
      enum: new EnumValidator(),
      regex: new RegexValidator(),
      ipv4: new IPv4Validator(),
      ipv6: new IPv6Validator(),
    };
  }

  validate(rules, options = {}) {
    const { customMessages = {} } = options;
    const errors = {};
    for (const field in rules) {
      const fieldRules = rules[field].split("|");
      for (const rule of fieldRules) {
        const [ruleName, ruleValue] = rule.split(":");
        const validator = this.validators[ruleName];
        if (!validator) {
          throw new Error(`Validation rule '${ruleName}' is not supported.`);
        }
        const error = validator.validate(field, ruleValue, this._body);
        if (error) {
          errors[field] = customMessages[field] ? customMessages[field] : error;
          break;
        }
      }
    }
    return errors;
  }
}

class Validator {
  validate(field, ruleValue, body) {
    throw new Error("Method not implemented.");
  }
}

class RequiredValidator extends Validator {
  validate(field, ruleValue, body) {
    if (!body[field]) {
      return `${field} is required.`;
    }
    return null;
  }
}

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

class MinLengthValidator extends Validator {
  validate(field, ruleValue, body) {
    if (body[field].length < parseInt(ruleValue)) {
      return `${field} must be at least ${ruleValue} characters long.`;
    }
    return null;
  }
}

class MaxLengthValidator extends Validator {
  validate(field, ruleValue, body) {
    if (body[field].length > parseInt(ruleValue)) {
      return `${field} cannot exceed ${ruleValue} characters.`;
    }
    return null;
  }
}

class UppercaseValidator extends Validator {
  validate(field, ruleValue, body) {
    if (!/[A-Z]/.test(body[field])) {
      return `${field} must contain at least one uppercase letter.`;
    }
    return null;
  }
}

class LowercaseValidator extends Validator {
  validate(field, ruleValue, body) {
    if (!/[a-z]/.test(body[field])) {
      return `${field} must contain at least one lowercase letter.`;
    }
    return null;
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
// Example EmailValidator
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

class ArrayValidator extends Validator {
  validate(field, ruleValue, body) {
    // Implement array validation logic here
  }
}

class ObjectValidator extends Validator {
  validate(field, ruleValue, body) {
    // Implement object validation logic here
  }
}

class PhoneNumberValidator extends Validator {
  validate(field, ruleValue, body) {
    // Implement phone number validation logic here
  }
}

class FileValidator extends Validator {
  validate(field, ruleValue, body) {
    // Implement file validation logic here
  }
}

class BooleanValidator extends Validator {
  validate(field, ruleValue, body) {
    // Implement boolean validation logic here
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
class CustomValidator extends Validator {
  validate(field, ruleValue, body) {
    // Implement custom validation logic here based on ruleValue
  }
}
class PasswordValidator extends Validator {
  validate(field, ruleValue, body) {
    // Implement password validation logic here
  }
}
class UsernameValidator extends Validator {
  validate(field, ruleValue, body) {
    // Implement username validation logic here
  }
}
class HexColorValidator extends Validator {
  validate(field, ruleValue, body) {
    // Implement hexadecimal color code validation logic here
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
module.exports = ValidationBody;

router.get("/", (req, res, nxt) => {
  const result = validation(req.body, {
    username: "required|string|min:2|max:10",
    password: "required|number|min:8|max:20|",
    email: "required",
  });
});
