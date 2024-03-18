class ValidationBody {
  constructor(req) {
    this._body = req.body;
    this.validators = {
      // Type validators
      string: new StringTypeValidator(),
      number: new NumberTypeValidator(),

      // Length validators
      min: new MinLengthValidator(),
      max: new MaxLengthValidator(),

      // Case validators
      uppercase: new UppercaseValidator(),
      lowercase: new LowercaseValidator(),

      // Format validators
      specialCharacter: new SpecialCharacterValidator(),
      email: new EmailValidator(),
      date: new DateValidator(),
      url: new URLValidator(),
      phoneNumber: new PhoneNumberValidator(),
      ipv4: new IPv4Validator(),
      ipv6: new IPv6Validator(),

      // Other common validators
      required: new RequiredValidator(),
      whitespace: new WhitespaceValidator(),
      trim: new TrimValidator(),
      array: new ArrayValidator(),
      object: new ObjectValidator(),
      file: new FileValidator(),
      boolean: new BooleanValidator(),
      enum: new EnumValidator(),
      regex: new RegexValidator(),

      // Additional custom validators
      password: new PasswordValidator(),
      username: new UsernameValidator(),
      hexColor: new HexColorValidator(),
      ipLocation: new IPLocationValidator(),
      json: new JSONValidator(),
      name: new NameValidator(),
      alphanumeric: new AlphanumericValidator(),
      language: new LanguageValidator(),
      gender: new GenderValidator(),
      age: new AgeValidator(),
      documentID: new DocumentIDValidator(),
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
class LengthRangeValidator extends Validator {
  validate(field, ruleValue, body) {
    const [minLength, maxLength] = ruleValue.split(",");
    const fieldLength = body[field].length;
    if (
      fieldLength < parseInt(minLength) ||
      fieldLength > parseInt(maxLength)
    ) {
      return `${field} must be between ${minLength} and ${maxLength} characters long.`;
    }
    return null;
  }
}

// Example rule: "age": "lengthRange:18,100"
class DateRangeValidator extends Validator {
  validate(field, ruleValue, body) {
    const [startDate, endDate] = ruleValue.split(",");
    const fieldValue = new Date(body[field]);
    if (fieldValue < new Date(startDate) || fieldValue > new Date(endDate)) {
      return `${field} must be between ${startDate} and ${endDate}.`;
    }
    return null;
  }
}
// Example rule: "birthdate": "dateRange:1900-01-01,2022-12-31"

class ArrayLengthValidator extends Validator {
  validate(field, ruleValue, body) {
    const expectedLength = parseInt(ruleValue);
    if (!Array.isArray(body[field]) || body[field].length !== expectedLength) {
      return `${field} must contain exactly ${expectedLength} elements.`;
    }
    return null;
  }
}

// Example rule: "grades": "arrayLength:5"
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
class UniqueValueValidator extends Validator {
  validate(field, ruleValue, body, dataset) {
    if (dataset.includes(body[field])) {
      return `${field} must be unique.`;
    }
    return null;
  }
}
class FileTypeValidator extends Validator {
  validate(field, ruleValue, body) {
    const allowedTypes = ruleValue.split(",");
    const fileType = body[field].mimetype;
    if (!allowedTypes.includes(fileType)) {
      return `${field} must be of type ${allowedTypes.join(", ")}.`;
    }
    return null;
  }
}
// Example: "avatar:fileType:image/jpeg,image/png" - Validates that 'avatar' file type is either JPEG or PNG.
class FileSizeValidator extends Validator {
  validate(field, ruleValue, body) {
    const maxSize = parseInt(ruleValue); // Max size in bytes
    const fileSize = body[field].size;
    if (fileSize > maxSize) {
      return `${field} exceeds the maximum file size of ${maxSize} bytes.`;
    }
    return null;
  }
}
// Example: "avatar:fileSize:1048576" - Validates that 'avatar' file size does not exceed 1MB.
class SQLInjectionValidator extends Validator {
  validate(field, ruleValue, body) {
    const sqlInjectionPattern =
      /(\b(SELECT|INSERT|UPDATE|DELETE|CREATE|DROP|ALTER)\b)|(--.*)/i;
    if (sqlInjectionPattern.test(body[field])) {
      return `Potential SQL injection detected in ${field}.`;
    }
    return null;
  }
}
// Example: "query:NoSQLSQLInjection" - Validates that 'query' does not contain SQL injection patterns in a NoSQL context.

class NoSQLInjectionValidator extends Validator {
  validate(field, ruleValue, body) {
    const nosqlInjectionPattern = /\$where|javascript:/i;
    if (nosqlInjectionPattern.test(body[field])) {
      return `Potential NoSQL injection detected in ${field}.`;
    }
    return null;
  }
}
// Example: "query:nosqlInjection" - Validates that 'query' does not contain NoSQL injection patterns.

// Example: "search:sqlInjection" - Validates that 'search' input does not contain SQL injection patterns.
class XSSValidator extends Validator {
  validate(field, ruleValue, body) {
    const xssPattern =
      /<script>|<\/script>|<img\s+src\s*=\s*".*?"|onerror\s*=\s*".*?"/i;
    if (xssPattern.test(body[field])) {
      return `Potential XSS attack detected in ${field}.`;
    }
    return null;
  }
}
// Example: "input:xss" - Validates that 'input' does not contain XSS attack payloads.
class SensitiveDataValidator extends Validator {
  validate(field, ruleValue, body) {
    const sensitiveDataPattern = /(creditCard|ssn)/i;
    if (sensitiveDataPattern.test(field)) {
      return `Sensitive data found in ${field}.`;
    }
    return null;
  }
}
// Example: "creditCard:sensitiveData" - Validates that 'creditCard' field does not contain sensitive data.

class HTMLSanitizationValidator extends Validator {
  validate(field, ruleValue, body) {
    const sanitizedValue = sanitizeHTML(body[field]);
    if (body[field] !== sanitizedValue) {
      return `Potential HTML injection detected in ${field}.`;
    }
    return null;
  }
}
// Example: "comment:htmlSanitization" - Validates that 'comment' input is properly sanitized.
class AuthTokenValidator extends Validator {
  validate(field, ruleValue, body) {
    const authTokenPattern = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/;
    if (!authTokenPattern.test(body[field])) {
      return `Invalid authentication token format in ${field}.`;
    }
    // Additional checks for token integrity can be performed here
    return null;
  }
}

// Example: "token:authToken" - Validates the format and integrity of the 'token' input.
class EncryptionValidator extends Validator {
  validate(field, ruleValue, body) {
    const encryptionPattern = /(?:^|\W)encrypted(?:$|\W)/i;
    if (!encryptionPattern.test(field)) {
      return `Field ${field} should be encrypted for sensitive data.`;
    }
    return null;
  }
}
// Example: "password:encryption" - Validates that 'password' field is encrypted.

class RBACValidator extends Validator {
  validate(field, ruleValue, body) {
    // Implement RBAC validation logic here
  }
}
// Example: "adminOnly:rbac" - Validates that 'adminOnly' field is accessible only to admins.
class HTTPSValidator extends Validator {
  validate(field, ruleValue, body) {
    const httpsPattern = /^https:\/\//;
    if (!httpsPattern.test(body[field])) {
      return `URL ${field} must use HTTPS for secure communication.`;
    }
    return null;
  }
}
// Example: "url:https" - Validates that 'url' uses HTTPS protocol.
class PasswordHashValidator extends Validator {
  validate(field, ruleValue, body) {
    const passwordHashPattern = /^\$2[ayb]\$[0-9]{2}\$[A-Za-z0-9/.]{53}$/;
    if (!passwordHashPattern.test(body[field])) {
      return `Password field ${field} must be securely hashed using bcrypt or similar algorithms.`;
    }
    return null;
  }
}
// Example: "password:passwordHash" - Validates that 'password' is securely hashed.

class AccessControlValidator extends Validator {
  validate(field, ruleValue, body) {
    // Implement access control validation logic here
  }
}
// Example: "roleBasedAccess:accessControl" - Validates that 'roleBasedAccess' enforces proper access control mechanisms.

class SameValidator extends Validator {
  validate(field, ruleValue, body) {
    const otherField = ruleValue.trim();
    if (body[field] !== body[otherField]) {
      return `${field} must match ${otherField}.`;
    }
    return null;
  }
}
// Example rule: "confirmPassword: 'required|same:password'"
class ImageDimensionsValidator extends Validator {
    validate(field, ruleValue, body) {
      const [maxWidth, maxHeight] = ruleValue.split(",");
      const { width, height } = body[field].dimensions; // Assuming dimensions are available in the request body
      if (width > parseInt(maxWidth) || height > parseInt(maxHeight)) {
        return `${field} dimensions exceed the maximum allowed dimensions.`;
      }
      return null;
    }
  }
  
  // Example rule: "profilePic:imageDimensions:300,300" // Max width: 300px, Max height: 300px
  
module.exports = ValidationBody;

router.get("/", (req, res, nxt) => {
  const result = validation(req.body, {
    username: "required|string|min:2|max:10",
    password: "required|number|min:8|max:20|",
    email: "required",
  });
});
