const {trimmedValue} = require('../../../common/validationConstants')
const inputValidator= require('../../../utils/inputValidator')
const { ifTruthyValue, TypesCheck, isEmpty }= require('../../../errors/HandleError')
const remainingTimeOfYear = require('../utils/remainingTimeOfYear')
const {getDay,getMonth} = require('../utils/dateTimeHelpers')
const { validateDateComponents, getFormatted } = require('../utils/dateValidation')
const {getDateNowGregorian} = require('../utils/getDate')
const { nowDay, nowMonth, nowYear,nowHours, nowMinutes, nowSeconds } = getDateNowGregorian();
function validateGregorianDate( {
    inputYear = nowYear,
    inputMonth = nowMonth,
    inputDay = nowDay,
    inputMinutes = nowMinutes,
    inputHours = nowHours,
    inputSeconds = nowSeconds,
    hasWrite = false}={}) {
    // Create an array to hold the input values (year, month, day)
    const dateComponents = [inputYear, inputMonth, inputDay,inputHours,inputMinutes,inputSeconds,];
    // Get the current date
    if (inputYear !== nowYear || inputMonth !== nowMonth || inputDay !== nowDay ||
        inputMinutes !== nowMinutes || inputHours !== nowHours || inputSeconds !== nowSeconds) {
        hasWrite = true;
    }

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
    let totalMilliSeconds;
    let isTimeExpired = false;
    if (hasWrite) {
        // Calculate the input time in milliseconds
        const inputDate = new Date(inputYear, inputMonth - 1, inputDay, inputHours, inputMinutes, inputSeconds);
        const inputTimeMillis = inputDate.getTime();
        // Calculate the current time in milliseconds
        const currentTime = new Date().getTime();
        // Calculate the difference between input time and current time
        totalMilliSeconds = inputTimeMillis - currentTime;
        // Check if the input time is in the past
        if (totalMilliSeconds < 0) {
            // If so, set it to 0 to prevent immediate execution
            totalMilliSeconds = 0;
        }
        isTimeExpired = true;
    }  else {
        validateDateComponents(year, month, day, nowYear, nowMonth, nowDay);
    }
    if (isTimeExpired) {
        setTimeout(() => {
            console.log('Timing expired.');
        }, totalMilliSeconds);
    }
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
        TimeExpired: isTimeExpired ? 'TimeExpired' : 'NotExpired',
        ExpirationTime: isTimeExpired ? `${totalMilliSeconds} milliseconds` : null
    };
    return result
}
console.log(validateGregorianDate({ inputSeconds: 10 }));
