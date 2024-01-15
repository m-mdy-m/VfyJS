const email = require("../../src/validator/form/email");
const validValue = "meddishn312as!dsccc@yahoo.ir";
const validOptions = {
  minLength: {
    value: 2,
    errorMessage: "Password must be at least 10 characters long.",
  },
  maxLength: {
    value: 20,
    errorMessage: "Password cannot exceed 30 characters.",
  },
  uppercase: { required: false, errorMessage: "uppercase ." },
  lowercase: { required: true, errorMessage: "lowercase r." },
  number: { required: false, errorMessage: "number ." },
  specialCharacter: { required: false, errorMessage: "specialCharacter" },
  alphabetic: { required: true, errorMessage: "alphabetic " },
  whitespace: { required: false, errorMessage: "whitespace " },
};
test("password is valid", () => {
  const is_valid = email(validValue);

  expect(is_valid).toBe(true);
});
