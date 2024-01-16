const {MAX_LENGTH,MIN_LENGTH,trimmedValue,} = require("../../common/validationConstants");
const inputValidator = require("../../utils/inputValidator");
const createValidationOptions = require('../../utils/handleOption')
const { handleValidationError } = require("../../errors/HandleError");
function validateUsername(username, options = {}) {
    const validator = inputValidator(username);
    const optionName = ['minLength', 'maxLength', 'uppercase','number','NonAlphanumeric','trim','repeat']
    const validation = 
    [
        validator.hasMinLength(MIN_LENGTH),
        validator.hasMaxLength(MAX_LENGTH),
        validator.hasUppercase(),
        validator.hasNumber(),
        validator.hasNonAlphanumeric(),
        validator.hasWhitespace(),
        validator.hasRepeat()
    ]
    const messageError = 
    [
        'Username must be at least 8 characters long.',
        'Username cannot exceed 64 characters.',
        'Username must contain at least one uppercase letter.',
        'Username must have at least one number.',
        'Username must not contain non-alphanumeric characters.',
        'Username cannot contain whitespace.',
        'Username must not have consecutive repeated characters.'
    ]
    let objectOption = createValidationOptions(optionName,validation,messageError)
    objectOption = {...objectOption, ...options}
    const {minLength,
        maxLength,
        uppercase,
        number,
        NonAlphanumeric,
        trim,
        repeat } = objectOption
    handleValidationError(uppercase.required  , uppercase.errorMessage)
    handleValidationError(number.required , number.errorMessage)
    handleValidationError(NonAlphanumeric.required ? validator.hasNonAlphanumeric() : true, NonAlphanumeric.errorMessage)
    handleValidationError(repeat.required ? validator.hasRepeat() : true, repeat.errorMessage)
    
    let checkWhiteSpace = !trim.required
    if(!checkWhiteSpace){
        username = trimmedValue(username)
        checkWhiteSpace = true
    }
    const min = (minLength.value || MIN_LENGTH)
    const max = (maxLength.value || MAX_LENGTH)
    if (typeof minLength.value === 'string' || typeof minLength.value === 'string') {
        minLength.value = +minLength.value;
        maxLength.value =+maxLength.value
    }
    if (
    typeof minLength.value !== 'undefined' &&
    typeof maxLength.value !== 'undefined' &&
    (typeof minLength.value !== 'boolean') &&
    (typeof maxLength.value !== 'boolean') &&
    (typeof minLength.value !== 'number' || typeof maxLength.value !== 'number')
    ) {
    throw new Error("min or max Length just for true or false");
    }
    if (typeof min === 'number' &&typeof max === 'number' &&(username.length < min || username.length > max)){
        throw new Error("Invalid configuration for minLength or maxLength. They must be either true, false, or a numeric value or string.");
    }
    console.log(minLength);
    console.log(maxLength);
    console.log(uppercase);
    console.log(number);
    console.log(NonAlphanumeric);
    console.log(trim);
    console.log(repeat);
    const isValid = minLength && maxLength && uppercase &&number && NonAlphanumeric && trim && repeat
    return isValid;
}

const result = validateUsername("Mahdimamashli13832");
console.log("result=>", result);
module.exports = validateUsername;
