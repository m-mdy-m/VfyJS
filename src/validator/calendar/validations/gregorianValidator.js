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
        const totalYearsMillis = (inputYear - nowYear) * 365 * 24 * 60 * 60 * 1000;
        const totalMonthsMillis = (inputMonth - nowMonth) * 30 * 24 * 60 * 60 * 1000;
        const totalDaysMillis = (inputDay - nowDay) * 24 * 60 * 60 * 1000;
        const totalHoursMillis = (inputHours - nowHours) * 60 * 60 * 1000;
        const totalMinutesMillis = (inputMinutes - nowMinutes) * 60 * 1000;
        const totalSecondsMillis = (inputSeconds - nowSeconds) * 1000;
        totalMilliSeconds = totalYearsMillis + totalMonthsMillis + totalDaysMillis + totalHoursMillis + totalMinutesMillis + totalSecondsMillis;
        isTimeExpired = true;
    }else{
        validateDateComponents(year,month,day,nowYear,nowMonth,nowDay)
    }
    if (isTimeExpired) {
        let remainingTime = totalMilliSeconds
        const timeout = Math.min(remainingTime, 2147483647); 
        setTimeout(() => {
            return console.log('Timing expired.');
        }, remainingTime);
    }
    //  Prepare result object
     const result = {
        format : `${nowYear}-${formatMonth}-${formatDay}`,
        currentDateTime: {
            year: nowYear,
            month: { monthOfYear: nowMonth, monthName: getMonth() },
            day: { dayOfMonth: nowDay, dayOfWeek: getDay() },
            hours,
            minute,
            second,
        },
        timeLeftUntilEndOfYear: {
            months: remaining.months,
            days: remaining.days,
            hours: remaining.hours,
            minutes: remaining.minutes,
            seconds: remaining.seconds,
        },
        TimeExpired: isTimeExpired ? 'TimeExpired' : 'NotExpired',
        ExpirationTime: isTimeExpired ? `${totalMilliSeconds} milliseconds` : null
    };
    return result
}
console.log(validateGregorianDate({inputSeconds : 2})); 