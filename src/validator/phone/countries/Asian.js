const {generateValidationResult , validationFormats,extractInfoValue} = require('../utils/FormatValidation')
exports.iran = (values) => {
    const { code, phone, patterns,hasCode,hasPhone } = extractInfoValue(values)
    let mobileFormat = `0${phone}`;
    let serviceFormat = `+${code}0${phone}`;
    let landline = `0${phone}`;
    const hasValidFormat = validationFormats(patterns,mobileFormat,landline,serviceFormat)
    if (hasValidFormat.every((result) => result)) {
      return generateValidationResult(values,hasValidFormat,hasCode,hasPhone,false)
    } else {

      return generateValidationResult(values,hasValidFormat,hasCode,hasPhone,false);
    }
  };

exports.China = (values)=>{
    const { code,hasCode,patterns,hasPhone,phone ,default:value} = extractInfoValue(values)
    const hasOne = /(?=.*[1])/.test(phone)
    console.log(phone);
    const mobile = `${phone}`;
    const service = `+${code}0${phone}`;
    const landline = `0${phone}`;
    const tollFree = ''
}