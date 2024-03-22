const  { defaultOptions }  = require ( "../global.config")
const  createValidationOptions  = require ( "./genOptions")


function optionUsername(options){
    const { alphanumeric,maxLength,minLength,whitespace } = defaultOptions.Username
    const names = [
        'alphanumeric',
        'maxLength',
        'minLength',
        'whitespace',
    ]
    const requiredOption = [
        options.minLength?.value || minLength.value,
        options.maxLength?.value || maxLength.value,
        options.alphanumeric?.required ?? alphanumeric.required,
        options.whitespace?.required ?? whitespace.required
    ]
    const message = [
         options.minLength?.message || minLength.message,
        options.maxLength?.message ||maxLength.message,
        options.alphanumeric?.message || alphanumeric.message,
        options.whitespace?.message || whitespace.message,
    ]
    const object = createValidationOptions(names,requiredOption,message)
    return { ...object, ...options };

}

function optionPassword(options){
    const {lowercase,maxLength,minLength,number,specialCharacter,uppercase,whitespace } = defaultOptions.Password
    const optionName = ['lowercase', 'maxLength', 'minLength', 'number', 'specialCharacter', 'uppercase', 'whitespace'];
    const optionValidations = [
        options.minLength?.value || minLength.value,
        options.maxLength?.value || maxLength.value,
        options.uppercase?.required ?? uppercase.required,
        options.lowercase?.required ?? lowercase.required,
        options.number?.required ?? number.required,
        options.specialCharacter?.required ?? specialCharacter.required,
        options.whitespace?.required ?? whitespace.required
    ]
    const msgError = [
        options.minLength?.message || minLength.message,
        options.maxLength?.message ||maxLength.message,
        options.uppercase?.message || uppercase.message,
        options.lowercase?.message || lowercase.message,
        options.number?.message || number.message,
        options.specialCharacter?.message || specialCharacter.message,
        options.whitespace?.message || whitespace.message
    ];
    const objectOption = createValidationOptions(optionName,optionValidations,msgError)
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
  return {minLenLocal,minLenDomain,minLenSubdomain,maxLenLocal,maxLenDomain,maxLenSubdomain}
}
module.exports = {
    optionUsername,
    optionPassword,
    optionEmail,
};
