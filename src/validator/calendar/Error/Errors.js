/**
 * Error class for representing errors related to future dates.
 * @class
 * @extends Error
 * @param {string} invalidDate - The invalid date value that caused the error.
 * @param {string} message - The error message describing the validation failure.
 * @param {string} currentDate - The current date at the time the error occurred.
 */
exports.FutureDateError = class FutureDateError extends Error {
    /**
     * Create a FutureDateError instance.
     * @constructor
     * @param {string} invalidDate - The invalid date value that caused the error.
     * @param {string} message - The error message describing the validation failure.
     * @param {string} currentDate - The current date at the time the error occurred.
     */
    constructor(invalidDate, message, currentDate) {
        super(message);
        /**
         * The invalid date value that caused the error.
         * @type {string}
         */
        this.invalidDate = invalidDate; 
        /**
         * The current date at the time the error occurred.
         * @type {string}
         */
        this.currentDate = currentDate; 
    }
  }