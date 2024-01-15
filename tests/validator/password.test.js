const password = require("../../src/validator/form/password");
test("valid password", () => {
  const isValid = password("MAHDI@#21312@");
  console.log("isValid:", isValid); 

  expect(isValid).toBe(true);
});