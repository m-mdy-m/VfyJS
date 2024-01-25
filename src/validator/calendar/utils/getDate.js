/**
 * Retrieves the current date and time in the Gregorian calendar format.
 * @returns {object} An object containing the current date and time components.
 * @property {number} nowYear - The current year.
 * @property {number} nowMonth - The current month.
 * @property {number} nowDay - The current day of the month.
 * @property {number} nowHours - The current hour.
 * @property {number} nowMinutes - The current minute.
 * @property {number} nowSeconds - The current second.
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

    // Get the current hour
    const nowHours = nowDate.getHours();

    // Get the current minute
    const nowMinutes = nowDate.getMinutes();

    // Get the current second
    const nowSeconds = nowDate.getSeconds();
    
    // Return an object containing the current date and time components
    return {
        nowYear,
        nowMonth,
        nowDay,
        nowHours,
        nowMinutes,
        nowSeconds
    };
};
