const hasValidate = require("../../utils/hasUtilsFunction");
const { MIN_lENGTH } = require("../../common/validationConstants");
function validatePassword(password, options = {}) {
  const min = options.minLength || MIN_lENGTH;
  const max = options.maxLength || null;
  const has = hasValidate(password);
  return (
    password.length >= min &&
    password.length <= max &&
    (options.LowerCase ? has.hasLowerCase() : true) &&
    (options.UpperCase ? has.hasUppercase() : true) &&
    (options.Number ? has.hasNumber() : true) &&
    (options.SpecialCharacter ? has.hasSpecialCharacter() : true)
  );
}

module.exports = validatePassword;
