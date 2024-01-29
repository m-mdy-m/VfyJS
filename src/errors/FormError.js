class CustomError extends Error {
    constructor(message, property,input,Errors,value,validationRule,fieldType) {
        super(message);
        this.property = property;
        this.input = input;
        this.Errors = Errors;
        this.value = value;
        this.validationRule = validationRule;
        this.fieldType = fieldType;
        this.timestamp = new Date(); 
    }
    getErrorDetails() {
        return {
            property: this.property,
            input: this.input,
            Errors: this.Errors,
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
    getInput(){
        return `${this.input}:is Errors ${this.Errors}`
    }
}

class TypeValueError extends CustomError {}


class LengthError extends CustomError{}
module.exports = {
    CustomError,
    TypeValueError,
    LengthError,
};
