const {generateValidationResult , validationFormats,extractInfoValue,getSubstring, customSubstring} = require('../utils/FormatValidation')
exports.iran = (values) => {
    const { code, phone, patterns,hasCode,hasPhone } = extractInfoValue(values)
    const format = [ `0${phone}`,`+${code}0${phone}`, `0${phone}`]
    const hasValidFormat = validationFormats(patterns,format)
    return generateValidationResult(values,hasValidFormat,hasCode,hasPhone,false);
  };

exports.China = (values)=>{
    const { hasCode,patterns,hasPhone,phone} = extractInfoValue(values)
    const format = [phone, phone, `0${phone}`, phone];
    const hasValidFormat =validationFormats(patterns,format)
    return generateValidationResult(values,hasValidFormat,hasCode,hasPhone,false)
}
exports.HongKongAndMacau = (values)=>{
    const {hasCode,hasPhone,patterns,phone }= extractInfoValue(values)
    const format = [phone]
    const hasValidFormat = validationFormats(patterns,format)
    return generateValidationResult(values,hasValidFormat,hasCode,hasPhone,false)
}
exports.India = (values)=>{
    const { code,hasCode,hasPhone,patterns,phone } = extractInfoValue(values)
    const LandlinePhone = phone.split(phone.length - 4)
    const sectionOne = LandlinePhone[0]
    const sectionTwo = LandlinePhone[1]
    const landline = `${sectionOne}-${sectionTwo}`;
    let tollFree = phone
    const hasStartWithOne =  tollFree.startsWith("1")
    const numbers = tollFree.split('800')[1]
    const hasSixNumber = /^\d{6}$/.test(numbers)
    let format;
    if (hasStartWithOne && hasSixNumber) {
        format = [`+${code}${phone}`,phone,landline,tollFree]
    }else{
        format = [`+${code}${phone}`,phone,landline,false]
    }
    const hasValidFormat = validationFormats(patterns,format)
    return generateValidationResult(values,hasValidFormat,hasCode,hasPhone,false)
}
exports.Japan = (values)=>{
    const {hasCode,hasPhone,patterns,phone} = extractInfoValue(values)
    const [w,r,y]=getSubstring(phone,[0,4],[4,6],[6])
    const formattedPhoneNumber = `${w}-${r}-${y}`;
    const [h,j,l] = getSubstring(phone,[0,2],[2,6],[6])
    const hasStartZero = phone.startsWith("0")
    let format;
    if (hasStartZero) {
        const formattedLandLineNumber = `${h}-${j}-${l}`
        format = [formattedPhoneNumber,phone,formattedLandLineNumber]
    }else{
        format = [formattedPhoneNumber,phone,false]
    }
    const hasValidFormat = validationFormats(patterns,format)
    return generateValidationResult(values,hasValidFormat,hasCode,hasPhone,false)
}
exports.Malaysia = (values)=>{
    const {code,hasCode,hasPhone,patterns,phone} = extractInfoValue(values)
    // Mobile Number Formatting
    const [m,s] = getSubstring(phone,[0,3],[3])
    const formattedMobile = `${m}-${s}`;
    // Service Number Formatting
    const [c,f,g,n] = getSubstring(phone,[0,1],[1,4],[4,6],[6])
    const formattedService = `${c}-${f}-${g}-${n}`;
    // Landline Number Formatting
    const [ h,t]= getSubstring(phone,[0,2],[2])
    const formattedLandline = `${h}-${t}`;
    // Toll-Free Number Formatting
    const [w,r,u,i] = getSubstring(phone,[0,1],[1,4],[4,6],[6])
    const formattedTollFreeNumber = `${w}-${r}-${u}-${i}`;
    const format = [formattedMobile,formattedService,formattedLandline,formattedTollFreeNumber]
    const hasValidFormat = validationFormats(patterns,format)
    return generateValidationResult(values,hasValidFormat,hasCode,hasPhone,false)
}