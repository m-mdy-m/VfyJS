const {generateValidationResult , validationFormats} = require('../utils/FormatValidation')
exports.iran = (values) => {
    const code = values.code;
    const phone = values.phone;
    const patterns = values.patterns;
    let mobileFormat = `0${phone}`;
    let serviceFormat = `+${code}0${phone}`;
    let landline = `0${phone}`;
    const hasCode = values.hasCode;
    const hasPhone = values.hasPhone;
    const hasValidFormat = validationFormats(patterns,mobileFormat,landline,serviceFormat)
    if (hasValidFormat.every((result) => result)) {
      return generateValidationResult(values,hasValidFormat,hasCode,hasPhone,false)
    } else {

      return generateValidationResult(values,hasValidFormat,hasCode,hasPhone,false);
    }
  };