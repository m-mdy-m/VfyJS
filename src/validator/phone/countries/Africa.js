const {extractInfoValue,generateValidationResult,getSubstring,validationFormats} = require('../utils/FormatValidation')
exports.Djibouti = (values)=>{
    const {code,hasCode,hasPhone,patterns,phone} = extractInfoValue(values)
    const international = `+${code}${phone}`
    const format = [phone,international,phone]
    const hasValidFormat = validationFormats(patterns,format)
    return generateValidationResult(values,hasValidFormat,hasCode,hasPhone)
}