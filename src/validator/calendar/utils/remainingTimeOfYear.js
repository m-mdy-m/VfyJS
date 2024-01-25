/**
 * Calculates the remaining time in the current year.
 * @returns {object} An object containing the remaining time.
 * @property {number} months - The number of months remaining in the current year.
 * @property {number} days - The number of days remaining in the current year.
 * @property {number} hours - The number of hours remaining in the current year.
 * @property {number} minutes - The number of minutes remaining in the current year.
 * @property {number} seconds - The number of seconds remaining in the current year.
 */
function calculateRemainingTimeOfYear() {
    // Get the current date
    const nowDate = new Date();
    
    // Get the current year
    const nowYear = nowDate.getFullYear();
    
    // Set the end of the current year
    const endYear = new Date(nowYear, 11, 31);
    
    // Calculate the time difference between the current date and the end of the year
    const timeDifference = endYear.getTime() - nowDate.getTime();
    // Calculate the remaining time in months, days, hours, minutes, and seconds
    const monthRemaining = Math.floor(timeDifference / (1000 * 60 * 60 * 60 * 12));
    const daysRemaining = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hoursRemaining = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutesRemaining = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const secondsRemaining = Math.floor((timeDifference % (1000 * 60)) / 1000);
    // Return an object containing the remaining time
    return {
        months: monthRemaining,
        days: daysRemaining,
        hours: hoursRemaining,
        minutes: minutesRemaining,
        seconds: secondsRemaining
    };
}

module.exports = calculateRemainingTimeOfYear;
