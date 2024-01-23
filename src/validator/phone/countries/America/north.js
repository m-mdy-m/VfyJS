const { extractInfoValue, getSubstring, validationFormats, generateValidationResult } = require("../../utils/FormatValidation")
exports.CanadaOrUs = (values)=>{
    const { code ,hasCode,hasPhone,patterns,phone} = extractInfoValue(values)
    const formattedTollFree = getSubstring(phone,[0,1],[1,4],[4,7],[7])
    const formattedService = `+${code}${phone}`
    const formattedMobile = getSubstring(phone,[0,3],[3,6],[6])
    const format = [formattedTollFree,formattedService,formattedMobile,formattedMobile]
    const hasValidFormat = validationFormats(patterns,format)
    return generateValidationResult(values,hasValidFormat,hasCode,hasPhone,true)
}
exports.Mexico = (values)=>{
    const {hasCode,hasPhone,patterns,phone} = extractInfoValue(values)
    const formattedTollFree = getSubstring(phone,[0,1],[1,4],[4,7],[7])
    const formattedService =getSubstring(phone,[0,1],[1,4],[4,6],[6])
    const format = [formattedTollFree,formattedService,phone,phone]
    const hasValidFormat = validationFormats(patterns,format)
    return generateValidationResult(values,hasValidFormat,hasCode,hasPhone)
}