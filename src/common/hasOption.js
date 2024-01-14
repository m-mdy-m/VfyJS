function hasOption(option, name) {
  if (option[name]) {
    return option[name];
  } else {
    return;
  }
}
module.exports = hasOption;
