const { validationCountry, generateValidationResult, validatedCountry, extractInfoValue, validationFormats } = require("../utils/FormatValidation")
const countries = ['KazakhstanOrRussia','Romania','Portugal','Poland','Belgium','Denmark','Finland','France','Germany','Greece','Hungary','Iceland','Ireland','Italy','Netherlands','Norway']
countries.forEach((country)=>{
    exports[country] = (values)=>{
        const { code,phone} = extractInfoValue(values)
        const international = `+${code}${phone}`
        let format;
        if (values.patterns.length <=2) {
            format = [international,phone]
        }else{
            format = [international,phone,phone]
        }
        return validatedCountry(values,generateValidationResult,format)
    }
})