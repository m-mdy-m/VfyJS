const hasValidate = require('../../utils/hasUtilsFunction')
function validatePassword(password){
    
    const minLength = 8
    return password.length >= minLength && hasValidate.hasLowerCase && hasValidate.hasUppercase && hasValidate.hasNumber && hasValidate.hasSpecialCharacter 
}

module.exports = validatePassword