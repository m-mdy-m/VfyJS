const test = require('./src/validator/validate_form/passwordValidator')

const a = test("MAHDI23!@4",{
    minLength : 5,
    maxLength : 20,
    lowerCase : true,
})
console.log(a);