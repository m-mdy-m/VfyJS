import { MIN_LENGTH, MAX_LENGTH }  from "../../../common/validationimportants"
import { defaultOptions }  from "../global.config.js"
import createValidationOptions  from "../../../utils/handleOption"
import inputValidator  from "../../../utils/inputValidator"



function genOption(){

}










function optionsPassword(options) {
    const { password } = defaultOptions;
    const { minLength, maxLength, uppercase, lowercase, number, specialCharacter, alphabetic, whitespace } = password;

    const defaultMinLength = minLength.value || MIN_LENGTH;
    const defaultMaxLength = maxLength.value || MAX_LENGTH;

    const optionName = ['minLength', 'maxLength', 'uppercase', 'lowercase', 'number', 'specialCharacter', 'alphabetic', 'whitespace'];

    const optionValidations = [
        options.minLength?.value || defaultMinLength,
        options.maxLength?.value || defaultMaxLength,
        options.uppercase?.required ?? uppercase.required,
        options.lowercase?.required ?? lowercase.required,
        options.number?.required ?? number.required,
        options.specialCharacter?.required ?? specialCharacter.required,
        options.alphabetic?.required ?? alphabetic.required,
        options.whitespace?.required ?? whitespace.required
    ];

    const msgError = [
        options.minLength?.errorMessage || `Must be ${defaultMinLength}-${defaultMaxLength} characters long.`,
        options.maxLength?.errorMessage || `Cannot exceed ${defaultMaxLength} characters.`,
        options.uppercase?.errorMessage || uppercase.errorMessage,
        options.lowercase?.errorMessage || lowercase.errorMessage,
        options.number?.errorMessage || number.errorMessage,
        options.specialCharacter?.errorMessage || specialCharacter.errorMessage,
        options.alphabetic?.errorMessage || alphabetic.errorMessage,
        options.whitespace?.errorMessage || whitespace.errorMessage
    ];

    const objectOption = createValidationOptions(optionName, optionValidations, msgError);
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

function optionUsername(username, options) {
    const { username: usernameConfig } = defaultOptions;
    const { minLength, maxLength, uppercase, number, nonAlphanumeric, trim, repeat } = usernameConfig;
    const validator = inputValidator(username);
    const optionName = ['minLength', 'maxLength', 'uppercase', 'number', 'nonAlphanumeric', 'trim', 'repeat'];
    const validation = [
        (options.minLength?.value || minLength.value || MIN_LENGTH),
        (options.maxLength?.value || maxLength.value || MAX_LENGTH),
        options.uppercase?.required ? validator.hasUppercase() : uppercase.required,
        options.number?.required ? validator.hasNumber() : number.required,
        options.nonAlphanumeric?.required ? validator.hasNonAlphanumeric() : nonAlphanumeric.required,
        options.trim?.required ? validator.hasWhitespace() : trim.required,
        options.repeat?.required ? validator.hasRepeat() : repeat.required
    ];
    const messageError = [
        options.minLength?.errorMessage || `Must be ${options.minLength?.value || minLength.value || MIN_LENGTH}-${options.maxLength?.value || maxLength.value || MAX_LENGTH} characters long.`,
        options.maxLength?.errorMessage || `Cannot exceed ${options.maxLength?.value || maxLength.value || MAX_LENGTH} characters.`,
        options.uppercase?.errorMessage || uppercase.errorMessage,
        options.number?.errorMessage || number.errorMessage,
        options.nonAlphanumeric?.errorMessage || nonAlphanumeric.errorMessage,
        options.trim?.errorMessage || trim.errorMessage,
        options.repeat?.errorMessage || repeat.errorMessage
    ];

    const objectOption = createValidationOptions(optionName, validation, messageError);
    return { ...objectOption, ...options }
}
module.exports = {
    optionsPassword: optionsPassword,
    optionEmail: optionEmail,
    optionUsername: optionUsername
};
