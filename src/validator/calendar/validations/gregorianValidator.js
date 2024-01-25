const {trimmedValue} = require('../../../common/validationConstants')
const inputValidator= require('../../../utils/inputValidator')
const { ifTruthyValue, TypesCheck, isEmpty }= require('../../../errors/HandleError')
const remainingTimeOfYear = require('../utils/remainingTimeOfYear')
const {getDay,getMonth} = require('../utils/dateTimeHelpers')
const { validateDateComponents, getFormatted } = require('../utils/dateValidation')
const {getDateNowGregorian} = require('../utils/getDate')
const { nowDay, nowMonth, nowYear,nowHours, nowMinutes, nowSeconds } = getDateNowGregorian();
function validateGregorianDate( 
    inputYear = nowYear,
    inputMonth = nowMonth,
    inputDay = nowDay,
    inputMinutes = nowMinutes,
    inputHours = nowHours,
    inputSeconds = nowSeconds,
    hasWrite = false) {
    // Create an array to hold the input values (year, month, day)
    const dateComponents = [inputYear, inputMonth, inputDay,inputHours,inputMinutes,inputSeconds,];
    // Get the current date
    if (inputYear !== nowYear || inputMonth !== nowMonth || inputDay !== nowDay ||
        inputMinutes !== nowMinutes || inputHours !== nowHours || inputSeconds !== nowSeconds) {
        hasWrite = true;
    }

    let year,month,day,hours,minute,second;
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
        hours = +dateComponents[3]
        minute = +dateComponents[4]
        second = +dateComponents[5]
    })

    // Convert the time difference to days, hours, minutes, and seconds
    const remaining = remainingTimeOfYear()
    const {formatDay,formatMonth} = getFormatted(nowMonth,nowDay)
    let totalMilliSeconds;
    let isTimeExpired = false;
    if (inputYear > nowYear || 
        (inputYear === nowYear && inputMonth > nowMonth) || 
        (inputYear === nowYear && inputMonth === nowMonth && inputDay > nowDay) ||
        (inputYear === nowYear && inputMonth === nowMonth && inputDay === nowDay && inputHours > nowHours) ||
        (inputYear === nowYear && inputMonth === nowMonth && inputDay === nowDay && inputHours === nowHours && inputMinutes > nowMinutes) ||
        (inputYear === nowYear && inputMonth === nowMonth && inputDay === nowDay && inputHours === nowHours && inputMinutes === nowMinutes && inputSeconds > nowSeconds)) {
            const totalYearsMillis = (inputYear - nowYear) * 365 * 24 * 60 * 60 * 1000;
            const totalMonthsMillis = (inputMonth - nowMonth) * 30 * 24 * 60 * 60 * 1000;
            const totalDaysMillis = (inputDay - nowDay) * 24 * 60 * 60 * 1000;
            const totalHoursMillis = (inputHours - nowHours) * 60 * 60 * 1000;
            const totalMinutesMillis = (inputMinutes - nowMinutes) * 60 * 1000;
            const totalSecondsMillis = (inputSeconds - nowSeconds) * 1000;
            isTimeExpired = true;
            totalMilliSeconds = totalYearsMillis + totalMonthsMillis + totalDaysMillis + totalHoursMillis + totalMinutesMillis + totalSecondsMillis;
        }
    if (!hasWrite) {
        validateDateComponents(year,month,day,nowYear,nowMonth,nowDay)
    }
    if (isTimeExpired) {
        const handleTimeExpiration = ()=>{
            console.log('timing');
        }
        setTimeout(handleTimeExpiration,totalMilliSeconds)
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
        traveledFuture : false,
    };
    return result
}
const year = 2024;
const month = 1;
const day = 26;
const hours = 1
const minutes = 2
const second = 20
console.log(validateGregorianDate()); 