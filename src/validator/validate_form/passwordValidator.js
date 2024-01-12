function validatePassword(password){
    const isUppercase = /(?=.*[A-Z])/
    const isLowercase = /(?=.*[a-z])/
    const isOneDigit = /(?=.*\d)/
    const isSpecialCharacter = /(?=.*[@$!%*?&])/
    const minLength = 8
    return password.length >= minLength
}

module.exports = validatePassword