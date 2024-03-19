const { UppercaseValidator, LowercaseValidator } = require('./Validators/Case');
const { PasswordValidator, UsernameValidator, HexColorValidator, IPLocationValidator, JSONValidator, NameValidator, AlphanumericValidator, LanguageValidator, GenderValidator, AgeValidator, SameValidator } = require('./Validators/CustomValidators');
const { SpecialCharacterValidator, EmailValidator, DateValidator, URLValidator, PhoneNumberValidator, IPv4Validator, IPv6Validator, HTTPValidator, HTTPSValidator } = require('./Validators/Format');
const { MinLengthValidator, MaxLengthValidator, LengthRangeValidator, DateRangeValidator, ArrayLengthValidator, ArrayRangeValidator,  } = require('./Validators/Length');
const { StringTypeValidator, NumberTypeValidator, ArrayTypeValidator, ObjectTypeValidator, BooleanTypeValidator } = require('./Validators/Type');
const { ObjectKeyValidator } = require('./Validators/object');
const { SQLInjectionValidator, NoSQLInjectionValidator, XSSValidator, PasswordHashValidator, AuthTokenValidator } = require('./Validators/security');
const { WhitespaceValidator, TrimValidator, FileValidator, EnumValidator, RegexValidator } = require('./utils/AdditionalValidators');
/**
 * RequestValidator class for validating incoming request data based on specified rules.
 * @constructor
 * @param {Object} req - The request object containing the data to be validated.
 */
class RequestValidator {
  /**
   * Creates an instance of RequestValidator.
   * @param {Object} req - The request object containing the data to be validated.
   */
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
      lengthRange: new LengthRangeValidator(),
      dateRange: new DateRangeValidator(),
      arrayLength: new ArrayLengthValidator(),
      arrayRange: new ArrayRangeValidator(),
      objectKeys: new ObjectKeyValidator(),

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
      http: new HTTPValidator(),
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
      same: new SameValidator(),

      // Object validators
      objectKeys: new ObjectKeyValidator(),

      // Security validators
      sqlInjection: new SQLInjectionValidator(),
      noSQLInjection: new NoSQLInjectionValidator(),
      xss: new XSSValidator(),
      passwordHash: new PasswordHashValidator(),
      authToken: new AuthTokenValidator(),
    };
  }

  /**
   * Validates the request data based on the specified rules.
   * @param {Object} rules - The validation rules for the request data.
   * @param {Object} [options={}] - Additional options for validation.
   * @param {Object} [options.customMessages={}] - Custom error messages for specific fields.
   * @returns {Object} - An object containing validation errors, if any.
   */
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

module.exports = RequestValidator ;