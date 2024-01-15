const inputValidator = require("../../utils/inputValidator");
function validateEmail(value) {
  const has = inputValidator(value);
  const a = has.matchesEmailFormat(value);
  console.log(a);

  return a;
}
const result = validateEmail("Mahdimamashli1383@gmail.com");
console.log("result =>", result);
module.exports = validateEmail;
