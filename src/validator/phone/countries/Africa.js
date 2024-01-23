const {extractInfoValue,generateValidationResult,getSubstring,validationFormats, validatedCountry} = require('../utils/FormatValidation')
exports.Djibouti = (values)=>{
    return validatedCountry(values,generateValidationResult)
}
exports.Morocco = (values)=>{
    return validatedCountry(values,generateValidationResult)
}
exports.Kenya = (values)=>{
    return validatedCountry(values,generateValidationResult)
}