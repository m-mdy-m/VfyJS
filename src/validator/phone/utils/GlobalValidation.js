const {getTelResource} = require("../config/phoneDataHandler")
const { trimmedValue } = require('../../../common/validationConstants')
const { TypesCheck, isEmpty, validateLength }= require('../../../errors/HandleError')
const MAX_LENGTH_CODE = 10
const MIN_LENGTH_CODE = 1
function hasCode(code){
    isEmpty(code, 'Code should not be empty. Please provide a valid code.');
    validateLength(code,MIN_LENGTH_CODE,MAX_LENGTH_CODE,`Invalid code length. The code should be between ${MIN_LENGTH_CODE}and${MAX_LENGTH_CODE}characters.`)
    TypesCheck(code,['string', 'number'],'Invalid code. Code should be a string or a number.')
    if (typeof code === 'number') {
        code = `${code}`
    }
    code = trimmedValue(code)
    return true
}
const a = hasCode(1)
console.log(a);
function hasPhone(phone){
    isEmpty(phone, 'phone should not be empty. Please provide a valid code.');

}
function GlobalVal(code,phone){
    
}
module.exports = GlobalVal 