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
function compareObjects(obj1, obj2){
    const result = {
        keysInObj1: Object.keys(obj1),
        keysInObj2: Object.keys(obj2),
        isEqual: true,
        values: {}
    };

    // Check if keys are the same
    result.keysInObj1.sort();
    result.keysInObj2.sort();
    result.isEqualKeys = JSON.stringify(result.keysInObj1) === JSON.stringify(result.keysInObj2);

    if (!result.isEqualKeys) {
        result.keyComparison = "Keys are not equal";
        result.isEqual = false;
        return result;
    }

    // Check values for each key
    for (let key of result.keysInObj1) {
        result.values[key] = {
            inObj1: obj1.hasOwnProperty(key),
            inObj2: obj2.hasOwnProperty(key)
        };
        if (result.values[key].inObj1 && result.values[key].inObj2) {
            result.values[key].isEqual = obj1[key] === obj2[key];
            if (!result.values[key].isEqual) {
                result.isEqual = false;
            }
        } else {
            result.isEqual = false;
        }
    }

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
        return compareObjects(fieldOne,fieldTwo)
    } else if (typeof (fieldOne && fieldTwo) === 'symbol') {
        return fieldOne === fieldTwo;
    } else if (typeof (fieldOne && fieldTwo) === 'undefined') {
        return fieldOne === fieldTwo;
    } else {
        return false; 
    }
}
