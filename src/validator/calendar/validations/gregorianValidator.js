const {getSubstring}  = require('../../phone/utils/FormatValidation')
const {trimmedValue} = require('../../../common/validationConstants')
const inputValidator= require('../../../utils/inputValidator')
const { ifTruthyValue, TypesCheck }= require('../../../errors/HandleError')
function validateGregorianDate(year, month, day) {
    TypesCheck((year || month || day), ['number','string'],'Year, month, and day must be either numbers or strings.')
    const Dates = [year,month,day]
    Dates.forEach(date =>{
        let hasSpecialChar = inputValidator(date).hasSpecialCharacter()
        ifTruthyValue((hasSpecialChar),'Year, month, or day cannot contain special characters.')
    })
    Dates.forEach((date, index) => {
        Dates[index] = date.toString();
        Dates[index] =trimmedValue(date[index])
    });
    const nowDate = new Date();
    const nowYear = nowDate.getFullYear();
    const nowMonth = nowDate.getMonth() + 1; 
    const nowDay = nowDate.getDate();
    console.log();
}

const year = 2024;
const month = 12;
const day = 1;
console.log(validateGregorianDate('2  0  2    4', 12 , day)); 