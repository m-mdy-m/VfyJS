const {email} = require("../../src/index");
const validValue = "mahdimamashli1383@gmail.com";
test("email is valid", () => {
  const is_valid = email(validValue)
  expect(is_valid).toBe(true);
});
