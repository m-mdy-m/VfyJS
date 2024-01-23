const { validationCountry, generateValidationResult } = require("../utils/FormatValidation")

exports.Australia = (values)=>{
    return validationCountry(values,generateValidationResult,4)
}