const {
  TypesCheck,
  ifFalsyValue,
  isEmpty,
} = require("../../errors/HandleError");
const { trimmedValue } = require("../../common/validationConstants");
const { readPhoneCodeData, getPattern } = require("./getPhoneCode");
/**
 * Retrieves country details based on the provided country code.
 *
 * @async
 * @function
 * @param {string} code - The country code.
 * @returns {Promise<object|null>} - Country details object or null if not found.
 * @throws {Error} - Throws an error if there is an issue retrieving the country details.
 * @example
 * const countryDetails = await findCountryDetailsByCode("98");
 * console.log(countryDetails);
 * // Output: { country: 'Iran', countryCode: '98', formats: [...] }
 *
 * @example
 * try {
 *   const invalidCountryDetails = await findCountryDetailsByCode("999");
 * } catch (error) {
 *   console.error(error.message);
 *   // Output: 'Country details not found for the provided code.'
 * }
 */
async function findCountryDetailsByCode(code) {
  const phoneFormats = await getPattern();
  const index = phoneFormats.phoneCodes.indexOf(code);
  return index !== -1
    ? {
        country: phoneFormats.countries[index],
        countryCode: phoneFormats.phoneCodes[index],
        formats: phoneFormats.format[index],
      }
    : null;
}
/**
 * Retrieves phone details based on the provided country code and phone number.
 *
 * @async
 * @function
 * @param {string|number} code - The country code.
 * @param {string} phone - The phone number.
 * @returns {Promise<object>} - Phone details object.
 * @throws {Error} - Throws an error if the phone number format is invalid or country details are not found.
 * @example
 * const result = await getPhoneDetails("98", "09XXxxxYzYx");
 * console.log(result);
 * // Output: { country: 'Iran', countryCode: '98', numberType: 'Mobile', numberPattern: '\\d{11}', inputPhoneNumber: '09XXxxxYzYx', formattedPhoneNumber: '+98-09XXxxxYzYx' }
 *
 * @example
 * try {
 *   const invalidResult = await getPhoneDetails("98", "12345");
 * } catch (error) {
 *   console.error(error.message);
 *   // Output: 'Invalid phone number format. Please check and try again.'
 * }
 */
async function getPhoneDetails(code, phone) {
  // Check if code is empty
  isEmpty(code, "Code should not be empty");

  // Check if phone is empty
  isEmpty(phone, "Phone should not be empty");
  code = trimmedValue(code);
  phone = trimmedValue(phone);
  TypesCheck(phone, ["number", "string"]);
  TypesCheck(code, ["number", "string"]);
  if (typeof code === "number") {
    code = `${code}`;
  }
  const countryDetails = await findCountryDetailsByCode(code);
  ifFalsyValue(
    countryDetails,
    "Country details not found for the provided code."
  );
  const phoneFormats = countryDetails.formats;
  let phonePatterns = [];
  let phoneTypes = [];
  phoneFormats.forEach((data) => {
    phonePatterns.push(data.pattern);
    phoneTypes.push(data.type);
  });
  const formattedPhoneNumber = `+${code}-${phone}`;
  for (let i = 0; i < phonePatterns.length; i++) {
    const regex = new RegExp(phonePatterns[i]);
    const isNumberMatch = regex.test(phone);
    if (isNumberMatch) {
      return {
        country: countryDetails.country,
        countryCode: countryDetails.countryCode,
        numberType: phoneTypes[i],
        numberPattern: phonePatterns[i],
        inputPhoneNumber: phone,
        formattedPhoneNumber: formattedPhoneNumber,
      };
    }
  }
  throw new Error("Invalid phone number format. Please check and try again.");
}
// Example usage
const result = getPhoneDetails();

// [+][country code][area code][local phone number]
//  + 1 415 123 1234

module.exports = getPhoneDetails;
