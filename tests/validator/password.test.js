const password = require("../../src/validator/form/password");
test("valid password", () => {
  const isValid = password("MAhdia@242@#@#$%");
  console.log("isValid:", isValid); 

  expect(isValid).toBe(true);
});