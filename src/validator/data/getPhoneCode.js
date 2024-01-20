const fs = require("fs").promises;
const path = require("path");
/**
 * Reads and extracts phone code information from the specified JSON file.
 *
 * @returns {Promise<Object|null>} - A Promise that resolves to an object containing arrays of countries, phone codes, and ISO codes, or null if an error occurs.
 */
async function readPhoneCodeData() {
    const filePath = path.join(__dirname, "countryPhoneCodes.json");
    // Read the JSON file
    const jsonData = await fs.readFile(filePath, "utf8");
    const phoneCodeData = JSON.parse(jsonData);
    /**
     * Array containing names of countries.
     * @type {string[]}
     */
    let countries = [];

    /**
     * Array containing phone codes.
     * @type {string[]}
     */
    let phoneCodes = [];

    /**
     * Array containing ISO codes.
     * @type {string[]}
     */
    let isoCodes = [];

    // Extract information from the JSON data
    phoneCodeData.forEach((countryData) => {
      countries.push(countryData.country);
      phoneCodes.push(countryData.code);
      isoCodes.push(countryData.iso);
    });

    // Return an object with arrays of information
    return {
      countries,
      phoneCodes,
      isoCodes,
    };
};
module.exports = readPhoneCodeData
