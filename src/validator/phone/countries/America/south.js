const { extractInfoValue,  validationFormats, generateValidationResult } = require("../../utils/FormatValidation");

const Validations = (values, countryCode) => {
    const {code, hasCode, hasPhone, patterns, phone } = extractInfoValue(values);

    let formats;
    switch (countryCode) {
        case 'Argentina':
            formats = [
                phone,
                phone,
                phone,
            ];
            break;
        case "Brazil":
            formats=[
                phone,
                phone,
                phone,
            ]
            break;
        case "Peru":
            formats=[
                phone,
                phone,
                phone,
            ]
            break;
    }

    const hasValidFormat = validationFormats(patterns, formats);
    return generateValidationResult(values, hasValidFormat, hasCode, hasPhone);
};
exports.Argentina = (values)=>{
return Validations(values,"Argentina")
}
exports.Brazil = (values)=>{
    return Validations(values,'Brazil')
}
exports.Peru = (values)=>{
    return Validations(values,'Peru')
}