const { TypesCheck, ifFalsyValue } = require("../../errors/HandleError");
const { trimmedValue } = require("../../common/validationConstants");
const { readPhoneCodeData, getPattern } = require("./getPhoneCode");
/**
 * Retrieves country details based on the provided country code.
 *
 * @param {string} code - The country code.
 * @returns {object|null} - Country details object or null if not found.
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
 * @param {string|number} code - The country code.
 * @param {string} phone - The phone number.
 * @returns {object} - Phone details object.
 * @throws {Error} - Throws an error if the phone number format is invalid or country details are not found.
 */
async function getPhoneDetails(code, phone) {
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
        "country": countryDetails.country,
        "countryCode": countryDetails.countryCode,
        "numberType": phoneTypes[i],
        "numberPattern": phonePatterns[i],
        "inputPhoneNumber": phone,
        "formattedPhoneNumber": formattedPhoneNumber,
      };
    }
  }
  throw new Error("Invalid phone number format. Please check and try again.");
}
// Example usage
const result = getPhoneDetails("98",   "09 1  15   29 1 4 07").then((result) => {
    console.log("result =>", result);
  });

// [+][country code][area code][local phone number]
//  + 1 415 123 1234

module.exports = getPhoneDetails;
