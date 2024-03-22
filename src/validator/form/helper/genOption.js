const  { MIN_LENGTH, MAX_LENGTH }  = require ( "../../../utils/utils")
const  { defaultOptions }  = require ( "../global.config")
const  createValidationOptions  = require ( "../../../utils/handleOption")
const  inputValidator  = require ( "../../../utils/inputValidator")



function genOption(options){
    const {  lowercase,maxLength,minLength,number,repeat,specialCharacter,uppercase,whitespace } = defaultOptions
    const optionName = ['lowercase', 'maxLength', 'minLength', 'number', 'repeat', 'specialCharacter', 'uppercase', 'whitespace'];
    const optionValidations = [
        options.minLength?.value || minLength.value,
        options.maxLength?.value || maxLength.value,
        options.uppercase?.required ?? uppercase.required,
        options.lowercase?.required ?? lowercase.required,
        options.number?.required ?? number.required,
        options.specialCharacter?.required ?? specialCharacter.required,
        options.repeat?.required ?? repeat.required,
        options.whitespace?.required ?? whitespace.required
    ]
    const msgError = [
        options.minLength?.message || minLength.message,
        options.maxLength?.message ||maxLength.message,
        options.uppercase?.message || uppercase.message,
        options.lowercase?.message || lowercase.message,
        options.number?.message || number.message,
        options.specialCharacter?.message || specialCharacter.message,
        options.repeat?.message || repeat.message,
        options.whitespace?.message || whitespace.message
    ];
    const objectOption = createValidationOptions(optionName,optionValidations,msgError)
    console.log('objec =>',objectOption);
    return { ...objectOption, ...options };
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
      `Subdomain must be ${standardMaxLength} characters.`,
      `Local part must be at most ${standardMaxLength} characters.`,
      `Domain part must be at most ${standardMaxLength} characters.`,
      `Subdomain must be at most ${standardMaxLength} characters.`,
  ]
  var objectOption = createValidationOptions(optionName,optionValidations,msgError);
  
  objectOption = {  ...objectOption,...options, };

  const { minLenLocal, minLenDomain, minLenSubdomain, maxLenLocal, maxLenDomain, maxLenSubdomain } = objectOption;
  return {minLenLocal,minLenDomain,minLenSubdomain,maxLenLocal,maxLenDomain,maxLenSubdomain,msgError}
}
module.exports = {
    option: genOption,
    optionEmail: optionEmail,
};
