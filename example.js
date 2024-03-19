const { isUsername } = require("./index");

const username = "Admin123";
const options = {
  minLength: { value: 6, errorMessage: "must be at least 6 characters long." },
  maxLength: { value: 20, errorMessage: "cannot exceed 20 characters." },
  uppercase: { required: true, errorMessage: "must contain at least one uppercase letter." },
  number: { required: true, errorMessage: "must contain at least one number." },
  nonAlphanumeric: { required: true, errorMessage: "must contain at least one non-alphanumeric character." },
  trim: { required: true, errorMessage: "cannot" },
  repeat: { required: true, errorMessage: "cannot have consecutive repeated characters." }
};
try {
    const isValid = isUsername(username, options);
    
    console.log(isValid);
} catch (error) {
    console.log(error.message);
}