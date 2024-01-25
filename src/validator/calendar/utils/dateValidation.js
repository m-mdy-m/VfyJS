/**
 * Custom error class for date-related errors.
 * @class
 * @extends Error
 * @param {number} invalidValue - The invalid value causing the error.
 * @param {string} message - The error message describing the validation failure.
 * @param {number} currentDate - The current date used for comparison.
 */
class FutureDateError extends Error {
    constructor(invalidValue, message, currentDate) {
        super(message);
        this.invalidValue = invalidValue;
        this.currentDate = currentDate;
    }
}

/**
 * Validates the given date components and performs common checks.
 * @param {number} year - The year component of the date.
 * @param {number} month - The month component of the date.
 * @param {number} day - The day component of the date.
 * @param {number} nowYear - The current year.
 * @param {number} nowMonth - The current month.
 * @param {number} nowDay - The current day.
 * @returns {string} The formatted month and day, if applicable.
 * @throws {FutureDateError} Throws error if the date components are invalid.
 */
function validateDateComponents(year, month, day, nowYear, nowMonth, nowDay) {
    if (day > 31) {
        throw new FutureDateError(day, 'Invalid day value. Days cannot be greater than 31.', nowDay);
    }
    if (month > 12) {
        throw new FutureDateError(month, 'Invalid month value. Months cannot be greater than 12.', nowMonth);
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

    // Format month and day if necessary
    let formatMonth = nowMonth < 10 ? `0${nowMonth}` :nowMonth;
    let formatDay = nowDay < 10 ? `0${nowDay}` :nowDay;

    return { formatMonth, formatDay };
}

module.exports = { FutureDateError, validateDateComponents };
