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
  // Retrieve phone patterns and formats
  const phoneFormats = await getPattern();
  // Find the index of the provided country code
  const index = phoneFormats.phoneCodes.indexOf(code);
  // Return country details if found, otherwise return null
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
  // Convert code to string if it's a number
  if (typeof code === "number") {
    code = `${code}`;
  }
  // Convert phone to string if it's a number
  if (typeof phone === "number") {
    phone = `${phone}`;
  }
  // Check if code is empty
  isEmpty(code, "Code should not be empty");

  // Check if phone is empty
  isEmpty(phone, "Phone should not be empty");
  // Check and enforce valid types for code and phone
  TypesCheck(phone, ["number", "string"]);
  TypesCheck(code, ["number", "string"]);
  // Trim code and phone for consistency
  code = trimmedValue(code);
  phone = trimmedValue(phone);

  // Retrieve country details for the provided code
  const countryDetails = await findCountryDetailsByCode(code);
  // Throw an error if country details are not found
  ifFalsyValue(
    countryDetails,
    "Country details not found for the provided code."
  );

  // Extract phone patterns and types from country details
  const phoneFormats = countryDetails.formats;
  const phonePatterns = [];
  const phoneTypes = [];

  phoneFormats.forEach((data) => {
    phonePatterns.push(new RegExp(data.pattern));
    phoneTypes.push(data.type);
  });
  const formattedPhoneNumber = `+${code}-${phone}`;
  const formattedPhone = `${code}-${phone}`;
  console.log('phoneFormats =>',phoneFormats.length);
  console.log('phonePatterns =>',phonePatterns.length);
  // Check if the provided phone number matches any of the patterns
  for (let i = 0; i < phonePatterns.length; i++) {
    const regex = phonePatterns[i];
    const isNumberMatch = regex.test(formattedPhone);
    console.log('regex =>', regex);
    console.log('formattedPhone =>', formattedPhone);
    console.log('isNumberMatch =>', isNumberMatch);
    // If a match is found, return phone details
    if (isNumberMatch) {
      return {
        country: countryDetails.country,
        countryCode: countryDetails.countryCode,
        numberType: phoneFormats[i].type,
        numberPattern: phoneFormats[i].pattern,
        inputPhoneNumber: formattedPhone,
        formattedPhoneNumber: formattedPhoneNumber,
      };
    }
  }

  // Throw an error if no matching pattern is found
  throw new Error("Invalid phone number format. Please check and try again.");
}

const result = async () => {
  try {
    const details = await getPhoneDetails("1","8001234567");
    console.log(details);
  } catch (error) {
    console.error(error.message);
  }
};

result();

module.exports = getPhoneDetails;
