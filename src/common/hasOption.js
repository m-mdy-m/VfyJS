function hasOption(option, name) {
  if (option[name]) {
    console.log("if  name =>", name)
    console.log("if  option =>", option)
    return option[name];
  
  } else {
    console.log("else name =>", name)
    console.log("else option =>", option)
    return true;  
  
  }
}
module.exports = hasOption;
