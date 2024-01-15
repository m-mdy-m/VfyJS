const password = require("../../src/validator/form/password");
test("valid password", () => {
  const isValid = password("MAHD2", {
    minLength: 2,
    lowerCase: false,
    number: true,
    String: true,
    specialCharacter: false,
    upperCase: true,
  });
  expect(isValid).toBe(true);
});