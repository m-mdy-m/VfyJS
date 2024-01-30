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
function compareArrays(arr1, arr2) {
    const result = {
        isEqualLength: arr1.length === arr2.length,
        values: {}
    };

    if (!result.isEqualLength) {
        result.lengthComparison = "Lengths are not equal";
        return result;
    }

    for (let value of arr1) {
        result.values[value] = {
            inArrayOne: true,
            inArrayTwo: arr2.includes(value)
        };
    }

    for (let value of arr2) {
        if (!result.values.hasOwnProperty(value)) {
            result.values[value] = {
                inArrayOne: false,
                inArrayTwo: true
            };
        }
    }

    result.isEqual = Object.values(result.values).every(val => val.inArrayOne === val.inArrayTwo);
    return result;
}
exports.ConfirmationFields =(fieldOne,fieldTwo)=>{
    if (typeof (fieldOne && fieldTwo) === 'string') {
        fieldOne = trimmedValue(fieldOne);
        fieldTwo = trimmedValue(fieldTwo);
        const isEqualLength = fieldOne.length === fieldTwo.length;
        const isEqual = fieldOne === fieldTwo;
        return isEqual && isEqualLength;
    } else if (Array.isArray(fieldOne) && Array.isArray(fieldTwo)) {
        return compareArrays(fieldOne,fieldTwo)
    } else if (typeof (fieldOne && fieldTwo) === 'boolean') {
        return fieldOne === fieldTwo;
    } else if (typeof (fieldOne && fieldTwo) === 'object') {
        const fieldOneKeys = Object.keys(fieldOne);
        const fieldTwoKeys = Object.keys(fieldTwo);
        if (fieldOneKeys.length !== fieldTwoKeys.length) {
            return false;
        }
        for (let key of fieldOneKeys) {
            if (fieldOne[key] !== fieldTwo[key]) {
                return false;
            }
        }
        return true;
    } else if (typeof (fieldOne && fieldTwo) === 'symbol') {
        return fieldOne === fieldTwo;
    } else if (typeof (fieldOne && fieldTwo) === 'undefined') {
        return fieldOne === fieldTwo;
    } else {
        return false; 
    }
    
}
