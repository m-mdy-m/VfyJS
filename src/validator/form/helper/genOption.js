const { MIN_LENGTH, MAX_LENGTH } = require("../../../common/validationConstants");
const { defaultOptions } = require("../global.config");
const createValidationOptions = require("../../../utils/handleOption");
const inputValidator = require("../../../utils/inputValidator");

function optionsPassword (options){
    const { password } = defaultOptions;
    const { minLength, maxLength, uppercase, lowercase, number, specialCharacter, alphabetic, whitespace } = password;
    const defaultMinLength = minLength.value || MIN_LENGTH;
    const defaultMaxLength = maxLength.value || MAX_LENGTH;

    const optionName = ['minLength', 'maxLength', 'uppercase', 'lowercase', 'number', 'specialCharacter', 'alphabetic', 'whitespace'];
    const optionValidations = [defaultMinLength, defaultMaxLength, uppercase.required, lowercase.required, number.required, specialCharacter.required, alphabetic.required, whitespace.required];
    const msgError = [
        `Must be ${defaultMinLength}-${defaultMaxLength} characters long.`,
        `Cannot exceed ${defaultMaxLength} characters.`,
        uppercase.errorMessage,
        lowercase.errorMessage,
        number.errorMessage,
        specialCharacter.errorMessage,
        alphabetic.errorMessage,
        whitespace.errorMessage
    ];
    
    let objectOption =  createValidationOptions(optionName, optionValidations, msgError);
    objectOption = {  ...objectOption,...options, };
    return objectOption;
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
        validator.hasMinLength(options.minLength?.value || minLength.value || MIN_LENGTH),
        validator.hasMaxLength(options.maxLength?.value || maxLength.value || MAX_LENGTH),
        options.uppercase?.required ? validator.hasUppercase() : true,
        options.number?.required ? validator.hasNumber() : true,
        options.nonAlphanumeric?.required ? validator.hasNonAlphanumeric() : false,
        options.trim?.required ? validator.hasWhitespace() : true,
        options.repeat?.required ? validator.hasRepeat() : true
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
    return { ...objectOption, ...options };
}
module.exports = {
    optionsPassword: optionsPassword,
    optionEmail: optionEmail,
    optionUsername: optionUsername
};
