const hasValidate = require("../../utils/hasUtilsFunction");
const { MIN_lENGTH } = require("../../common/validationConstants");
function validatePassword(password) {
  const has = hasValidate(password);
  return (
    password.length >= MIN_lENGTH &&
    has.hasLowerCase() &&
    has.hasUppercase() &&
    has.hasNumber() &&
    has.hasSpecialCharacter()
  );
}

module.exports = validatePassword;
