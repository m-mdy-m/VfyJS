const password = require('../../src/validator/form/password')
function sum(a, b) {
  return a + b;
}
test('valid password',()=>{
  const options = {
    minLength:5,
    lowerCase : false,
    upperCase :false,
    number : true,
    specialCharacter : false,
    String : false,
  }
  const isValid = password("1344921321", options)

  expect(isValid).toBe(true);
} )
test('no valid Password',()=>{
  const inValid = password('Ma23%')

  expect(inValid).toBe(false)
} )