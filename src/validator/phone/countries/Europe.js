const { validationCountry, generateValidationResult, validatedCountry, extractInfoValue, validationFormats } = require("../utils/FormatValidation")
const countries = ['Belgium','Denmark','Finland','France','Germany','Greece','Hungary']
countries.forEach((country)=>{
    exports[country] = (values)=>{
        const { code,phone} = extractInfoValue(values)
        const international = `+${code}${phone}`
        const isDenmark = country === 'Denmark'?[international,phone]:[international,phone,phone]
        return validatedCountry(values,generateValidationResult,isDenmark)
    }
})