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
    // console.log('minLength =>', minLength);
    // console.log('maxLength =>', maxLength);
    // console.log('uppercase =>', uppercase);
    // console.log('number =>', number);
    // console.log('NonAlphanumeric =>', NonAlphanumeric);
    // console.log('trim =>', trim);
    console.log(repeat.required);
    handleValidationError(uppercase.required  , uppercase.errorMessage)
    handleValidationError(number.required , number.errorMessage)
    handleValidationError(!NonAlphanumeruseic.required, NonAlphanumeric.errorMessage)
    let checkWhiteSpace = !trim.required
    if(!checkWhiteSpace){
        username = trimmedValue(username)
        checkWhiteSpace = true
    }
    // const isValid = minLength && maxLength && uppercase &&number && NonAlphanumeric && trim && repeat
    // const isValid = minLength && maxLength && uppercase &&number && NonAlphanumeric && trim && repeat
    // return isValid;
}

const result = validateUsername("Mdymmmmshly1383");
console.log("result=>", result);
module.exports = validateUsername;
