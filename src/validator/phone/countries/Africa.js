const {generateValidationResult, validatedCountry} = require('../utils/FormatValidation')
const countries  = [ 'Djibouti' ,'Morocco', 'Kenya' ,'SouthAfrica']
countries.forEach((country)=>{
    exports[country] = (values)=>{
        return validatedCountry(values,generateValidationResult)
    }
})