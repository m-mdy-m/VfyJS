const { trimmedValue } = require("../../common/validationConstants")
const inputValidator = require("../../utils/inputValidator")
const { toString } = require("./helper/dataConversion")

exports.isName = (value) => {
    value = trimmedValue(value)
    const validator = inputValidator(toString(value)); 
    const hasAlphabetic = validator.hasAlphabetic();
    let isValid = false
    const isSpecial = validator.hasSpecialCharacter()
    const hasNumber = validator.hasNumber()
    const hasUppercase = validator.hasUppercase()
    const hasLowerCase = validator.hasLowerCase()
    isValid = hasAlphabetic && !isSpecial&&!hasNumber && (hasUppercase || hasLowerCase)
    return {
        isSpecialCharacter: isSpecial,
        hasNumber,
        hasUppercase,
        hasLowerCase,
        hasAlphabetic : hasAlphabetic,
        isValidName : isValid,
    }; 
};
// Example usage:
const result1 = exports.isName('mahdi2222');
console.log('result1:', result1); // Logs false

const result2 = exports.isName('mahdi');
console.log('result2:', result2); // Logs true