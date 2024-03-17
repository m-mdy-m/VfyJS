let defaultOptions = {};
function configurePassword(option) {
  defaultOptions = { ...defaultOptions, ...option };
}

// Export default options and configuration function
module.exports = {
    defaultOptions,
    configurePassword
};
