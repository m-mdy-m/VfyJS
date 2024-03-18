class ValidationBody {
  constructor(req) {
    this._body = req.body;
    this.validators = {
      required: new RequiredValidator(),
      string: new StringTypeValidator(),
      number: new NumberTypeValidator(),
      min: new MinLengthValidator(),
      max: new MaxLengthValidator(),
    };
  }

  validate(rules) {
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
          errors[field] = error;
          break; // Stop further validation for this field if error found
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

module.exports = ValidationBody;

router.get("/", (req, res, nxt) => {
  const result = validation(req.body, {
    username: "required|string|min:2|max:10",
    password: "required|number|min:8|max:20|",
    email: "required",
  });
});
