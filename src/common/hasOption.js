function hasOption(option, name) {
  if (option[name]) {
    return option[name];
  
  }
  return false
}
module.exports = hasOption;
