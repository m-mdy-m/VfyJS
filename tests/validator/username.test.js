const { isUsername } = require("../../index");

describe("validateUsername function", () => {
    // Test case for a valid username
    test("valid username", () => {
      try {
        const isValid = isUsername("m__mdy__m");
        expect(isValid).toBe(true);
        
      } catch (error) {
        
      }
    });

  // Test case for a valid username with custom options
  test("valid username with custom options", () => {
    try {
      const isValid = isUsername("StrUsername123", {
        minLength: { value: 5, errorMessage: "must be at least 5 characters long" },
        maxLength: { value: 15, errorMessage: "cannot exceed 15 characters" },
        uppercase: { required: true, errorMessage: "must have at least one uppercase letter" },
        number: { required: true, errorMessage: "must have at least one number" },
        trim: { required: true, errorMessage: "cannot contain leading or trailing whitespaces" },
        repeat: { required: true, errorMessage: "cannot have consecutive repeated characters" },
      });
  
      expect(isValid).toBe(true);
    } catch (error) {
      expect(error.property).toBe(error.property);
    }
  });

  // Test case for an invalid username with insufficient length
  test("invalid username - insufficient length", () => {
    try {
      const isValid = isUsername("Shor2t", { minLength: { value: 10, errorMessage: "must be at least 10 characters long" } });
      expect(isValid).toBe(false);
    } catch (error) {
      expect(error.property).toBe(error.property);
    }
  });

  // Test case for an invalid username with excessive length
  test("invalid username - excessive length", () => {
    try {
      const isValid = isUsername("VeryLongUsername123456789", { maxLength: { value: 15, errorMessage: "cannot exceed 15 characters" } });
      expect(isValid).toBe(false);
    } catch (error) {
      expect(error.property).toBe(error.property);
    }
  });

  // Test case for an invalid username without uppercase letters
  test("invalid username - no uppercase letters", () => {
    try {
      const isValid = isUsername("lowercaseonly123", { uppercase: { required: true, errorMessage: "must have at least one uppercase letter" } });
      expect(isValid).toBe(false);
    } catch (error) {
      expect(error.property).toBe(error.property);
    }
  });

  // Test case for an invalid username without numbers
  test("invalid username - no numbers", () => {
    try {
      const isValid = isUsername("NoNumbersHere", { number: { required: true, errorMessage: "must have at least one number" } });
      expect(isValid).toBe(false);
    } catch (error) {
      expect(error.property).toBe(error.property);
    }
  });

  // Test case for an invalid username with consecutive repeated characters
  test("invalid username - consecutive repeated characters", () => {
    try {
      const isValid = isUsername("RepeatedmmmmChar123", { repeat: { required: true, errorMessage: "cannot have consecutive repeated characters" } });
      expect(isValid).toBe(false);
    } catch (error) {
      expect(error.property).toBe(error.property);
    }
  });

  // Test case for an invalid username with leading or trailing whitespaces
  test("invalid username - leading or trailing whitespaces", () => {
    try {
      const isValid = isUsername("  UsernameWithSpaces  ", { trim: { required: true, errorMessage: "cannot contain leading or trailing whitespaces" } });
      expect(isValid).toBe(false);
    } catch (error) {
      expect(error.property).toBe(error.property);
    }
  });
  // Test case for a valid username
  test("valid username", () => {
    try {
      const isValid = isUsername("ValidUser123", { minLength: 5, trim: true, repeat: true });
      expect(isValid).toBe(true);
    } catch (error) {
      expect(error.property).toBe(error.property);
    }
  });

  // Test case for an invalid username with insufficient length
  test("invalid username - insufficient length", () => {
    try {
      const isValid = isUsername("Short", { minLength: 10, trim: true, repeat: true });
      expect(isValid).toBe(false);
    } catch (error) {
      expect(error.property).toBe(error.property);
    }
  });

  // Test case for an invalid username with excessive length
  test("invalid username - excessive length", () => {
    try {
      const isValid = isUsername("VeryLongUsername123456789", { maxLength: 15, trim: true, repeat: true });
      expect(isValid).toBe(false);
    } catch (error) {
      expect(error.property).toBe(error.property);
    }
  });

  // Test case for an invalid username without uppercase letters
  test("invalid username - no uppercase letters", () => {
    try {
      const isValid = isUsername("lowercaseonly123", { uppercase: { required: true, errorMessage: "must have at least one uppercase letter" }, trim: true, repeat: true });
      expect(isValid).toBe(false);
    } catch (error) {
      expect(error.property).toBe(error.property);
    }
  });

  // Test case for an invalid username without numbers
  test("invalid username - no numbers", () => {
    try {
      const isValid = isUsername("NoNumbersHere", { number: { required: true, errorMessage: "must have at least one number" }, trim: true, repeat: true });
      expect(isValid).toBe(false);
    } catch (error) {
      expect(error.property).toBe(error.property);
    }
  });

  // Test case for an invalid username with consecutive repeated characters
  test("invalid username - consecutive repeated characters", () => {
    try {
      const isValid = isUsername("RepeatedChar123", { repeat: { required: true, errorMessage: "cannot have consecutive repeated characters" }, trim: true });
      expect(isValid).toBe(false);
    } catch (error) {
      expect(error.property).toBe(error.property);
    }
  });

  // Test case for an invalid username with leading or trailing whitespaces
  test("invalid username - leading or trailing whitespaces", () => {
    try {
      const isValid = isUsername("  Usernam2eWithSpaces  ", { trim: { required: true, errorMessage: "cannot contain leading or trailing whitespaces" }, repeat: true });
      expect(isValid).toBe(false);
    } catch (error) {
      expect(error.property).toBe(error.property);
    }
  });
});
    