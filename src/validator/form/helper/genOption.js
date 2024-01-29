const { MIN_LENGTH, MAX_LENGTH } = require("../../../common/validationConstants");
const createValidationOptions = require("../../../utils/handleOption");
const inputValidator = require("../../../utils/inputValidator");

function createOPtions (value,options){
    const validator = inputValidator(value);
    const optionName = ['minLength', 'maxLength', 'uppercase', 'lowercase', 'number', 'specialCharacter', 'alphabetic', 'whitespace'];
    const optionValidations = [validator.hasMinLength(MIN_LENGTH), validator.hasMaxLength(MAX_LENGTH), true, true, true, true, true, false];
    const msgError = [
      'Password must be at least 8 characters long.',
      'Password cannot exceed 20 characters.',
      'Password must contain at least one uppercase letter.',
      'Password must contain at least one lowercase letter.',
      'Password must have at least one number.',
      'Password must contain at least one special character such as (@#$%^&*).',
      'Input must contain at least one alphabetic character.',
      'Password cannot contain whitespace.'
    ];
    let objectOPtion =  createValidationOptions(optionName,optionValidations,msgError)
    // Merge the values from 'options' into 'objectOPtion'
    objectOPtion = { ...objectOPtion, ...options };
    const { lowercase, uppercase, number, specialCharacter, alphabetic, whitespace, minLength, maxLength } = objectOPtion;
    return { lowercase, uppercase, number, specialCharacter, alphabetic, whitespace, minLength, maxLength };

}
module.exports = createOPtions