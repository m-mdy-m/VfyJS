const { extractInfoValue, getSubstring, validationFormats, generateValidationResult } = require("../../utils/FormatValidation")

exports.CostaRica = (values)=>{
    const { code,hasCode,hasPhone,patterns,phone } = extractInfoValue(values)
    const tollFree = getSubstring(phone,[0,3],[3,6],[6])
    const service = getSubstring(phone,[0,3],[3,6],[6])
    const landline = getSubstring(phone,[0,4],[4])
    const mobile = getSubstring(phone,[0,4],[4])
    const formats = [tollFree,service,landline,mobile]
    const hasValidFormat = validationFormats(patterns,formats)
    return generateValidationResult(values,hasValidFormat,hasCode,hasPhone)
}
exports.ElSalvador = (values)=>{
    const { } = extractInfoValue(values)
    
}