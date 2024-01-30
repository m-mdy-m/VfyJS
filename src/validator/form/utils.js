const { trimmedValue } = require("../../common/validationConstants");
const inputValidator = require("../../utils/inputValidator");
const { toString } = require("./helper/dataConversion");

/**
 * Checks if a value represents a valid name.
 * @param {string} value - The value to be checked.
 * @returns {Object} An object containing validation results.
 */
exports.isName = (value) => {
    // Trim the value
    value = trimmedValue(value);
    
    // Initialize validator with the string representation of the value
    const validator = inputValidator(toString(value)); 
    
    // Check various criteria
    const hasAlphabetic = validator.hasAlphabetic();
    const isSpecial = validator.hasSpecialCharacter();
    const hasNumber = validator.hasNumber();
    const hasUppercase = validator.hasUppercase();
    const hasLowerCase = validator.hasLowerCase();
    const isValid = hasAlphabetic && !isSpecial && !hasNumber && (hasUppercase || hasLowerCase);
    
    // Return validation results
    return {
        isSpecialCharacter: isSpecial,
        hasNumber,
        hasUppercase,
        hasLowerCase,
        hasAlphabetic,
        isValidName: isValid,
    }; 
};

/**
 * Compares two arrays and provides detailed comparison results.
 * @param {Array} arr1 - The first array to compare.
 * @param {Array} arr2 - The second array to compare.
 * @returns {Object} An object containing comparison results.
 */
function compareArrays(arr1, arr2) {
    const result = {
        isEqualLength: arr1.length === arr2.length,
        values: {}
    };

    // Check if lengths are equal
    if (!result.isEqualLength) {
        result.lengthComparison = "Lengths are not equal";
        return result;
    }

    // Check values in both arrays
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

    // Check if arrays are equal
    result.isEqual = Object.values(result.values).every(val => val.inArrayOne === val.inArrayTwo);
    return result;
}

/**
 * Compares two objects and provides detailed comparison results.
 * @param {Object} obj1 - The first object to compare.
 * @param {Object} obj2 - The second object to compare.
 * @returns {Object} An object containing comparison results.
 */
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

    // If keys are not equal, return comparison result
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

/**
 * Compares two fields and provides detailed comparison results.
 *
 * @param {*} fieldOne - The first field to compare.
 * @param {*} fieldTwo - The second field to compare.
 *
 * @returns {boolean|Object}
 *   - Returns `true` if fields are equal.
 *   - Returns a comparison result object otherwise.
 *
 * @typedef {Object} ComparisonResult
 * @property {boolean} isEqualLength - Indicates if lengths are equal (for arrays or strings).
 * @property {boolean} isEqual - Indicates if the fields are equal (for strings, booleans, symbols, or undefined).
 * @property {string} [lengthComparison] - Describes the length comparison result.
 * @property {Object} [values] - Object containing detailed comparison results for each element or key.
 * @property {boolean} [isEqualKeys] - Indicates if keys in objects are equal.
 * @property {string} [keyComparison] - Describes the key comparison result.
 *
 * @typedef {Object} ArrayComparisonResult
 * @property {boolean} isEqualLength - Indicates if lengths of arrays are equal.
 * @property {Object} values - Object containing detailed comparison results for each element.
 * @property {boolean} isEqual - Indicates if arrays are equal.
 *
 * @typedef {Object} ObjectComparisonResult
 * @property {string[]} keysInObj1 - Keys present in the first object.
 * @property {string[]} keysInObj2 - Keys present in the second object.
 * @property {boolean} isEqualKeys - Indicates if keys in objects are equal.
 * @property {boolean} isEqual - Indicates if objects are equal.
 * @property {Object} values - Object containing detailed comparison results for each key.
 */
exports.ConfirmationFields = (fieldOne, fieldTwo) => {
    const typeOne = typeof fieldOne;
    const typeTwo = typeof fieldTwo;

    if (typeOne === 'string' && typeTwo === 'string') {
        fieldOne = trimmedValue(fieldOne);
        fieldTwo = trimmedValue(fieldTwo);
        const isEqualLength = fieldOne.length === fieldTwo.length;
        const isEqual = fieldOne === fieldTwo;
        return isEqual && isEqualLength;
    } else if (Array.isArray(fieldOne) && Array.isArray(fieldTwo)) {
        return compareArrays(fieldOne, fieldTwo);
    } else if (typeOne === 'boolean' && typeTwo === 'boolean') {
        return fieldOne === fieldTwo;
    } else if (typeOne === 'object' && typeTwo === 'object') {
        return compareObjects(fieldOne, fieldTwo);
    } else if (typeOne === 'symbol' && typeTwo === 'symbol') {
        return fieldOne.description === fieldTwo.description;
    } else if (typeOne === 'undefined' && typeTwo === 'undefined') {
        return fieldOne === fieldTwo;
    } else {
        return false; 
    }
}
