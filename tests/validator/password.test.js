const password = require("../../src/validator/form/password");
test("valid password", () => {
  const isValid = password("NAHDISA", {
    minLength: 4,
    lowerCase: false,
    upperCase: true,
    number: false,
    SpecialCharacter: false,
    String: true,
  });
  
  expect(isValid).toBe(true);
});
