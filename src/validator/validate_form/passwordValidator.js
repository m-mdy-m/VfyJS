const hasValidate = require("../../utils/hasUtilsFunction");
function validatePassword(password) {
  const minLength = 8;
  return (
    password.length >= minLength &&
    hasValidate.hasLowerCase(password) &&
    hasValidate.hasUppercase(password) &&
    hasValidate.hasNumber(password) &&
    hasValidate.hasSpecialCharacter(password)
  );
}

module.exports = validatePassword;
