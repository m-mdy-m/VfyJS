const { IfNotType } = require("../../errors/HandleError");
const { readPhoneCodeData,getPattern } = require("./getPhoneCode");

  async function findCountryDetailsByCode(code) {
    const phoneFormats = (await getPattern());
    const index = phoneFormats.phoneCodes.indexOf(code);
    if (index !== -1) {
       const countryDetails = {
         "country": phoneFormats.countries[index],
         "countryCode": phoneFormats.phoneCodes[index],
         "formats": phoneFormats.format[index]
       }
       return countryDetails
    }
    return false
   }
async function getPhoneDetails(code, phone) {
 const countryDetails = await findCountryDetailsByCode(code);
 const phoneFormats = countryDetails.formats;
 let phonePatterns = [];
 let phoneTypes = [];
    phoneFormats.forEach((data) => {
    phonePatterns.push(data.pattern);
    phoneTypes.push(data.type);
 });
 const formattedNumber = `+${code}-${phone}`;
 for (let i = 0; i < phonePatterns.length; i++) {
    const regex = new RegExp(phonePatterns[i]);
    const isNumber = regex.test(phone);

    if (isNumber) {
      return {
        "country": countryDetails.country,
        'countryCode': countryDetails.countryCode,
        'type_number': phoneTypes[i],
        'pattern': phonePatterns[i],
        "phone": phone,
        "format_base": formattedNumber,
      };
    }
 }
}

const result = getPhoneDetails('98','09115291407').then(result =>{
    console.log('result =>', result);
})

// [+][country code][area code][local phone number]
//  + 1 415 123 1234

module.exports = getPhoneDetails;
