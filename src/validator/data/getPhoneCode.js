"use strict";
const fs = require("fs").promises;
const path = require("path");

/**
 * Reads and extracts phone code information from the specified JSON file.
 *
 * @returns {Promise<{countries: string[], phoneCodes: string[], isoCodes: string[]}>} - A Promise that resolves to an object containing arrays of countries, phone codes, and ISO codes.
 * @throws {Error} - Throws an error if there is an issue reading the file or parsing the JSON.
 */
async function readPhoneCodeData() {
  /**
   * @type {string} - The path to the JSON file containing phone code information.
   */
  const filePath = path.join(__dirname, "countryPhoneCodes.json");

  try {
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
  } catch (error) {
    /**
     * Throws an error if there is an issue reading the file or parsing the JSON.
     * @throws {Error}
     */
    throw new Error(`Error reading or parsing JSON: ${error.message}`);
  }
}
/**
 * Gets phone pattern information from the specified JSON file.
 *
 * @async
 * @returns {Promise<{countries: string[], phoneCodes: string[], continent: string[]}>} - A Promise that resolves to an object containing arrays of countries, phone codes, and unique continents.
 */
async function getPattern() {
    /**
     * @type {string} - The path to the JSON file containing phone pattern information.
     */
    const filePath = path.join(__dirname, "telephone_formats.json");
  
    try {
      // Read the JSON file
      const jsonData = await fs.readFile(filePath, "utf8");
      const phoneFormats = JSON.parse(jsonData);
  
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
       * Array containing continents.
       * @type {string[]}
       */
      let continentArray = [];
  
      // Extract information from the JSON data
      phoneFormats.forEach((formats) => {
        countries.push(formats.country);
        continentArray.push(formats.continent);
        phoneCodes.push(formats.countryCode);
      });
  
      // Create a Set to get unique continents
      const countriesSet = new Set(continentArray);
      
      // Convert Set to array using spread operator
      const continent = [...countriesSet];
  
      return {
        countries,
        phoneCodes,
        continent,
      };
    } catch (error) {
      /**
       * Throws an error if there is an issue reading the file or parsing the JSON.
       * @throws {Error}
       */
      throw new Error(`Error reading or parsing JSON: ${error.message}`);
    }
  }
  
module.exports = {getPattern , readPhoneCodeData};
