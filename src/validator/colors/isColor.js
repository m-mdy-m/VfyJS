"use strict";

/**
 * Validates if a given input represents a color in various formats.
 *
 * @param {string} color - The color string to validate.
 * @returns {Object} An object containing boolean values for each color format.
 *
 * @property {boolean} isHEX - Indicates if the input represents a valid Hex color (#RRGGBB or #RRGGBBAA).
 * @property {boolean} isNameColor - Indicates if the input represents a valid named color.
 * @property {boolean} isRGB - Indicates if the input represents a valid RGB color (rgb(R, G, B)).
 * @property {boolean} isRGBA - Indicates if the input represents a valid RGBA color (rgba(R, G, B, A)).
 * @property {boolean} isHSL - Indicates if the input represents a valid HSL color (hsl(H, S%, L%)).
 * @property {boolean} isCssVar - Indicates if the input represents a valid CSS variable (var(--variable)).
 * @property {boolean} isHWB - Indicates if the input represents a valid HWB color (hwb(H, W%, B%)).
 */
const { IfNotType } = require("../../errors/HandleError");

/**
 * Validates if the input represents a valid color in various formats.
 *
 * @param {string} color - The color string to validate.
 * @returns {Object} An object containing boolean values for each color format.
 *
 *
 * @example
 * // Example 1: Validating a Hex color
 * const hexResult = isColor('#ff6600');
 * console.log(hexResult.isHEX); // true
 * console.log(hexResult.isNameColor); // false
 * console.log(hexResult.isRGB); // false
 *
 * @example
 * // Example 2: Validating a CSS variable
 * const cssVarResult = isColor('var(--main-color)');
 * console.log(cssVarResult.isCssVar); // true
 * console.log(cssVarResult.isHSL); // false
 * console.log(cssVarResult.isHWB); // false
 *
 * @throws {Error} Throws an error if the input is not a string.
 */
function isColor(color) {
  IfNotType("string", color, "The variable is not a string");

  /**
   * Object containing boolean values for different color formats.
   * @type {Object}
   * @property {boolean} isHEX - Indicates if the input represents a valid Hex color.
   * @property {boolean} isNameColor - Indicates if the input represents a valid named color.
   * @property {boolean} isRGB - Indicates if the input represents a valid RGB color.
   * @property {boolean} isRGBA - Indicates if the input represents a valid RGBA color.
   * @property {boolean} isHSL - Indicates if the input represents a valid HSL color.
   * @property {boolean} isCssVar - Indicates if the input represents a valid CSS variable.
   * @property {boolean} isHWB - Indicates if the input represents a valid HWB color.
   */
  const colorFormats = {
    isHEX: /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/,
    isNameColor: /^[a-zA-Z]+$/,
    isRGB: /^rgb\((\d{1,3}\s*,\s*){2}\d{1,3}\)$/,
    isRGBA: /^rgba?\((\d{1,3}\s*,\s*){2}\d{1,3}(\s*,\s*\d*\.?\d+)?\)$/,
    isHSL:
      /^hsla?\(\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%(\s*,\s*\d*\.?\d+)?\)$/,
    isCssVar: /^var\(--[a-zA-Z][a-zA-Z0-9_-]*\)$/,
    isHWB: /^hwb\(\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%(\s*,\s*\d*\.?\d+)?\)$/,
  };

  const colors = {};
  for (const format in colorFormats) {
    colors[format] = colorFormats[format].test(color);
  }
  return colors;
}

module.exports = isColor;
