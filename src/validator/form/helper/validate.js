const { getRequired, getFalseRequired, getValidValue, isValue, MIN_LENGTH, MAX_LENGTH } = require("../../../common/validationConstants");
const { throwIfFalsy, IfBothTruthy, validateType, validationsLength } = require("../../../errors/FormError");
const { ifTruthyValue, isTypeMismatch } = require("../../../errors/HandleError");
const { getErrorMessage } = require("./getValues");

/**
 * Validates whitespace requirement.
 *
 * @param {Object} trim - Whitespace requirements.
 * @param {Object} validator - Input validator instance.
 * @param {string} messageError - Error message.
 */
function validateWhitespace(trim, validator, messageError) {
    const checkWhiteSpace = getRequired(trim, false);
    if (checkWhiteSpace) {
        throwIfFalsy(!checkWhiteSpace, validator.hasWhitespace(), messageError, 'hasWhitespace', 'cannot contain leading or trailing whitespaces.');
    }
}

/**
 * Validates non-alphanumeric requirement.
 *
 * @param {Object} nonAlphanumeric - Non-alphanumeric requirements.
 * @param {string} input - Input string.
 * @param {string} messageError - Error message.
 */
function validateNonAlphanumeric(nonAlphanumeric, input, messageError) {
    const isNonAlphanumeric = getRequired(nonAlphanumeric, false);
    ifTruthyValue(nonAlphanumeric.errorMessage, isNonAlphanumeric, input, messageError, 'isNonAlphanumeric');
}

/**
 * Validates number requirement.
 *
 * @param {Object} number - Numeric digit requirements.
 * @param {Object} validator - Input validator instance.
 * @param {string} input - Input string.
 * @param {string} messageError - Error message.
 */
function validateNumberRequirement(number, validator, input, messageError) {
    const isNumber = getRequired(number, validator.hasNumber());
    IfBothTruthy(isNumber, validator.hasNumber() && !validator.hasNumeric(), 'must contain at least one number.', input, messageError, 'isNumber');
}

/**
 * Validates repeat requirement.
 *
 * @param {Object} repeat - Consecutive character requirements.
 * @param {Object} validator - Input validator instance.
 * @param {string} input - Input string.
 * @param {string} messageError - Error message.
 */
function validateRepeatRequirement(repeat, validator, input, messageError) {
    const isRepeat = getFalseRequired(repeat, validator.hasRepeat());
    IfBothTruthy(isRepeat, validator.hasRepeat(), 'cannot have consecutive repeated characters.', input, messageError, 'isRepeat');
}

/**
 * Validates length requirements.
 *
 * @param {Object} minLength - Minimum length requirements.
 * @param {Object} maxLength - Maximum length requirements.
 * @param {string} username - Username string.
 * @param {string} input - Input string.
 * @param {string} messageError - Error message.
 */
function validateLengthRequirements(minLength, maxLength, username, input, messageError) {
    let minValue = getValidValue(minLength, minLength);
    let maxValue = getValidValue(maxLength, maxLength);

    const min = isValue(minValue, MIN_LENGTH);
    const max = isValue(maxValue, MAX_LENGTH);

    if (typeof minValue === 'string' || typeof maxValue === 'string') {
        minValue = +minValue;
        maxValue = +maxValue;
    }

    validateType('string', username, getErrorMessage(username), input, messageError, 'Check Type');
    validationsLength(username, null, min, max, `${min} and ${max} must be numeric values or strings.`, input, messageError, 'Validation Length');

    if (typeof max === 'number' && username.length > max) {
        throw new Error('too long.');
    }

    isTypeMismatch('undefined', minValue, "undefined 1");
    isTypeMismatch('undefined', maxValue, "undefined 2");
    isTypeMismatch('boolean', minValue, "boolean 1");
    isTypeMismatch('boolean', maxValue, "boolean 2");
    isTypeMismatch('number', min, "number 1");
    isTypeMismatch('number', max, "number 2");
}

module.exports= {validateWhitespace,
    validateNonAlphanumeric,
    validateNumberRequirement,
    validateRepeatRequirement,
    validateLengthRequirements,
}