/**
 * Retrieves the current date in the Gregorian calendar format.
 * @param {number} nowYear - The current year.
 * @param {number} nowMonth - The current month.
 * @param {number} nowDay - The current day of the month.
 */
exports.getDateNowGregorian = () => {
    // Get the current date
    const nowDate = new Date();
    
    // Get the current year
    const nowYear = nowDate.getFullYear();
    
    // Get the current month (adding 1 because JavaScript months are zero-based)
    const nowMonth = nowDate.getMonth() + 1;
    
    // Get the current day of the month
    const nowDay = nowDate.getDate();
    
    // Return an object containing the current date components
    return {
      /**
       * The current year.
       * @type {number}
       */
      nowYear,
      /**
       * The current month.
       * @type {number}
       */
      nowMonth,
      /**
       * The current day of the month.
       * @type {number}
       */
      nowDay,
    };
};
