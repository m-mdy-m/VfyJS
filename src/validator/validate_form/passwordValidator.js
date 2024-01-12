const hasValidate = require("../../utils/hasUtilsFunction");
function validatePassword(password) {
  const minLength = 8;
  const has = hasValidate(password)
  return (
    password.length >= minLength &&
    has.hasLowerCase() &&
    has.hasUppercase() &&
    has.hasNumber() &&
    has.hasSpecialCharacter()
  );
}

module.exports = validatePassword;
