exports.hasUppercase = (input)=>{
    return /(?=.*[A-Z])/.test(input)
}
exports.hasLowerCase = (input)=>{
    return /(?=.*[a-z])/.test(input)
}
exports.hasNumber = (input)=>{
    return /(?=.*[\d])/.test(input)
}
exports.hasSpecialCharacter = (input)=>{
    return  /(?=.*[@$!%*?&])/.test(input)
}