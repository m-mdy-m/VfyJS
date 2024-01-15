const password = require("../../src/validator/form/password");
const value = "mma32asdas"
const option = {
  minLength : 5,
  maxLength : 60,
  lowerCase : true,
  upperCase  : false,
  number     : true,
  specialCharacter : false,
  
}
test('password is valid ',()=>{
  const is_valid = password(value,option)

  expect(is_valid).toBe(true)
})
test('password is Invalid', ()=>{
  const is_Invalid = password(value,option)

  expect(is_Invalid).toBe(false)
})

test('is min length ? ', ()=>{
  const is_uppercase = password(value,{minLength : 5,})
  expect(is_uppercase).toBe(true);
})
test('is max Length ? ', ()=>{
  const is_uppercase = password(value,{maxLength : 60,})
  expect(is_uppercase).toBe(true);
})
test('is uppercase ? ', ()=>{
  const is_uppercase = password(value,{upperCase  : false,})
  expect(is_uppercase).toBe(true);
})
test('is lowerCase ? ', ()=>{
  const is_lowerCase = password(value,{lowerCase : true,})
  expect(is_lowerCase).toBe(true);
})
test('is number ? ', ()=>{
  const is_number = password(value,{number     : true,})
  expect(is_number).toBe(true);
})
test('is specialCharacter ? ', ()=>{
  const is_specialCharacter = password(value,{specialCharacter : false,})
  expect(is_specialCharacter).toBe(true);
})