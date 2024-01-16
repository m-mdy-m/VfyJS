const { username } = require("../../index");
const validValue = "m__mdy__m1383";

const validOptions = {
    minLength: {
      value: 2,
      errorMessage: "minLength",
    },
    maxLength: {
      value: 20,
      errorMessage: "maxLength",
    },
    uppercase: { required: false, errorMessage: "uppercase ." },
    number: { required: true, errorMessage: "number r." },
    NonAlphanumeric: { required: false, errorMessage: "NonAlphanumeric ." },
    trim: { required: false, errorMessage: "trim" },
    repeat: { required: true, errorMessage: "repeat " },
  };
test("password is valid", () => {
  const is_valid = username(validValue,validOptions)

  expect(is_valid).toBe(true);
});
