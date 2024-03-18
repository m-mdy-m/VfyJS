const { MIN_LENGTH, MAX_LENGTH } = require("../../../common/validationConstants");
const createValidationOptions = require("../../../utils/handleOption");
const inputValidator = require("../../../utils/inputValidator");

function optionsPassword (options){
    const optionName = ['minLength', 'maxLength', 'uppercase', 'lowercase', 'number', 'specialCharacter', 'alphabetic', 'whitespace'];
    const optionValidations = [MIN_LENGTH, MAX_LENGTH, true, true, true, true, true, false];
    const msgError = [
        'Must be at least 8 characters long.',
        'Cannot exceed 20 characters.',
        'Must contain at least one uppercase letter.',
        'Must contain at least one lowercase letter.',
        'Must have at least one number.',
        'Must contain at least one special character such as (@#$%^&*).',
        'Input must contain at least one alphabetic character.',
        'Cannot contain whitespace.'
    ]
    let objectOPtion =  createValidationOptions(optionName,optionValidations,msgError)
    // Merge the values from 'options' into 'objectOPtion'
    objectOPtion = { ...objectOPtion, ...options };
    const { lowercase, uppercase, number, specialCharacter, alphabetic, whitespace, minLength, maxLength } = objectOPtion;
    return { lowercase, uppercase, number, specialCharacter, alphabetic, whitespace, minLength, maxLength, msgError};

}
function optionEmail (options){
      // Set standard length
    const standardMaxLength = 255;
    const standardMinLength = 3
    const optionName = ['minLenLocal', 'minLenDomain', 'minLenSubdomain', 'maxLenLocal', 'maxLenDomain', 'maxLenSubdomain'];
    const optionValidations = [standardMinLength,standardMinLength,2, standardMaxLength,standardMaxLength,standardMaxLength];
    const msgError = 
    [
        `Local part must be ${standardMinLength}-${standardMaxLength} characters.`,
        `Domain part must be ${standardMinLength}-${standardMaxLength} characters.`,
        `Subdomain must be 2-${standardMaxLength} characters.`,
        `Local part must be at most ${standardMaxLength} characters.`,
        `Domain part must be at most ${standardMaxLength} characters.`,
        `Subdomain must be at most ${standardMaxLength} characters.`,
    ]
    var objectOPtion = createValidationOptions(optionName,optionValidations,msgError);
    
    objectOPtion = { ...objectOPtion, ...options };
  
    const { minLenLocal, minLenDomain, minLenSubdomain, maxLenLocal, maxLenDomain, maxLenSubdomain } = objectOPtion;
    return {minLenLocal,minLenDomain,minLenSubdomain,maxLenLocal,maxLenDomain,maxLenSubdomain,msgError}
}




function optionUsername (username,options){
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
        'Must be at least 8 characters long.',
        'Cannot exceed 64 characters.',
        'Must contain at least one uppercase letter.',
        'Must have at least one number.',
        'Must not contain non-alphanumeric characters.',
        'Cannot contain whitespace.',
        'Must not have consecutive repeated characters.'
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

    return {minLength , maxLength,uppercase,number,NonAlphanumeric,trim,repeat,messageError}
}
module.exports = {
    optionsPassword: optionsPassword,
    optionEmail:optionEmail,
    optionUsername:optionUsername
}