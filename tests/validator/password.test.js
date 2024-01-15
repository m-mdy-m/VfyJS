const password = require("../../src/validator/form/password");
const value = "MAhdia@242@#@#$%"
test('is min length ? ', ()=>{
  const is_uppercase = password(value,{
    minLength : 10,
  })
  expect(is_uppercase).toBe(true);
})
test('is max Length ? ', ()=>{
  const is_uppercase = password(value,{
    maxLength : 63,
  })
  expect(is_uppercase).toBe(true);
})
test('is uppercase ? ', ()=>{
  const is_uppercase = password(value,{
    upperCase : true,
  })
  expect(is_uppercase).toBe(true);
})
test('is lowerCase ? ', ()=>{
  const is_lowerCase = password(value,{
    lowerCase : true,
  })
  expect(is_lowerCase).toBe(true);
})
test('is number ? ', ()=>{
  const is_number = password(value,{
    number : true,
  })
  expect(is_number).toBe(true);
})
test('is specialCharacter ? ', ()=>{
  const is_specialCharacter = password(value,{
    specialCharacter : true,
  })
  expect(is_specialCharacter).toBe(true);
})
test('is string ? ', ()=>{
  const is_string = password(value,{
    specialCharacter : true,
  })
  expect(is_string).toBe(true);
})