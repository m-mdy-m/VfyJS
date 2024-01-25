const { FutureDateError } = require('../Error/Errors');

/**
 * Validates the components of a date.
 * @param {number} year - The year component of the date.
 * @param {number} month - The month component of the date.
 * @param {number} day - The day component of the date.
 * @param {number} nowYear - The current year.
 * @param {number} nowMonth - The current month.
 * @param {number} nowDay - The current day.
 * @throws {FutureDateError} Throws an error if any validation fails.
 */
function validateDateComponents(year, month, day, nowYear, nowMonth, nowDay,nowHours,nowMinutes,nowSeconds) {
    if (day > 31 || day < 1) {
        throw new FutureDateError(day, 'Invalid day value. Days cannot be greater than 31.', nowDay);
    }
    if (month > 12 || month < 1) {
        throw new FutureDateError(month, 'Invalid month value. Months cannot be greater than 12.', nowMonth);
    }
    if (year < 0) {
        throw new FutureDateError(year, 'Invalid year value. Year cannot be negative.', nowYear);
    }
    if (nowYear < year) {
        throw new FutureDateError(year, `The year ${year} cannot be in the future. Please enter a previous or current year.`, nowYear);
    }
    if (nowMonth < month) {
        throw new FutureDateError(month, `The month ${month} cannot be in the future. Please enter a previous or current month.`, nowMonth);
    }
    if (nowDay < day) {
        throw new FutureDateError(day, `The day ${day} cannot be in the future. Please enter a previous or current day.`, nowDay);
    }
    if (nowHours < 0 || nowHours > 23) {
        throw new FutureDateError(nowHours, 'Invalid hours value. Hours must be between 0 and 23.');
    }
    if (nowMinutes < 0 || nowMinutes > 59) {
        throw new FutureDateError(nowMinutes, 'Invalid minutes value. Minutes must be between 0 and 59.');
    }
    if (nowSeconds < 0 || nowSeconds > 59) {
        throw new FutureDateError(nowSeconds, 'Invalid seconds value. Seconds must be between 0 and 59.');
    }
}
function getFormatted(nowMonth,nowDay){
    // Format month and day if necessary
    let formatMonth = nowMonth < 10 ? `0${nowMonth}` : nowMonth;
    let formatDay = nowDay < 10 ? `0${nowDay}` : nowDay;

    // Return an object containing formatted month and day
    return {formatMonth,formatDay};
}
module.exports = { FutureDateError, validateDateComponents,getFormatted };
