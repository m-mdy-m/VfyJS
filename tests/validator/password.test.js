const password = require("../../src/validator/form/password");
function sum(a, b) {
  return a + b;
}
test("valid password", () => {
  const isValid = password("12342421", {
    lowerCase: false,
    String: true,
    upperCase: false,
    number: true,
    specialCharacter: false,
    minLength :3,
  });

  expect(isValid).toBe(true);
});
test("no valid Password", () => {
  const inValid = password("Ma23%");

  expect(inValid).toBe(false);
});
