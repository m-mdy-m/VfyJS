const {trimmedValue} = require('../../../common/validationConstants')
const inputValidator= require('../../../utils/inputValidator')
const { ifTruthyValue, TypesCheck, isEmpty }= require('../../../errors/HandleError')
const remainingTimeOfYear = require('../utils/remainingTimeOfYear')
const {getDay,getMonth} = require('../utils/dateTimeHelpers')
const { validateDateComponents, getFormatted } = require('../utils/dateValidation')
const {getDateNowGregorian} = require('../utils/getDate')
const { nowDay, nowMonth, nowYear,nowHours, nowMinutes, nowSeconds } = getDateNowGregorian();
function getGregorianDate() {
    // Create an array to hold the input values (year, month, day)
    const dateComponents = [nowYear , nowMonth, nowDay,nowHours,nowMinutes,nowSeconds,];
    let [year, month, day, hours, minute, second] = dateComponents.map((component, index) => {
        isEmpty(component, 'Year, month, and day must not be empty.');
        TypesCheck(component, ['number', 'string'], 'Year, month, and day must be either numbers or strings.');
        const validator = inputValidator(component);
        ifTruthyValue(validator.hasSpecialCharacter(), 'Year, month, or day cannot contain special characters.');
        ifTruthyValue(validator.hasAlphabetic(), 'The value cannot contain alphabetic characters.');

        return +trimmedValue(component.toString());
    });
    // Convert the time difference to days, hours, minutes, and seconds
    const remaining = remainingTimeOfYear()
    const {formatDay,formatMonth} = getFormatted(nowMonth,nowDay)
    validateDateComponents(year, month, day, nowYear, nowMonth, nowDay);
    //  Prepare result object
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
    return result
}
module.exports =getGregorianDate