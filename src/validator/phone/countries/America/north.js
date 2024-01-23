const { extractInfoValue, getSubstring, validationFormats, generateValidationResult } = require("../../utils/FormatValidation")

exports.CanadaOrUs = (values)=>{
    const { code ,hasCode,hasPhone,patterns,phone} = extractInfoValue(values)
    console.log('phone =>',phone); // 1-800-123-4567
    const [t,r,f,v]= getSubstring(phone,[0,1],[1,4],[4,7],[7])
    const formattedTollFree = `${t}-${r}-${f}-${v}`
    const [w,j,y] = getSubstring(phone,[0,3],[3,6],[6])
    const formattedMobile =`${w}-${j}-${y}`
    const formattedService = `+${code}${phone}`
    const format = [formattedTollFree,formattedService,formattedMobile,formattedMobile]
    const hasValidFormat = validationFormats(patterns,format)
    return generateValidationResult(values,hasValidFormat,hasCode,hasPhone,true)
}