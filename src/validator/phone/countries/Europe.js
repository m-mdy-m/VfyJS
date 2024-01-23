const { validationCountry, generateValidationResult, validatedCountry, extractInfoValue, validationFormats } = require("../utils/FormatValidation")

exports.Belgium = (values)=>{
    const { code,phone } = extractInfoValue(values)
    const international = `+${code}${phone}`
    return validatedCountry(values,generateValidationResult,[international,phone,phone])
}