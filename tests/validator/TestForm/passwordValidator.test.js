const passwordValidator = require("../../../src/validator/validate_form/passwordValidator");

describe("validates a password with at least 8 characters", () => {
  test("should return true for a valid password", () => {
    const validPassword = "mdy_mmshlu";
    const isValid = passwordValidator(validPassword, {
      lowerCase: true,
      upperCase: false,
      minLength: 4,
      maxLength: 10,
      number: false,
      specialCharacter: true,
      repeatChar: 2,
    });

    expect(isValid).toBe(true);
  });

  test("should return false for an invalid password", () => {
    const invalidPassword = "Pwd";
    const isValid = passwordValidator(invalidPassword);

    expect(isValid).toBe(false);
  });
});
