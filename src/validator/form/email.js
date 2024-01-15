const inputValidator = require("../../utils/inputValidator");
const { handleValidationError } = require("../../errors/HandleError");
function validateEmail(value) {
  const validator = inputValidator(value);
  const isValid = validator.matchesEmailFormat(value);
  if(typeof isValid !== 'string'){
    handleValidationError(isValid , `${isValid} The input should only be of string type `)
  }
  if (!isValid) {
    handleValidationError(
      isValid,
      `${value} is invalid. Please enter a valid email`
    );
  }
  return isValid
}

validateEmail("meddishn312as!dsccc@yahoo.ir");
try {
  if(validateEmail){
    console.log('success');
}  
} catch (error) {
    console.log('error');
    console.log('error.message');
    
}

// console.log("result =>", result);
module.exports = validateEmail;
