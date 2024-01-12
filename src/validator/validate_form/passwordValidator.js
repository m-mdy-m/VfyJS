function validatePassword(password){
    
    const minLength = 8
    return password.length >= minLength
}

module.exports = validatePassword