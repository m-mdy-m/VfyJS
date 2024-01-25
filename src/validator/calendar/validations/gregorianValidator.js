const {getSubstring}  = require('../../phone/utils/FormatValidation')
const {trimmedValue} = require('../../../common/validationConstants')
const inputValidator= require('../../../utils/inputValidator')
const { ifTruthyValue, TypesCheck }= require('../../../errors/HandleError')
function validateGregorianDate(inputYear, inputMonth, inputDay) {
    // Create an array to hold the input values (year, month, day)
    const dateComponents = [inputYear, inputMonth, inputDay];

    // Iterate over each date component (year, month, day)
    dateComponents.forEach((component, index) => {
        // Check if the component is of type 'number' or 'string'
        TypesCheck(component, ['number', 'string'], 'Year, month, and day must be either numbers or strings.');

        // Check for the presence of special characters in the date component
        const validator = inputValidator(component);
        const hasSpecialChar = validator.hasSpecialCharacter();
        const hasAlphabetic = validator.hasAlphabetic();

        // Display error message if special characters are found
        ifTruthyValue(hasSpecialChar, 'Year, month, or day cannot contain special characters.');

        // Display error message if alphabetic characters are found
        ifTruthyValue(hasAlphabetic, 'The value cannot contain alphabetic characters.');

        // Convert the date component to a string
        dateComponents[index] = component.toString();

        // Update the date component with the trimmed string representation
        dateComponents[index] = trimmedValue(dateComponents[index]);
    })
    // Get the current date
    const nowDate = new Date();
    const nowYear = nowDate.getFullYear();
    const nowMonth = nowDate.getMonth() + 1;
    const nowDay = nowDate.getDate();
}

const year = 2024;
const month = 12;
const day = 1;
console.log(validateGregorianDate('2  0 a 2    4', 12 , day)); 