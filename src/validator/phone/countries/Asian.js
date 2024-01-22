const {generateValidationResult , validationFormats,extractInfoValue} = require('../utils/FormatValidation')
exports.iran = (values) => {
    const { code, phone, patterns,hasCode,hasPhone } = extractInfoValue(values)
    const format = [ `0${phone}`,`+${code}0${phone}`, `0${phone}`]
    const hasValidFormat = validationFormats(patterns,format)
    return generateValidationResult(values,hasValidFormat,hasCode,hasPhone,false);
  };

exports.China = (values)=>{
    const { hasCode,patterns,hasPhone,phone} = extractInfoValue(values)
    const format = [phone, phone, `0${phone}`, phone];
    const hasValidFormat =validationFormats(patterns,format)
    return generateValidationResult(values,hasValidFormat,hasCode,hasPhone,false)
}