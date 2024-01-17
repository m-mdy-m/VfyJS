const { username } = require("../../index");

describe("validateUsername function", () => {
  try {
    // Test case for a valid username
    test("valid username", () => {
      const isValid = username("StringUsername123");
      expect(isValid).toBe(true);
    });
  } catch (error) {
      expect(error.property).toBe(false);
  }

  // Test case for a valid username with custom options
  test("valid username with custom options", () => {
    try {
      const isValid = username("StrUsername123", {
        minLength: { value: 5, errorMessage: "must be at least 5 characters long" },
        maxLength: { value: 15, errorMessage: "cannot exceed 15 characters" },
        uppercase: { required: true, errorMessage: "must have at least one uppercase letter" },
        number: { required: true, errorMessage: "must have at least one number" },
        NonAlphanumeric: { required: false, errorMessage: "should not contain non-alphanumeric characters" },
        trim: { required: true, errorMessage: "cannot contain leading or trailing whitespaces" },
        repeat: { required: true, errorMessage: "cannot have consecutive repeated characters" },
      });
  
      expect(isValid).toBe(true);
    } catch (error) {
      expect(error.property).toBe(false);
    }
  });

  // Test case for an invalid username with insufficient length
  test("invalid username - insufficient length", () => {
    try {
      const isValid = username("Shor2t", { minLength: { value: 10, errorMessage: "must be at least 10 characters long" } });
      expect(isValid).toBe(false);
    } catch (error) {
      expect(error.property).toBe(false);
    }
  });

  // Test case for an invalid username with excessive length
  test("invalid username - excessive length", () => {
    try {
      const isValid = username("VeryLongUsername123456789", { maxLength: { value: 15, errorMessage: "cannot exceed 15 characters" } });
      expect(isValid).toBe(false);
    } catch (error) {
      expect(error.property).toBe(false);
    }
  });

  // Test case for an invalid username without uppercase letters
  test("invalid username - no uppercase letters", () => {
    try {
      const isValid = username("lowercaseonly123", { uppercase: { required: true, errorMessage: "must have at least one uppercase letter" } });
      expect(isValid).toBe(false);
    } catch (error) {
      expect(error.property).toBe(false);
    }
  });

  // Test case for an invalid username without numbers
  test("invalid username - no numbers", () => {
    try {
      const isValid = username("NoNumbersHere", { number: { required: true, errorMessage: "must have at least one number" } });
      expect(isValid).toBe(false);
    } catch (error) {
      expect(error.property).toBe(false);
    }
  });

  // Test case for an invalid username with non-alphanumeric characters
  test("invalid username - non-alphanumeric characters", () => {
    try {
      const isValid = username("Username!123", { NonAlphanumeric: { required: true, errorMessage: "should not contain non-alphanumeric characters" } });
      expect(isValid).toBe(false);
    } catch (error) {
      expect(error.property).toBe(false);
    }
  });

  // Test case for an invalid username with consecutive repeated characters
  test("invalid username - consecutive repeated characters", () => {
    try {
      const isValid = username("RepeatedmmmmChar123", { repeat: { required: true, errorMessage: "cannot have consecutive repeated characters" } });
      expect(isValid).toBe(false);
    } catch (error) {
      expect(error.property).toBe(false);
    }
  });

  // Test case for an invalid username with leading or trailing whitespaces
  test("invalid username - leading or trailing whitespaces", () => {
    try {
      const isValid = username("  UsernameWithSpaces  ", { trim: { required: true, errorMessage: "cannot contain leading or trailing whitespaces" } });
      expect(isValid).toBe(false);
    } catch (error) {
      expect(error.property).toBe(false);
    }
  });
  // Test case for a valid username
  test("valid username", () => {
    try {
      const isValid = username("ValidUser123", { minLength: 5, trim: true, repeat: true });
      expect(isValid).toBe(true);
    } catch (error) {
      expect(error.property).toBe(false);
    }
  });

  // Test case for an invalid username with insufficient length
  test("invalid username - insufficient length", () => {
    try {
      const isValid = username("Short", { minLength: 10, trim: true, repeat: true });
      expect(isValid).toBe(false);
    } catch (error) {
      expect(error.property).toBe(false);
    }
  });

  // Test case for an invalid username with excessive length
  test("invalid username - excessive length", () => {
    try {
      const isValid = username("VeryLongUsername123456789", { maxLength: 15, trim: true, repeat: true });
      expect(isValid).toBe(false);
    } catch (error) {
      expect(error.property).toBe(false);
    }
  });

  // Test case for an invalid username without uppercase letters
  test("invalid username - no uppercase letters", () => {
    try {
      const isValid = username("lowercaseonly123", { uppercase: { required: true, errorMessage: "must have at least one uppercase letter" }, trim: true, repeat: true });
      expect(isValid).toBe(false);
    } catch (error) {
      expect(error.property).toBe(false);
    }
  });

  // Test case for an invalid username without numbers
  test("invalid username - no numbers", () => {
    try {
      const isValid = username("NoNumbersHere", { number: { required: true, errorMessage: "must have at least one number" }, trim: true, repeat: true });
      expect(isValid).toBe(false);
    } catch (error) {
      expect(error.property).toBe(false);
    }
  });

  // Test case for an invalid username with non-alphanumeric characters
  test("invalid username - non-alphanumeric characters", () => {
    try {
      const isValid = username("Username!123", { NonAlphanumeric: { required: true, errorMessage: "should not contain non-alphanumeric characters" }, trim: true, repeat: true });
      expect(isValid).toBe(false);
    } catch (error) {
      expect(error.property).toBe(false);
    }
  });

  // Test case for an invalid username with consecutive repeated characters
  test("invalid username - consecutive repeated characters", () => {
    try {
      const isValid = username("RepeatedChar123", { repeat: { required: true, errorMessage: "cannot have consecutive repeated characters" }, trim: true });
      expect(isValid).toBe(false);
    } catch (error) {
      expect(error.property).toBe(false);
    }
  });

  // Test case for an invalid username with leading or trailing whitespaces
  test("invalid username - leading or trailing whitespaces", () => {
    try {
      const isValid = username("  UsernameWithSpaces  ", { trim: { required: true, errorMessage: "cannot contain leading or trailing whitespaces" }, repeat: true });
      expect(isValid).toBe(false);
    } catch (error) {
      expect(error.property).toBe(false);
    }
  });
});
    