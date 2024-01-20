const { TypesCheck } = require("../../errors/HandleError");
const { trimmedValue } = require("../../common/validationConstants");
const { readPhoneCodeData, getPattern } = require("./getPhoneCode");

async function findCountryDetailsByCode(code) {
  const phoneFormats = await getPattern();
  const index = phoneFormats.phoneCodes.indexOf(code);
  if (index !== -1) {
    const countryDetails = {
      country: phoneFormats.countries[index],
      countryCode: phoneFormats.phoneCodes[index],
      formats: phoneFormats.format[index],
    };
    return countryDetails;
  }
  return false;
}
async function getPhoneDetails(code, phone) {
  code = trimmedValue(code);
  phone = trimmedValue(phone);
  TypesCheck(phone, ["number", "string"]);
  TypesCheck(code, ["number", "string"]);
  if (typeof code === "number") {
    code = `${code}`;
  }
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
        country: countryDetails.country,
        countryCode: countryDetails.countryCode,
        type_number: phoneTypes[i],
        pattern: phonePatterns[i],
        phone: phone,
        format_base: formattedNumber,
      };
    }
  }
}

const result = getPhoneDetails("98", "91  15   291 4  07").then((result) => {
  console.log("result =>", result);
});

// [+][country code][area code][local phone number]
//  + 1 415 123 1234

module.exports = getPhoneDetails;
