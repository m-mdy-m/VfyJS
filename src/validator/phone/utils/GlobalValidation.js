const {getTelResource,readPhoneCodeData} = require("../config/phoneDataHandler")
const { trimmedValue } = require('../../../common/validationConstants')
const { TypesCheck, isEmpty, validateLength, ifFalsyValue }= require('../../../errors/HandleError')
const inputValidator = require('../../../utils/inputValidator')
const MAX_LENGTH_CODE = 10
const MIN_LENGTH_CODE = 1
async function hasCode(code){
    const numberCode = +code
    const validator = inputValidator(numberCode)
    isEmpty(code, 'Code should not be empty. Please provide a valid code.');
    validateLength(code,MIN_LENGTH_CODE,MAX_LENGTH_CODE,`Invalid code length. The code should be between ${MIN_LENGTH_CODE}and${MAX_LENGTH_CODE}characters.`)
    TypesCheck(code,['string', 'number'],'Invalid code. Code should be a string or a number.')
    ifFalsyValue(validator.hasNumeric(),'Invalid code format. The code should contain numeric characters.')
    if (typeof code === 'number') {
        code = `${code}`
    }
    const phoneCodeData = await readPhoneCodeData();
    ifFalsyValue(phoneCodeData,'Error fetching phone code data. Please try again later.')
    const phoneCodes = phoneCodeData.phoneCodes;
    const isoCodes = phoneCodeData.isoCodes;
    const countries = phoneCodeData.countries;
    code = trimmedValue(code)
    const index = phoneCodes.indexOf(code)
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
    isEmpty(phone, 'phone should not be empty. Please provide a valid code.');

}
function GlobalVal(code,phone){
    
}
module.exports = GlobalVal 