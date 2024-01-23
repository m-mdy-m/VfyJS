const { validationCountry, generateValidationResult } = require("../utils/FormatValidation")
const countries = ['Australia', 'NewZealand'];
countries.forEach(country => {
    exports[country] = (values) => {
        const lastDigit = country === 'Australia' ? 4 : 1;
        return validationCountry(values, generateValidationResult, lastDigit);
    }
});