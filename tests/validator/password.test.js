const password = require('../../src/validator/form/password')
function sum(a, b) {
  return a + b;
}
test('valid password',()=>{
  const isValid = password('Mahdi139%@!$%((sm')

  expect(isValid).toBe(true);
} )
test('no valid Password',()=>{
  const inValid = password("Pass")

  expect(inValid).toBe(false)
} )