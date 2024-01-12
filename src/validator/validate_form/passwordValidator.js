const hasValidate = require("../../utils/hasUtilsFunction");
const { MIN_lENGTH } = require("../../common/validationConstants");
function validatePassword(password, options = {}) {
  const min = options.minLength || MIN_lENGTH;
  const has = hasValidate(password);
  return (
    password.length >= min &&
    (options.LowerCase ? has.hasLowerCase() : true) &&
    (options.UpperCase ? has.hasUppercase() : true) &&
    (options.Number ? has.hasNumber() : true) &&
    (options.SpecialCharacter ? has.hasSpecialCharacter() : true)
  );
}

module.exports = validatePassword;
