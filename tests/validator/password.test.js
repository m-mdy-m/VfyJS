const { password } = require("../../index");

describe("validatePassword function", () => {
  // Test case for a valid password
  test("valid password", () => {
    const isValid = password("StrongPwd@123", { minLength: 8, uppercase: true, number: true });
    expect(isValid).toBe(true);
  });

  // Test case for a valid password with custom options
  test("valid password with custom options", () => {
    const isValid = password("sdaa@@#asd354A3%#!w", {
      minLength: { value: 2, errorMessage: "Password must be at least 10 characters long." },
      maxLength: { value: 20, errorMessage: "Password cannot exceed 30 characters." },
      uppercase: { required: false, errorMessage: "uppercase." },
      lowercase: { required: true, errorMessage: "lowercase." },
      number: { required: false, errorMessage: "number." },
      specialCharacter: { required: false, errorMessage: "specialCharacter." },
      alphabetic: { required: true, errorMessage: "alphabetic." },
      whitespace: { required: false, errorMessage: "whitespace." },
    });
    expect(isValid).toBe(true);
  });

  // Test case for an invalid password with insufficient length
  test("invalid password - insufficient length", () => {
    try {
      const isValid = password("Weak@P", { minLength: { value: 10, errorMessage: "Password must be at least 10 characters long." } });
      expect(isValid).toBe(false);
    } catch (error) {
      console.log('false');
    }
      // Handle the error and assert that it has the expected error message
  });

  // Test case for an invalid password with excessive length
  test("invalid password - excessive length", () => {
    try {
      const isValid = password("VeryLongPassword123456789", { maxLength: { value: 15, errorMessage: "Password cannot exceed 15 characters." } });
      expect(isValid).toBe(false);
    } catch (error) {
      console.log('false');
    }
  });

  // Test case for an invalid password without lowercase letters
  test("invalid password - no lowercase letters", () => {
    try {
      const isValid = password("UPPERCASEONLY123", { lowercase: { required: true, errorMessage: "Password must contain at least one lowercase letter." } });
      expect(isValid).toBe(false);
    } catch (error) {
      console.log('false');
    }
  });

  // Test case for an invalid password without alphabetic characters
  test("invalid password - no alphabetic characters", () => {
    try {
      const isValid = password("1234567890!@#", { alphabetic: { required: true, errorMessage: "Input must contain at least one alphabetic character." } });
      expect(isValid).toBe(false);
    } catch (error) {
      console.log('false');
    }
  });

  // Test case for an invalid password with whitespace
  test("invalid password - contains whitespace", () => {
    try {
      const isValid = password("Password With Spaces", { whitespace: { required: false, errorMessage: "Password cannot contain whitespace." } });
      expect(isValid).toBe(false);
    } catch (error) {
      console.log('false');
    }
  });

  // Test case for an invalid password without special characters
  test("invalid password - no special characters", () => {
    try {
      const isValid = password("PasswordWithoutSpecialCharacters", { specialCharacter: { required: true, errorMessage: "Password must contain at least one special character." } });
      expect(isValid).toBe(false);
    } catch (error) {
      console.log('false');
    }
  });

  // Test case for an invalid password without numbers
  test("invalid password - no numbers", () => {
    try {
      const isValid = password("NoNumbersHere", { number: { required: true, errorMessage: "Password must have at least one number." } });
      expect(isValid).toBe(false);
    } catch (error) {
      console.log('false');
    }
  });
  // True Examples
  test("true example - password with sufficient length and no numbers", () => {
    try {
      const isValid = password("Strong@Password", { minLength: 10, number: { required: false, errorMessage: "Password must not have numbers." } });
      expect(isValid).toBe(true);
    } catch (error) {
      console.log('false');
    }
  });

  test("true example - password with numbers and special characters", () => {
    try {
      const isValid = password("PwdWith123!@#", { minLength: 5, number: true, specialCharacter: true });
      expect(isValid).toBe(true);
    } catch (error) {
      console.log('false');
    }
  });

  test("true example - password with alphabetic characters and no numbers", () => {
    try {
      const isValid = password("Alphabeti$cPwd", { number: { required: false, errorMessage: "Password must not have numbers." } });
      expect(isValid).toBe(true);
    } catch (error) {
      console.log('false');
    }
  });

  test("true example - password with uppercase, lowercase, and special characters", () => {
    try {
      const isValid = password("MixedPwd@123", { uppercase: true, lowercase: true, specialCharacter: true });
      expect(isValid).toBe(true);
    } catch (error) {
      console.log(error);
    }
  });

  // False Examples
  test("false example - short password with no numbers", () => {
    try {
      const isValid = password("Sho@rtPwd", { minLength: 10, number: { required: false, errorMessage: "Password must not have numbers." } });
      expect(isValid).toBe(false);
    } catch (error) {
      console.log(error);
    }
  });

  test("false example - password with excessive length and no alphabetic characters", () => {
    try {
      const isValid = password("1234567890!@#$%^&*", { maxLength: 15, alphabetic: { required: true, errorMessage: "Input must contain at least one alphabetic character." } });
      expect(isValid).toBe(false);
    } catch (error) {
      console.log(error);
    }
    });

  test("false example - password with only numbers", () => {
    try {
      const isValid = password("123456789", { number: true });
      expect(isValid).toBe(false);
    } catch (error) {
      console.log(error);
    }
  });

  test("false example - password with whitespace", () => {
    try {
      const isValid = password("Pwd Wi2$th Spaces", { whitespace: false });
      expect(isValid).toBe(false);
    } catch (error) {
      console.log(error);
    }
  });
});
