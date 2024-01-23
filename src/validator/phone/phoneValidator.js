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
 * const code1 = '1';
 * const phone1 = '1234567890';
 * validatePhoneNumber(code1, phone1)
 *   .then(result1 => {
 *     console.log(result1);
 *   })
 *   .catch(error1 => {
 *     console.error(error1);
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
