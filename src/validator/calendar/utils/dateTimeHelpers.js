/**
 * Returns the name of the current day of the week.
 * @returns {string} The name of the current day of the week.
 */
function getDay() {
    // Array containing the names of days of the week
    const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // Get the index of the current day of the week (0 for Sunday, 1 for Monday, etc.)
    const dayOfWeekIndex = new Date().getDay();

    // Retrieve the name of the day of the week using the index
    const dayOfWeekName = dayOfWeek[dayOfWeekIndex];

    // Return the name of the day of the week
    return dayOfWeekName;
}

/**
 * Returns the name of the current month.
 * @returns {string} The name of the current month.
 */
function getMonth() {
    // Array containing the names of months
    const monthOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    // Get the index of the current month (0 for January, 1 for February, etc.)
    const monthOfYearIndex = new Date().getMonth();

    // Retrieve the name of the month using the index
    const monthOfYearName = monthOfYear[monthOfYearIndex];

    // Return the name of the month
    return monthOfYearName;
}

module.exports = { getDay, getMonth };
