const { GlobalVal } = require('./utils/GlobalValidation');
const AsiaPhoneNumber = require('./continents/Asia');
const AfricaPhoneNumber = require('./continents/Africa');
const OceaniaPhoneNumber = require('./continents/Oceania');
const EuropePhoneNumber = require('./continents/Europe');
const NorthAmericaPhoneNumber = require('./continents/America/north');
const CentralAmericaPhoneNumber = require('./continents/America/central');
const SouthAmericaPhoneNumber = require('./continents/America/south');

/**
 * Validates a phone number based on its country code and phone number.
 *
 * @param {string} code - The country code of the phone number.
 * @param {string} phone - The phone number to be validated.
 * @returns {Promise<object>} - A promise that resolves to an object containing information about the validated phone number.
 *
 * @example
 * // Example: Validating a US phone number
 * const usCode = '1';
 * const usPhoneNumber = '1234567890';
 * validatePhoneNumber(usCode, usPhoneNumber)
 *   .then(result => {
 *     // The result object contains detailed information about the validated phone number
 *     console.log('Validation Result:');
 *     console.log('-------------------');
 *     console.log('Continent:', result.continent);
 *     console.log('Country:', result.country);
 *     console.log('Country Code:', result.code);
 *     console.log('ISO Codes:', result.isoCode);
 *     console.log('Phone Number:', result.phone);
 *     console.log('Has Country Code:', result.hasCode);
 *     console.log('Has Phone Number:', result.hasPhone);
 *     console.log('Is Duplicate Code:', result.isDuplicateCode);
 *     console.log('Is Toll-Free:', result.tollFree);
 *     console.log('Is Service Number:', result.service);
 *     console.log('Is Landline Number:', result.landline);
 *     console.log('Is Mobile Number:', result.mobile);
 *   })
 *   .catch(error => {
 *     console.error(error);
 *   });
 */
async function validatePhoneNumber(code, phone) {
  // Get information about the phone number using GlobalVal function
  const informationPhone = await GlobalVal(code, phone);

  // Switch based on the continent and call the respective validation function
  switch (informationPhone.continent) {
    case "Asia":
      return AsiaPhoneNumber(informationPhone);

    case "Africa":
      return AfricaPhoneNumber(informationPhone);

    case "Oceania":
      return OceaniaPhoneNumber(informationPhone);

    case "Europe":
      return EuropePhoneNumber(informationPhone);

    case "North America":
      return NorthAmericaPhoneNumber(informationPhone);

    case "Central America":
      return CentralAmericaPhoneNumber(informationPhone);

    case "South America":
      return SouthAmericaPhoneNumber(informationPhone);
  }
}
module.exports = validatePhoneNumber;
