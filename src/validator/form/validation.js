const  { NotType, isEmpty, validationsLength } =require( "../../errors/Error.js")

/**
 * Common validation function for fields like password, email, and username.
 * @param {*} input - The value to validate.
 * @param {string} format - The format being validated (e.g., "password", "email", "username").
 * @param {number} [min=8] - The minimum length allowed for the value.
 * @param {number} [max=64] - The maximum length allowed for the value.
 * @returns {*} The validated value.
 * @throws {ValidationError} Throws a validation error if the value does not meet the criteria.
 */
function validateCommon(input, format, min = 8, max = 64) {
  try {
    const value = input.value ? input.value : input;
    // Common validation: Value should not be empty
    isEmpty(value, `${format} is not empty`);

    // Common validation: Value should be a string
    NotType(value, "string", `Please enter a valid ${format}`);

    // Trim the value to remove leading and trailing spaces
    value.trim();

    // Common validation: Validate length of the value
    validationsLength(value, {
      min,
      max,
      minError: `${format} must be at least ${min} characters long.`,
      maxError: `${format} cannot exceed ${max} characters.`,
    });
    return value;
  } catch (error) {
    throw error.message;
  }
}
module.exports= validateCommon