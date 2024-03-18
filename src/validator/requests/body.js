class ValidationBody {
    constructor(req) {
        this._body = req.body;
    }

    validate(rules) {
        const errors = {};
        for (const field in rules) {
            const fieldRules = rules[field].split('|');
            for (const rule of fieldRules) {
                const [ruleName, ruleValue] = rule.split(':');
                const validationMethod = this.getValidationMethod(ruleName);
                if (validationMethod) {
                    const error = validationMethod(field, ruleValue);
                    if (error) {
                        errors[field] = error;
                        break; // Stop further validation for this field if error found
                    }
                } else {
                    throw new Error(`Validation rule '${ruleName}' is not supported.`);
                }
            }
        }
        return errors;
    }

    getValidationMethod(ruleName) {
        switch (ruleName) {
            case 'required':
                return this.validateRequired;
            case 'string':
                return this.validateString;
            case 'number':
                return this.validateNumber;
            case 'min':
                return this.validateMin;
            case 'max':
                return this.validateMax;
            default:
                return null;
        }
    }

    validateRequired(field, ruleValue) {
        if (!this._body[field]) {
            return `${field} is required.`;
        }
        return null;
    }

    validateString(field) {
        if (typeof this._body[field] !== 'string') {
            return `${field} must be a string.`;
        }
        return null;
    }

    validateNumber(field) {
        if (typeof this._body[field] !== 'number') {
            return `${field} must be a number.`;
        }
        return null;
    }

    validateMin(field, ruleValue) {
        if (this._body[field].length < parseInt(ruleValue)) {
            return `${field} must be at least ${ruleValue} characters long.`;
        }
        return null;
    }

    validateMax(field, ruleValue) {
        if (this._body[field].length > parseInt(ruleValue)) {
            return `${field} cannot exceed ${ruleValue} characters.`;
        }
        return null;
    }
}

module.exports = ValidationBody;

router.get('/',(req,res,nxt)=>{
    const result = validation(req.body,{
        username : "required|string|min:2|max:10",
        password: "required|number|min:8|max:20|",
        email : "required"
    })
})