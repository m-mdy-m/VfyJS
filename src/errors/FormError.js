const { toString } = require("../validator/form/helper/dataConversion");

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



exports.throwIfFalsy=(property, input, errors, validationRule,message) => {
    if (!property) {
      throw new BooleanValueError(message ||  'Invalid value (Falsy)', property, input, errors, validationRule, 'boolean', 'Falsy value detected');
    }
    return property;
};

exports.ifTruthyValue = (message, property, input, errors, validationRule) => {
    if (property) {
        throw new BooleanValueError(message|| 'Invalid value (Truthy)', property, input, errors, validationRule, 'boolean', 'Truthy value detected');
    }
};
exports.validateWithCondition = (condition, validatorFunction, input, msgError, validationRule, errorMessage) =>{
    this.throwIfFalsy(condition ? validatorFunction : true, input, msgError, validationRule, errorMessage);
}
exports.validateType  = (expectedType, property, message, input, errors, validationRule) => {
    if (typeof property !== expectedType) {
        throw new ValueTypeError(property, message || `Value should be of type ${expectedType}`, input, errors, validationRule, 'type', 'Type mismatch');
    }
};

exports.validationsLength = (value,options={}, minLength, maxLength, message, input, errors, validationRule) => {
    const length = typeof value === 'string' ? value.length : toString(value).length;
    if (options) {
        if (options.min && length < options.min) {
            throw new StringLengthError(value, options.minMessage || `Length must be at least ${options.min} characters.`,input,errors,validationRule,'Option Length','Length out of range');
          }
        
         if (options.max && length > options.max) {
            throw new StringLengthError(value, options.maxMessage || `Length must be at most ${options.max} characters.`,input,errors,validationRule,'Option Length','Length out of range');
          }
    }else{
        if (length < minLength || length > maxLength) {
            throw new StringLengthError(message || `Value must be between ${minLength} and ${maxLength} characters long`, value, input, errors, validationRule, 'length', 'Length out of range');
        }
    }
};
exports.IfBothTruthy = (property, method, message,input,errors,validationRule) => {
    if (property) {
      if (method) {
        this.ifTruthyValue(message || 'Invalid Input',property,input,errors,validationRule);
      }
    }
  };
  exports.TypeMatches = (property,expectedType,message,input,errors,validationRule)=>{
    if (typeof property === expectedType) {
        throw new ValueTypeError(property, message || `Value should be of type ${expectedType}`,input,errors,validationRule,'Type','Type Match');
      }
  }
