/**
 * Utility function to handle default values for options.
 *
 * @param {any|Function} defaultValue - The default value for the option. If it's a function, the function will be called to get the actual value.
 * @param {Function} validation - The validation function for the option. Should return a truthy or falsy value based on whether the option is valid.
 * @param {string} errorMessage - The error message to be displayed if validation fails.
 * @returns {Object} - An object with properties representing the structured option:
 *   - {any} value: The final value of the option after applying the default value or calling the function.
 *   - {string} errorMessage: The provided error message.
 *   - {Function|boolean} validation: The provided validation function or a default value of `true` if no validation function is provided.
 *
 * @example
 * // Example usage:
 * const option1 = handleOption("default_value", null, "Invalid input");
 * console.log(option1.value); // "default_value"
 * console.log(option1.errorMessage); // "Invalid input"
 * console.log(option1.validation); // true
 *
 * @example
 * // Example usage with a function as the default value:
 * const option2 = handleOption(() => Math.random() > 0.5 ? "A" : "B", null, "Invalid input");
 * console.log(option2.value); // Either "A" or "B" based on the random function
 * console.log(option2.errorMessage); // "Invalid input"
 * console.log(option2.validation); // true
 *
 * @example
 * // Example usage with a validation function:
 * const option3 = handleOption("default_value", value => value.length > 5, "Input must be at least 6 characters long");
 * console.log(option3.value); // "default_value"
 * console.log(option3.errorMessage); // "Input must be at least 6 characters long"
 * console.log(option3.validation); // The provided validation function
 */
function handleOption(defaultValue, validation, errorMessage) {
    const option = {
        value: defaultValue instanceof Function ? defaultValue() : defaultValue,
        errorMessage: errorMessage,
        validation: validation || true
    }
    console.log('defaultValue =>', defaultValue);
    console.log('validation =>', validation);
    console.log('errorMessage =>', errorMessage);
    console.log('option =>', option);
    return option
}


const createValidationOptions = (name=Array , methods=[] , validations =[], errorMessage=[])=>{
    let options={}; 
    for (let i = 0; i < name.length; i++) {
        const option_name = name[i];
        const method = methods[i]
        const validation = validations[i]
        const msgError = errorMessage[i]
        options[option_name] = handleOption(method,validation,msgError)
    }
    return options
}
module.exports = createValidationOptions;
