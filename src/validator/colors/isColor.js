"use strict";

const { IfNotType } = require("../../errors/HandleError");
const ERROR_MESSAGE = "The variable is not a string";

const isColor = (color) => 
IfNotType('string',color,ERROR_MESSAGE)
({
    
  HEX: () => /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/.test(color),
  NameColor: () => /^[a-zA-Z]+$/.test(color),
  RGB: () => /^rgb\((\d{1,3}\s*,\s*){2}\d{1,3}\)$/.test(color),
  RGBA: () =>/^rgba?\((\d{1,3}\s*,\s*){2}\d{1,3}(\s*,\s*\d*\.?\d+)?\)$/.test(color),
  HSL: () =>/^hsla?\(\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%(\s*,\s*\d*\.?\d+)?\)$/.test(color),
  CssVar: () => /^var\(--[a-zA-Z][a-zA-Z0-9_-]*\)$/.test(color),
  HWB: () =>/^hwb\(\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%(\s*,\s*\d*\.?\d+)?\)$/.test(color),
});
module.exports = isColor;
