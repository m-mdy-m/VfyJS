const { MIN_LENGTH, MAX_LENGTH } = require("../../../common/validationConstants");
const createValidationOptions = require("../../../utils/handleOption");

function optionsPassword (options){
    const optionName = ['minLength', 'maxLength', 'uppercase', 'lowercase', 'number', 'specialCharacter', 'alphabetic', 'whitespace'];
    const optionValidations = [MIN_LENGTH, MAX_LENGTH, true, true, true, true, true, false];
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
      `Local part must have between ${standardMinLength} and ${standardMaxLength} characters.`,
      `Domain part must have between ${standardMinLength} and ${standardMaxLength} characters.`,
      `Subdomain must have between 2 and ${standardMaxLength} characters.`,
      `Local part must have at most ${standardMaxLength} characters.`,
      `Domain part must have at most ${standardMaxLength} characters.`,
      `Subdomain must have at most ${standardMaxLength} characters.`,
    ];
    var objectOPtion = createValidationOptions(optionName,optionValidations,msgError);
    
    objectOPtion = { ...objectOPtion, ...options };
  
    const { minLenLocal, minLenDomain, minLenSubdomain, maxLenLocal, maxLenDomain, maxLenSubdomain } = objectOPtion;
    return {minLenLocal,minLenDomain,minLenSubdomain,maxLenLocal,maxLenDomain,maxLenSubdomain,msgError}
}
module.exports = {
    optionsPassword: optionsPassword,
    optionEmail:optionEmail
}