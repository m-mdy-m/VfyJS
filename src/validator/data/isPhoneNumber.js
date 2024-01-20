const { IfNotType } = require("../../errors/HandleError");
const { readPhoneCodeData,getPattern } = require("./getPhoneCode");

async function getCodeCountries(code) {
  const codeAllCountries = (await readPhoneCodeData()).phoneCodes;
  const codeCountriesFormat = (await getPattern()).phoneCodes;

  const isCodeAllCountries = codeAllCountries.includes(code);
  const isCodeCountriesFormat = codeCountriesFormat.includes(code);

  return isCodeAllCountries && isCodeCountriesFormat;
}
async function findCountryByCode(code) {
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
async function phoneNumber(code, phone) {
    const details = await findCountryByCode(code)
    const formats = details.formats
    let Patterns = []
    let type = []
    formats.forEach(data  => {
        Patterns.push(data.pattern)
        type.push(data.type)
    });
    const format_number = `+${code}-${phone}`
    for (let i = 0; i < Patterns.length; i++) {
        const regex = new RegExp(Patterns[i])
        const isNumber = regex.test(phone)
        if (isNumber) {
            return {
                "country": details.country,
                'countryCode': details.countryCode,
                'type_number' : type[i],
                'pattern' : Patterns[i],
                "phone": phone,
                "format_base": format_number,
            }
        }
    }
}

const result = phoneNumber('98','09115291407').then(result =>{
    console.log('result =>', result);
})

// [+][country code][area code][local phone number]
//  + 1 415 123 1234

module.exports = phoneNumber;
