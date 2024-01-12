const hasValidate = require("../../utils/hasUtilsFunction");
const { MIN_lENGTH } = require("../../common/validationConstants");
function validatePassword(password, options = {}) {
  const min = options.minLength || MIN_lENGTH;
  const has = hasValidate(password);
  return (
    password.length >= MIN_lENGTH &&
    (options.Lowercase ? has.hasLowerCase() : true) &&
    (options.Lowercase ? has.hasUppercase() : true) &&
    (options.Lowercase ? has.hasNumber() : true) &&
    (options.Lowercase ? has.hasSpecialCharacter() : true)
  );
}

module.exports = validatePassword;
