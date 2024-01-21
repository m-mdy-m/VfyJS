const {getTelResource,readPhoneCodeData} = require("../config/phoneDataHandler")
const { trimmedValue } = require('../../../common/validationConstants')
const { TypesCheck, isEmpty, validateLength, ifFalsyValue }= require('../../../errors/HandleError')
const inputValidator = require('../../../utils/inputValidator')
const MAX_LENGTH_CODE = 10
const MIN_LENGTH_CODE = 1
const MAX_LENGTH_PHONE_NUMBER = 25
const MIN_LENGTH_PHONE_NUMBER = 6

function ChecKValue(value,min,max,ContentError=String){
    const numberCode = +value
    const validator = inputValidator(numberCode)
    isEmpty(value, `${ContentError} should not be empty. Please provide a valid ${ContentError}.`);
    validateLength(value,min,max,`Invalid ${ContentError} length. The ${ContentError} should be between ${min}and${max}characters.`)
    TypesCheck(value,['string', 'number'],`Invalid ${ContentError}. ${ContentError} should be a string or a number.`)
    ifFalsyValue(validator.hasNumeric(),`Invalid ${ContentError} format. The ${ContentError} should contain numeric characters.`)
    if (typeof value === 'number') {
        value = `${value}`
    }
    value = trimmedValue(value)
    return value
}
async function hasCode(code){
    const validatedValue  = ChecKValue(code, MIN_LENGTH_CODE,MAX_LENGTH_CODE,'Code')
    const phoneCodeData = await readPhoneCodeData();
    ifFalsyValue(phoneCodeData,'Error fetching phone code data. Please try again later.')
    const phoneCodes = phoneCodeData.phoneCodes;
    const isoCodes = phoneCodeData.isoCodes;
    const countries = phoneCodeData.countries;
    const index = phoneCodes.indexOf(validatedValue)
    return index !==-1 ? {
        code : phoneCodes[index],
        country : countries[index].toLowerCase(),
        iso : isoCodes[index],
        hasCode : true
    }: false
}
hasCode(98).then(result =>{
    console.log(result);
})
function hasPhone(phone){
    const validatedPhoneNumber = ChecKValue(phone, MIN_LENGTH_PHONE_NUMBER, MAX_LENGTH_PHONE_NUMBER, "Phone Number");
    
    return validatedPhoneNumber;
}
function GlobalVal(code,phone){
    
}
module.exports = GlobalVal 