const email = require("../../src/validator/form/email");
const validValue = "meddishn312as!dsccc@yahoo.ir";
test("password is valid", () => {
  const is_valid = email(validValue);

  expect(is_valid).toBe(true);
});
