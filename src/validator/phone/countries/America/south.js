const { generateValidationResult, validationCountry } = require("../../utils/FormatValidation");
const countries = ['Argentina','Brazil','Peru']
countries.forEach(country =>{
    exports[country] = (values)=>{
       return validationCountry(values,generateValidationResult,4)
    }
})