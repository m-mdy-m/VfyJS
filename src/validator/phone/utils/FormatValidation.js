/**
 * Validates the provided formats against a set of patterns.
 *
 * @param {Array<Object>} patterns - An array of objects containing patterns to match.
 * @param {string} mobile - The mobile format to be validated.
 * @param {string} landline - The landline format to be validated.
 * @param {string} service - The service format to be validated.
 * @returns {Array<boolean>} - An array of boolean values indicating the validity of each format against the corresponding pattern.
 */
function validationFormats(patterns, mobile, landline, service) {
  /**
   * Map through the patterns and test each format against its corresponding pattern.
   *
   * @param {Object} patternObj - The pattern object containing the regex pattern.
   * @param {number} index - The index of the pattern in the array.
   * @returns {boolean} - True if the format matches the pattern, false otherwise.
   */
  return patterns.map((patternObj, index) => {
    // Create a regex object from the pattern
    const regex = new RegExp(patternObj.pattern);
    
    // Test the format against the pattern
    const testResult = regex.test(
      index === 0 ? mobile : index === 1 ? service : landline
    );

    return testResult;
  });
}

/**
 * Generates a validation result object based on the validity of different formats.
 *
 * @param {Object} values - The input values object.
 * @param {Array<boolean>} hasValidFormat - An array of boolean values indicating the validity of each format.
 * @param {boolean} hasCode - Indicates if the code is valid.
 * @param {boolean} hasPhone - Indicates if the phone number is valid.
 * @param {boolean} isDuplicateCode - Indicates if there is a duplicate code.
 * @returns {Object} - The generated validation result object.
 */
function generateValidationResult(values, hasValidFormat, hasCode, hasPhone, isDuplicateCode) {
  return {
    continent: values.continent,
    country: values.country,
    code: values.code,
    isoCode: values.iso,
    phone: values.phone,
    isValidMobileFormat: hasValidFormat[0],
    isValidServiceFormat: hasValidFormat[1],
    isValidLandlineFormat: hasValidFormat[2],
    hasCode: hasCode,
    hasPhone: hasPhone,
    isDuplicateCode: isDuplicateCode,
  };
}

module.exports = { validationFormats, generateValidationResult };
