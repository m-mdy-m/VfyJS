const { isUsername } = require("./index");

const username = "JohnDoe123";
const isValid = isUsername(username);

console.log(isValid); // true