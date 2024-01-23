const { validationCountry, generateValidationResult, validatedCountry, extractInfoValue, validationFormats } = require("../utils/FormatValidation")
const countries = ['Belgium','Denmark','Finland']
countries.forEach((country)=>{
    exports[country] = (values)=>{
        const { code,phone} = extractInfoValue(values)
        const international = `+${code}${phone}`
        const isBelgium = country === 'Denmark'?[international,phone]:[international,phone,phone]
        return validatedCountry(values,generateValidationResult,isBelgium)
    }
})
exports.Finland = (values)=>{

}