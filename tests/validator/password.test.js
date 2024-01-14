const password = require("../../src/validator/form/password");
function sum(a, b) {
  return a + b;
}
test("valid password", () => {
  const isValid = password("MAHD2", {
    minLength: 2,
    lowerCase: false,
    maxLength: 64,
    number: true,
    String: true,
    specialCharacter: false,
    upperCase: true,
  });
  console.log("isValid:", isValid);

  expect(isValid).toBe(true);
});

test("no valid Password", () => {
  const inValid = password("Ma23%");

  expect(inValid).toBe(false);
});
