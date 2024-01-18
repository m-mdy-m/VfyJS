const { IfNotType, validateLength, IfIsNumber } = require("../../errors/HandleError");
const { trimmedValue } = require('../../common/validationConstants');

/**
 * Validates if a given input represents a color in various formats.
 *
 * @typedef {Object} ColorValidationFunctions
 * @property {string} color - The color string to validate.
 * @property {() => boolean} HEX - Validates if the input represents a valid Hex color (#RRGGBB or #RRGGBBAA).
 * @property {() => boolean} NameColor - Validates if the input represents a valid named color.
 * @property {() => boolean} RGB - Validates if the input represents a valid RGB color (rgb(R, G, B)).
 * @property {() => boolean} RGBA - Validates if the input represents a valid RGBA color (rgba(R, G, B, A)).
 * @property {() => boolean} HSL - Validates if the input represents a valid HSL color (hsl(H, S%, L%)).
 * @property {() => boolean} CssVar - Validates if the input represents a valid CSS variable (var(--variable)).
 * @property {() => boolean} HWB - Validates if the input represents a valid HWB color (hwb(H, W%, B%)).
 *
 * @returns {ColorValidationFunctions} An object with validation functions and the color string.
 *
 * @example
 * // Example 1: Validating a Hex color
 * const { color, HEX } = isColor('#ff6600');
 * console.log(color); // '#ff6600'
 * console.log(HEX()); // true
 * console.log(NameColor()); // false
 * console.log(RGB()); // false
 *
 * @example
 * // Example 2: Validating a CSS variable
 * const { color, CssVar } = isColor('var(--main-color)');
 * console.log(color); // 'var(--main-color)'
 * console.log(CssVar()); // true
 * console.log(HSL()); // false
 * console.log(HWB()); // false
 *
 * @throws {TypeError} Throws an error if the input is not a string.
 * @throws {Error} Throws an error if the trimmed input is empty after removing leading and trailing whitespaces.
 * @throws {Error} Throws an error if the length of the input is less than 3 or greater than 255.
 */
const isColor = (color) => {
  /**
   * @type {ColorValidationFunctions}
   */
  const colorValidationFunctions = {
    /**
     * Validates if the input represents a valid Hex color.
     * @returns {boolean} - True if the input is a valid Hex color, otherwise false.
     */
    HEX: () => /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/.test(color),
  
    /**
     * Validates if the input represents a valid named color.
     * @returns {boolean} - True if the input is a valid named color, otherwise false.
     */
    NameColor: () => /^[a-zA-Z]+$/.test(color),
  
    /**
     * Validates if the input represents a valid RGB color.
     * @returns {boolean} - True if the input is a valid RGB color, otherwise false.
     */
    RGB: () => /^rgb\((\d{1,3}\s*,\s*){2}\d{1,3}\)$/.test(color),
  
    /**
     * Validates if the input represents a valid RGBA color.
     * @returns {boolean} - True if the input is a valid RGBA color, otherwise false.
     */
    RGBA: () => /^rgba?\((\d{1,3}\s*,\s*){2}\d{1,3}(\s*,\s*\d*\.?\d+)?\)$/.test(color),
  
    /**
     * Validates if the input represents a valid HSL color.
     * @returns {boolean} - True if the input is a valid HSL color, otherwise false.
     */
    HSL: () => /^hsla?\(\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%(\s*,\s*\d*\.?\d+)?\)$/.test(color),
  
    /**
     * Validates if the input represents a valid CSS variable.
     * @returns {boolean} - True if the input is a valid CSS variable, otherwise false.
     */
    CssVar: () => /^var\(--[a-zA-Z][a-zA-Z0-9_-]*\)$/.test(color),
  
    /**
     * Validates if the input represents a valid HWB color.
     * @returns {boolean} - True if the input is a valid HWB color, otherwise false.
     */
    HWB: () => /^hwb\(\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%(\s*,\s*\d*\.?\d+)?\)$/.test(color),
  };
  return colorValidationFunctions;
};

/**
 * Checks and validates a color value.
 *
 * @param {string} color - The color value to check and validate.
 * @returns {ColorValidationFunctions} An object with validation functions and the color string.
 * @throws {TypeError} Throws an error if the input is not a string.
 * @throws {Error} Throws an error if the trimmed input is empty after removing leading and trailing whitespaces.
 * @throws {Error} Throws an error if the length of the input is less than 3 or greater than 255.
 */
function checkValueColor(color) {
    IfNotType('string', color, "The variable is not a string");
    IfIsNumber(color,'The variable is not a valid color representation as a number.')
    color = trimmedValue(color);
    validateLength(color, 3, 255, 'The color value must be between 3 and 255 characters.');
    return isColor(color);
}

module.exports = checkValueColor;
