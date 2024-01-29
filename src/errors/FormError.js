class ValidationError extends Error {
    constructor(message, property, input, errors, validationRule, fieldType, statusError) {
        super(message);
        this.property = property;
        this.input = input;
        this.errors = errors;
        this.value = this.input.value ? this.input.value : 'Input is not a value';
        this.validationRule = validationRule;
        this.fieldType = fieldType;
        this.timestamp = new Date(); 
        this.statusError = statusError;
    }

    getErrorDetails() {
        return {
            property: this.property,
            input: this.input,
            errors: this.errors,
            value: this.value,
            validationRule: this.validationRule,
            fieldType: this.fieldType,
            timestamp: this.timestamp
        };
    }

    getFormattedMessage() {
        return `${this.name} (${this.id}): ${this.message}`;
    }

    logError() {
        return `[${this.timestamp}] ${this.name}: ${this.message}`;
    }

    getInput() {
        return {
            value: this.value,
            errors: this.errors
        };
    }
}
class ValueTypeError extends ValidationError {}

class StringLengthError extends ValidationError {}

class BooleanValueError extends ValidationError {}

module.exports = {
    ValidationError,
    ValueTypeError,
    StringLengthError,
    BooleanValueError
};


exports.ifFalsyValue = (message, property, input, errors, validationRule) => {
    if (!property) {
      throw new BooleanValueError(message, property, input, errors, validationRule, 'boolean', 'Falsy value detected');
    }
    return property;
};
exports.ifTruthyValue = (message, property, input, errors, validationRule) => {
    if (property) {
        throw new BooleanValueError(message, property, input, errors, validationRule, 'boolean', 'Truthy value detected');
    }
};