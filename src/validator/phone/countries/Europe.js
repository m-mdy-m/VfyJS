const { validationCountry, generateValidationResult, validatedCountry, extractInfoValue, validationFormats } = require("../utils/FormatValidation")
const countries = ['Belgium','Denmark','Finland','France','Germany','Greece','Hungary','Iceland','Ireland','Italy','Netherlands']
countries.forEach((country)=>{
    exports[country] = (values)=>{
        const { code,phone} = extractInfoValue(values)
        const international = `+${code}${phone}`
        let format;
        if (values.patterns.length <=2) {
            format = [international,phone]
        }else{
            console.log();
            console.log();
            format = [international,phone,phone]
        }
        return validatedCountry(values,generateValidationResult,format)
    }
})