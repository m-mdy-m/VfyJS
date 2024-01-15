function hasOption(options, name) {
  return options.hasOwnProperty(name) ? options[name] : true;
}


module.exports = hasOption;
