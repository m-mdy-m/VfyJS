const { getSubstring,trimValue } = require("./index");
let testTrim = trimValue('      he  l  l  o  o  w  o  r  l  d')
console.log(testTrim); // hellooworld


const formatHello = getSubstring('Hello-Wo-rld',[0,5])
console.log('formatHello =>',formatHello); // hello