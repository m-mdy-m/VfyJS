const hasValidate = {
    hasUppercase : input => /(?=.*[A-Z])/.test(input),
    hasLowerCase : input => /(?=.*[a-z])/.test(input),
    hasNumber : input => /(?=.*[\d])/.test(input),
    hasSpecialCharacter : input => /(?=.*[@$!%*?&#^|])/.test(input),
    hasString : input => /(?=.*[\w])/.test(input)
}
module.exports = hasValidate