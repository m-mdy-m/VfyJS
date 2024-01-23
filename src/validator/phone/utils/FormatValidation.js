/**
 * Validates the provided formats against a set of patterns.
 *
 * @param {Array<Object>} patterns - An array of objects containing patterns to match.
 * @param {string} mobile - The mobile format to be validated.
 * @param {string} landline - The landline format to be validated.
 * @param {string} service - The service format to be validated.
 * @returns {Array<boolean>} - An array of boolean values indicating the validity of each format against the corresponding pattern.
 * 
 * @typedef {Array<boolean>} ValidationResultArray - An array indicating the validity of each format against the corresponding pattern.
 * Each boolean value in the array represents the validity of the corresponding format (mobile, service, landline).
 */
function validationFormats(patterns,formats) {
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
   const testResult = regex.test(formats[index]);
   console.log('regex=>',regex);
   console.log('formats[index]=>',formats[index]);
   console.log('formats=>',formats);
   console.log('patternObj=>',patternObj);
   console.log('testResult=>',testResult);
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
 * @param {boolean} [isDuplicateCode=false] - Indicates if there is a duplicate code.
 * @returns {ValidationResult} - The generated validation result object.
 */
function generateValidationResult(values, hasValidFormat, hasCode, hasPhone, isDuplicateCode=false) {
  const defaultValue = null
  const result = {
    continent: values.continent,
    country: values.country,
    code: values.code,
    isoCode: values.iso,
    phone: values.phone,
    hasCode: hasCode,
    hasPhone: hasPhone,
    isDuplicateCode: isDuplicateCode,
  };
  values.patterns.forEach((format, index) => {
    /**
     * Dynamic property name based on format type.
     * @type {boolean}
     */
    let propertyName = format.type;
    if (propertyName === 'toll-free') {
      propertyName = 'tollFree'
    }
    result[propertyName] = hasValidFormat[index] !== undefined ? hasValidFormat[index] : defaultValue;
  });
  return result;
}
/**
 * Extracts information values from the provided object.
 *
 * @param {Object} values - The input object containing information values.
 * @param {string} values.code - The code value to be extracted.
 * @param {string} values.phone - The phone value to be extracted.
 * @param {string[]} values.patterns - The patterns value to be extracted (an array of strings).
 * @param {boolean} values.hasCode - Indicates whether the object has the 'code' property.
 * @param {boolean} values.hasPhone - Indicates whether the object has the 'phone' property.
 * @returns {ExtractInfoValue} An object containing the extracted information values.
 /**
 * @typedef {Object} ExtractInfoValue
 * @property {string} code - The extracted code value.
 * @property {string} phone - The extracted phone value.
 * @property {string[]} patterns - The extracted patterns value.
 * @property {boolean} hasCode - Indicates whether the object has the 'code' property.
 * @property {boolean} hasPhone - Indicates whether the object has the 'phone' property.
 * @example
 * const inputObject = {
 *   code: "ABC123",
 *   phone: "555-1234",
 *   patterns: ["pattern1", "pattern2"],
 *   hasCode: true,
 *   hasPhone: false,
 * };
 * const extractedValues = extractInfoValue(inputObject);
 * console.log(extractedValues);
 * // Output: { code: 'ABC123', phone: '555-1234', patterns: ['pattern1', 'pattern2'], hasCode: true, hasPhone: false }
 */
function extractInfoValue(values) {
  // Destructure the input object
  const { code, phone, patterns, hasCode, hasPhone } = values;

  // Return an object with the extracted values
  return { code, phone, patterns, hasCode, hasPhone };
}
/**
 * Extracts substrings from the given input string based on the specified ranges.
 *
 * @param {string} input - The input string from which substrings will be extracted.
 * @param {...number[]} ranges - Variable number of ranges specified as pairs of start and end indices.
 * @returns {string} - A formatted string created by joining the extracted substrings with hyphens.
 *
 * @example
 * const inputString = "Hello, World!";
 * const result = getSubstring(inputString, [0, 5], [7, 12]);
 * console.log(result);
 * // Output: 'Hello-World'
 */
function getSubstring(input, ...ranges) {
  const formattedString = ranges.map(([start, end]) => input.substring(start, end)).join('-');
  return formattedString;
}
/**
 * Validates country information using the provided function and returns the result.
 *
 * @param {Object} values - The input values object.
 * @param {function} func - The function to validate the country information.
 * @returns {ValidationResult} - The generated validation result object.
 *
 * @typedef {Object} ValidationResult
 * @property {string} continent - Validated continent.
 * @property {string} code - Validated phone code.
 * @property {string} country - Validated country.
 * @property {string} isoCode - Validated ISO code.
 * @property {string} phone - Validated phone number.
 * @property {Array} patterns - An array of formatting patterns for the phone code.
 * Each pattern is an object with 'type' and 'pattern' properties.
 * @property {boolean} isValidMobileFormat - Indicates if the mobile format is valid (true) or not (false).
 * @property {boolean} isValidServiceFormat - Indicates if the service format is valid (true) or not (false).
 * @property {boolean} isValidLandlineFormat - Indicates if the landline format is valid (true) or not (false).
 * @property {boolean} hasCode - Indicates if the code is valid (true) or not (false).
 * @property {boolean} hasPhone - Indicates if the phone number is valid (true) or not (false).
 * @property {boolean} isDuplicateCode - Indicates if there is a duplicate code (true) or not (false).
 */
function validatedCountry(values,func,formats){
  const {code,hasCode,hasPhone,patterns,phone} = extractInfoValue(values)
  const international = `+${code}${phone}`
  const format = formats || [phone,international,phone]
  const hasValidFormat = validationFormats(patterns,format)
  return func(values,hasValidFormat,hasCode,hasPhone)
}
/**
 * Validates phone formats for a specific country using a custom validation function.
 *
 * @param {Object} values - The input values object.
 * @param {Function} func - The validation function to be applied.
 * @param {...string} phones - Phone numbers to be validated.
 * @returns {ValidationResult} - The generated validation result object.
 */
function validationCountry(values, func, numberFormat=1) {
  const { code, hasCode, hasPhone, patterns, phone } = extractInfoValue(values);
  const phoneFormats = Array.from({ length: numberFormat }, () => phone);
  const hasValidFormat = validationFormats(patterns, ...phoneFormats);
  return func(values, hasValidFormat, hasCode, hasPhone);
}

/**
 * @typedef {Object} ValidationResult
 * @property {string} continent - Validated continent.
 * @property {string} code - Validated phone code.
 * @property {string} country - Validated country.
 * @property {string} isoCode - Validated ISO code.
 * @property {string} phone - Validated phone number.
 * @property {Array} patterns - An array of formatting patterns for the phone code.
 * Each pattern is an object with 'type' and 'pattern' properties.
 * @property {boolean} isValidMobileFormat - Indicates if the mobile format is valid (true) or not (false).
 * @property {boolean} isValidServiceFormat - Indicates if the service format is valid (true) or not (false).
 * @property {boolean} isValidLandlineFormat - Indicates if the landline format is valid (true) or not (false).
 * @property {boolean} hasCode - Indicates if the code is valid (true) or not (false).
 * @property {boolean} hasPhone - Indicates if the phone number is valid (true) or not (false).
 * @property {boolean} isDuplicateCode - Indicates if there is a duplicate code (true) or not (false).
 */
module.exports = { validationFormats, generateValidationResult,extractInfoValue ,getSubstring,validatedCountry ,validationCountry};
