const {generateValidationResult , validationFormats,extractInfoValue,getSubstring} = require('../utils/FormatValidation')
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
    const {code,hasCode,hasPhone,patterns,phone} = extractInfoValue(values)
    const FourDigits = getSubstring(phone,0,4)
    const TwoDigits =  getSubstring(phone,4,6)
    const threeDigits = getSubstring(phone,6)
    const formattedPhoneNumber = `${FourDigits}-${TwoDigits}-${threeDigits}`;

    const TwoDigitsLandLine = getSubstring(phone,0,2)
    const FourDigitsLandLine = getSubstring(phone,2,6)
    const FourDigitsLandLine2 = getSubstring(phone,6)
    const hasStartZero = phone.startsWith("0")
    let format;
    if (hasStartZero) {
        const formattedLandLineNumber = `${TwoDigitsLandLine}-${FourDigitsLandLine}-${FourDigitsLandLine2}`
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
    const mobileAreaCode = getSubstring(phone,0,3)
    const mobileRemainingDigits = getSubstring(phone,3)
    const formattedMobile = `${mobileAreaCode}-${mobileRemainingDigits}`;
    // Service Number Formatting
    const serviceCountryCode = getSubstring(phone,0,1) // '1-300-12-3456'
    const serviceCode = getSubstring(phone,1,4)
    const serviceGroupCode = getSubstring(phone,4,6) 
    const serviceSubscriberNumber = getSubstring(phone,6) 
    const formattedService = `${serviceCountryCode}-${serviceCode}-${serviceGroupCode}-${serviceSubscriberNumber}`;
    // Landline Number Formatting
    const landlineAreaCode = getSubstring(phone,0,2)  // '03-12345678'
    const landlineSubscriberNumber = getSubstring(phone,2)
    const formattedLandline = `${landlineAreaCode}-${landlineSubscriberNumber}`;
    // Toll-Free Number Formatting
    const tollFreeCountryCode = getSubstring(phone,0,1)
    const tollFreeCode = getSubstring(phone,1,4)
    const tollFreeGroupCode = getSubstring(phone,4,6)
    const tollFreeSubscriberNumber = getSubstring(phone,6)
    const formattedTollFreeNumber = `${tollFreeCountryCode}-${tollFreeCode}-${tollFreeGroupCode}-${tollFreeSubscriberNumber}`;
    const format = [formattedMobile,formattedService,formattedLandline,formattedTollFreeNumber]
    const hasValidFormat = validationFormats(patterns,format)
    return generateValidationResult(values,hasValidFormat,hasCode,hasPhone,false)
}