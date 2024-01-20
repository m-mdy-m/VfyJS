const { readPhoneCodeData } = require('./getPhoneCode')
const { getPattern } = require('./getPhoneCode')

async function getCodeCountries(code) {
    const codeAllCountries = (await readPhoneCodeData()).phoneCodes;
    const codeCountriesFormat = (await getPattern()).phoneCodes;
  
    const isCodeAllCountries = codeAllCountries.includes(code);
    const isCodeCountriesFormat = codeCountriesFormat.includes(code);
  
    return isCodeAllCountries && isCodeCountriesFormat;
  }
  async  function findCountryByCode(code) {
    const phoneFormats = (await getPattern()).format;

    // Filter countries that match the provided code
    const matchingCountries = phoneFormats.filter((country) => country.countryCode === code);
  
    return matchingCountries;
  }


  async function phoneNumber(code, phone) {
    const isCode = await getCodeCountries(code);
  
    if (isCode) {
      const countriesWithMatchingCode = await findCountryByCode(code);
  
      if (countriesWithMatchingCode.length > 0) {
        console.log(`Countries with code ${code}:`);
        countriesWithMatchingCode.forEach((country) => {
          console.log(`- ${country.country}`);
          console.log(`  Country Code: ${country.countryCode}`);
          console.log(`  Continent: ${country.continent}`);
          console.log("  Formats:");
          country.formats.forEach((format) => {
            console.log(`    ${format.type}: ${format.pattern}`);
          });
        });
      } else {
        console.log(`No countries found with code ${code}`);
      }
    } else {
      console.log(`Invalid phone code: ${code}`);
    }
  }
  const result = phoneNumber('1', '915291407');
  // [+][country code][area code][local phone number]
//  + 1 415 123 1234

console.log('result =>', result);
module.exports = phoneNumber