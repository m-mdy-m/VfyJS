const { isUsername } = require("./index");

const username = "Admin123";
const options = {
  minLength: { value: 6, errorMessage: "Username must be at least 6 characters long." },
  maxLength: { value: 20, errorMessage: "Username cannot exceed 20 characters." },
  uppercase: { required: true, errorMessage: "Username must contain at least one uppercase letter." },
  number: { required: true, errorMessage: "Username must contain at least one number." },
  trim: { required: true, errorMessage: "Username cannot contain leading or trailing whitespaces." },
  repeat: { required: true, errorMessage: "Username cannot have consecutive repeated characters." }
};

const isValid = isUsername(username);

console.log(isValid); // true