const {trimmedValue} = require('../../../common/validationConstants')
const inputValidator= require('../../../utils/inputValidator')
const { ifTruthyValue, TypesCheck, isEmpty }= require('../../../errors/HandleError')
const remainingTimeOfYear = require('../utils/remainingTimeOfYear')
const {getDay,getMonth} = require('../utils/dateTimeHelpers')
const { validateDateComponents } = require('../utils/dateValidation')
const {getDateNowGregorian} = require('../utils/getDate')
function validateGregorianDate( inputYear = new Date().getFullYear(), inputMonth = new Date().getMonth() + 1, inputDay = new Date().getDate(), hasWrite = false) {
    // Create an array to hold the input values (year, month, day)
    const dateComponents = [inputYear, inputMonth, inputDay];
    // Get the current date
    const {nowDay,nowMonth,nowYear } = getDateNowGregorian()
    if (inputYear !== nowYear || inputMonth !== nowMonth || inputDay !== nowDay) {
        hasWrite = true
    }
    let year,month,day;
    // Iterate over each date component (year, month, day)
    dateComponents.forEach((component, index) => {
        isEmpty(component, 'Year, month, and day must not Empty.')
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
        dateComponents[index] = trimmedValue(dateComponents[index])
        // Assign values from the array to individual variables
        year = +dateComponents[0]
        month = +dateComponents[1]
        day = +dateComponents[2]
    })

    // Convert the time difference to days, hours, minutes, and seconds
    const remaining = remainingTimeOfYear()
    const {formatDay,formatMonth} = validateDateComponents(year,month,day,nowYear,nowMonth,nowDay)
    //  Prepare result object
     const result = {
        format : `${nowYear}-${formatMonth}-${formatDay}`,
        currentDateTime: {
            year: nowYear,
            month: { monthOfYear: nowMonth, monthName: getMonth() },
            day: { dayOfMonth: nowDay, dayOfWeek: getDay() }
        },
        timeLeftUntilEndOfYear: {
            months: remaining.months,
            days: remaining.days,
            hours: remaining.hours,
            minutes: remaining.minutes,
            seconds: remaining.seconds,
        },
        traveledFuture : false,
    };
    return result
}
const year = 2024;
const month = 1;
const day = 22;
console.log(validateGregorianDate(year,month,day)); 