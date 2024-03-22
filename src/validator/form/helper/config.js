const { defaultOptions } = require("../global.config");
const createValidationOptions = require("./genOptions");

/**
 * Generate validation options for username based on provided options and default settings.
 * @param {Object} options - Options for customizing username validation criteria.
 * @returns {Object} - Object containing validation options for username.
 */
function optionUsername(options) {
    // Extract default settings for username validation
    const { alphanumeric, maxLength, minLength, whitespace } = defaultOptions.Username;

    // Define names of validation options
    const names = ['minLength', 'maxLength', 'alphanumeric', 'whitespace'];

    // Determine required values based on provided options or defaults
    const requiredOption = [
        options.minLength?.value || minLength.value,
        options.maxLength?.value || maxLength.value,
        options.alphanumeric?.required ?? alphanumeric.required,
        options.whitespace?.required ?? whitespace.required
    ];

    // Define error messages for validation options
    const message = [
        options.minLength?.message || minLength.message,
        options.maxLength?.message || maxLength.message,
        options.alphanumeric?.message || alphanumeric.message,
        options.whitespace?.message || whitespace.message
    ];

    // Create validation options object
    const object = createValidationOptions(names, requiredOption, message);

    // Merge with provided options
    return { ...object, ...options };
}

/**
 * Generate validation options for password based on provided options and default settings.
 * @param {Object} options - Options for customizing password validation criteria.
 * @returns {Object} - Object containing validation options for password.
 */
function optionPassword(options) {
    // Extract default settings for password validation
    const { lowercase, maxLength, minLength, number, specialCharacter, uppercase, whitespace } = defaultOptions.Password;

    // Define names of validation options
    const optionName = ['minLength', 'maxLength', 'uppercase', 'lowercase', 'number', 'specialCharacter', 'whitespace'];

    // Determine required values based on provided options or defaults
    const optionValidations = [
        options.minLength?.value || minLength.value,
        options.maxLength?.value || maxLength.value,
        options.uppercase?.required ?? uppercase.required,
        options.lowercase?.required ?? lowercase.required,
        options.number?.required ?? number.required,
        options.specialCharacter?.required ?? specialCharacter.required,
        options.whitespace?.required ?? whitespace.required
    ];

    // Define error messages for validation options
    const msgError = [
        options.minLength?.message || minLength.message,
        options.maxLength?.message || maxLength.message,
        options.uppercase?.message || uppercase.message,
        options.lowercase?.message || lowercase.message,
        options.number?.message || number.message,
        options.specialCharacter?.message || specialCharacter.message,
        options.whitespace?.message || whitespace.message
    ];

    // Create validation options object
    const objectOption = createValidationOptions(optionName, optionValidations, msgError);

    // Merge with provided options
    return { ...objectOption, ...options };
}

/**
 * Generate validation options for email based on provided options and standard settings.
 * @param {Object} options - Options for customizing email validation criteria.
 * @returns {Object} - Object containing validation options for email.
 */
function optionEmail(options) {
    // Define standard length requirements for email parts
    const standardMaxLength = 255;
    const standardMinLength = 3;

    // Define names of validation options
    const optionName = ['minLenLocal', 'minLenDomain', 'minLenSubdomain', 'maxLenLocal', 'maxLenDomain', 'maxLenSubdomain'];

    // Define required values and error messages for validation options
    const optionValidations = [standardMinLength, standardMinLength, 2, standardMaxLength, standardMaxLength, standardMaxLength];
    const msgError = [
        `Local part must be ${standardMinLength}-${standardMaxLength} characters.`,
        `Domain part must be ${standardMinLength}-${standardMaxLength} characters.`,
        `Subdomain must be ${standardMaxLength} characters.`,
        `Local part must be at most ${standardMaxLength} characters.`,
        `Domain part must be at most ${standardMaxLength} characters.`,
        `Subdomain must be at most ${standardMaxLength} characters.`,
    ];

    // Create validation options object
    let objectOption = createValidationOptions(optionName, optionValidations, msgError);

    // Merge with provided options
    objectOption = { ...objectOption, ...options };

    // Extract specific options for email validation
    const { minLenLocal, minLenDomain, minLenSubdomain, maxLenLocal, maxLenDomain, maxLenSubdomain } = objectOption;

    // Return relevant email validation options
    return { minLenLocal, minLenDomain, minLenSubdomain, maxLenLocal, maxLenDomain, maxLenSubdomain };
}

// Export functions for generating validation options
module.exports = {
    optionUsername,
    optionPassword,
    optionEmail,
}
