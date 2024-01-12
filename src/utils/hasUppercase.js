function hasUppercase(input){
    return /(?=.*[A-Z])/.test(input)
}
module.exports = hasUppercase