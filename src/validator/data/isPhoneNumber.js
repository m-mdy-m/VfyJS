const readPhoneCodeData = require('./getPhoneCode')
async function phoneNumber(code,phone){
    const getPhoneData = await readPhoneCodeData()
    const countries = getPhoneData.countries
    const isoCodes = getPhoneData.isoCodes
    const phoneCodes = getPhoneData.phoneCodes
    const indexOfCode = phoneCodes.indexOf(code)
    const result = phoneCodes[indexOfCode]
}
const result = phoneNumber('98',"915291407")
// [+][country code][area code][local phone number]
//  + 1 415 123 1234

console.log('result =>', result);
module.exports = phoneNumber