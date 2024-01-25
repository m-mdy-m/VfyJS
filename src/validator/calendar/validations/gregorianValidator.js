const {trimmedValue} = require('../../../common/validationConstants')
const inputValidator= require('../../../utils/inputValidator')
const { ifTruthyValue, TypesCheck, isEmpty }= require('../../../errors/HandleError')
const remainingTimeOfYear = require('../utils/remainingTimeOfYear')
const {getDay,getMonth} = require('../utils/dateTimeHelpers')
const { validateDateComponents, getFormatted } = require('../utils/dateValidation')
const {getDateNowGregorian} = require('../utils/getDate')
const { nowDay, nowMonth, nowYear,nowHours, nowMinutes, nowSeconds } = getDateNowGregorian();
/**
 * Retrieves the current Gregorian date along with time remaining until the end of the year.
 * @returns {{
*  format: string,
*  currentDateTime: {
*      year: number,
*      month: { monthOfYear: number, monthName: string },
*      day: { dayOfMonth: number, dayOfWeek: string },
*      hours: number,
*      minute: number,
*      second: number
*  },
*  timeLeftUntilEndOfYear: {
*      months: number,
*      days: number,
*      hours: number,
*      minutes: number,
*      seconds: number
*  }
* }}
*/
function getGregorianDate() {
    // Get current date components
    const { getDateNowGregorian } = require('../utils/getDate');
    const { nowDay, nowMonth, nowYear, nowHours, nowMinutes, nowSeconds } = getDateNowGregorian();

    // Create an array to hold the input values (year, month, day)
    const dateComponents = [nowYear, nowMonth, nowDay, nowHours, nowMinutes, nowSeconds];
    
    // Validate each component
    let [year, month, day, hours, minute, second] = dateComponents.map((component, index) => {
        // Ensure components are not empty
        isEmpty(component, 'Year, month, and day must not be empty.');
        // Check if components are of correct type
        TypesCheck(component, ['number', 'string'], 'Year, month, and day must be either numbers or strings.');
        const validator = inputValidator(component);
        // Check for special characters
        ifTruthyValue(validator.hasSpecialCharacter(), 'Year, month, or day cannot contain special characters.');
        // Check for alphabetic characters
        ifTruthyValue(validator.hasAlphabetic(), 'The value cannot contain alphabetic characters.');

        // Convert and trim the component value
        return +trimmedValue(component.toString());
    });

    // Get remaining time until the end of the year
    const remaining = remainingTimeOfYear();

    // Get formatted month and day
    const { formatDay, formatMonth } = getFormatted(nowMonth, nowDay);

    // Validate date components
    validateDateComponents(year, month, day, nowYear, nowMonth, nowDay);

    // Prepare result object
    const result = {
        format: `${nowYear}-${formatMonth}-${formatDay}`,
        currentDateTime: {
            year: nowYear,
            month: { monthOfYear: nowMonth, monthName: getMonth() },
            day: { dayOfMonth: nowDay, dayOfWeek: getDay() },
            hours,
            minute,
            second
        },
        timeLeftUntilEndOfYear: {
            months: remaining.months,
            days: remaining.days,
            hours: remaining.hours,
            minutes: remaining.minutes,
            seconds: remaining.seconds
        },
    };

    return result;
}

module.exports = getGregorianDate;