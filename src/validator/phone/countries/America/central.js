const { extractInfoValue, getSubstring, validationFormats, generateValidationResult } = require("../../utils/FormatValidation")
const Validations = (values, countryCode) => {
    const {code, hasCode, hasPhone, patterns, phone } = extractInfoValue(values);

    let formats;
    switch (countryCode) {
        case 'CostaRica':
            formats = [
                getSubstring(phone, [0, 3], [3, 6], [6]),
                getSubstring(phone, [0, 3], [3, 6], [6]),
                getSubstring(phone, [0, 4], [4]),
                getSubstring(phone, [0, 4], [4])
            ];
            break;
        case 'ElSalvador':
            formats = [
                getSubstring(phone, [0, 3], [3, 6], [6]),
                getSubstring(phone, [0, 4], [4]),
                getSubstring(phone, [0, 4], [4])
            ];
            break;
        case "Guatemala":
            formats =[
                `+${code}${phone}`,
                getSubstring(phone,[0,4],[4]),
                getSubstring(phone,[0,4],[4]),
            ]
            break;
        case 'Honduras':
            formats = [
                getSubstring(phone,[0,4],[4]),
                getSubstring(phone,[0,4],[4]),
            ]
    }

    const hasValidFormat = validationFormats(patterns, formats);
    return generateValidationResult(values, hasValidFormat, hasCode, hasPhone);
};
exports.CostaRica = (values)=>{
    return Validations(values,'CostaRica')
}
exports.ElSalvador = (values)=>{
    return Validations(values,'ElSalvador')
}
exports.Guatemala = (values)=>{
    return Validations(values,'Guatemala')
}
exports.Honduras = (values)=>{
    return Validations(values,'Honduras')
}