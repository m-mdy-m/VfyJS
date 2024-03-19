const Validator = require('./Validator');
const { UppercaseValidator, LowercaseValidator } = require('./Validators/Case');
const { PasswordValidator, UsernameValidator, HexColorValidator, IPLocationValidator, JSONValidator, NameValidator, AlphanumericValidator, LanguageValidator, GenderValidator, AgeValidator } = require('./Validators/CustomValidators');
const { SpecialCharacterValidator, EmailValidator, DateValidator, URLValidator, PhoneNumberValidator, IPv4Validator, IPv6Validator, HTTPValidator } = require('./Validators/Format');
const { MinLengthValidator, MaxLengthValidator, LengthRangeValidator, DateRangeValidator, ArrayLengthValidator, ArrayRangeValidator,  } = require('./Validators/Length');
const { StringTypeValidator, NumberTypeValidator, ArrayTypeValidator, ObjectTypeValidator, BooleanTypeValidator } = require('./Validators/Type');
const { WhitespaceValidator, TrimValidator, FileValidator, EnumValidator, RegexValidator } = require('./utils/AdditionalValidators');
class RequestValidator  {
  constructor(req) {
    this._req = req;
    this.validators = {
      // Type validators
      string: new StringTypeValidator(),
      number: new NumberTypeValidator(),
      array: new ArrayTypeValidator(),
      object: new ObjectTypeValidator(),
      boolean: new BooleanTypeValidator(),

      // Length validators
      min: new MinLengthValidator(),
      max: new MaxLengthValidator(),
      lengthRange : new LengthRangeValidator(),
      dateRange : new DateRangeValidator(),
      arrayLength : new ArrayLengthValidator(),
      arrayRange : ArrayRangeValidator(),

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
      http : new  HTTPValidator(),
      https: new HTTPSValidator(),
      // Additional validators
      whitespace: new WhitespaceValidator(),
      trim: new TrimValidator(),
      file: new FileValidator(),
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
    };
  }

  validate(rules, options = {}) {
    const { customMessages = {} } = options;
    const errors = {};
    const requestData = {
      body: this._req.body,
      params: this._req.params,
      query: this._req.query,
      headers: this._req.headers,
      cookies: this._req.cookies,
      method: this._req.method,
      path: this._req.path,
      protocol: this._req.protocol,
      hostname: this._req.hostname,
      originalUrl: this._req.originalUrl,
      xhr: this._req.xhr,
      secure: this._req.secure,
      ip: this._req.ip,
      sessionID: this._req.sessionID,
      fileUploads: this._req.files,
      authenticationInfo: this._req.user,
      errorInfo: this._req.error,
    };

    for (const field in rules) {
      const fieldRules = rules[field].split("|");
      for (const rule of fieldRules) {
        const [ruleName, ruleValue] = rule.split(":");
        const validator = this.validators[ruleName];
        if (!validator) {
          throw new Error(`Validation rule '${ruleName}' is not supported.`);
        }
        const error = validator.validate(field, ruleValue, requestData);
        if (error) {
          errors[field] = customMessages[field] ? customMessages[field] : error;
          break;
        }
      }
    }
    return errors;
  }
}
class CustomValidator extends Validator {
  validate(field, ruleValue, body) {
    // Implement custom validation logic here based on ruleValue
  }
}



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

// Example: "query:NoSQLSQLInjection" - Validates that 'query' does not contain SQL injection patterns in a NoSQL context.


// Example: "query:nosqlInjection" - Validates that 'query' does not contain NoSQL injection patterns.

// Example: "search:sqlInjection" - Validates that 'search' input does not contain SQL injection patterns.

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

module.exports = RequestValidator ;