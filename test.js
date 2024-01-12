function hasRepeatingChar(pass) {
  console.log(pass);
  const repeat = 2;

  for (let i = 0; i < pass.length - repeat + 1; i++) {
    console.log('pass.length =>', pass.length);
    console.log('pass.length - repeat =>', pass.length - repeat);
    console.log('i =>', i);
    console.log('i + repeat =>', i + repeat);
    const subString = pass.substring(i, i + repeat);
    console.log('subString =>', subString);
    console.log('new Set(subString).size =>', new Set(subString).size);
    if (subString.length === new Set(subString).size) {
        console.log('final sub =>', subString)
      continue;
    }
    return true;
  }
  return false;
}
hasRepeatingChar("mdy_mmshly1383");
