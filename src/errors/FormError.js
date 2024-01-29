class CustomError extends Error {
    constructor(message, property) {
        super(message);
        this.property = property;
    }
}

class TypeValueError extends CustomError {}

module.exports = {
    CustomError,
    TypeValueError
};
