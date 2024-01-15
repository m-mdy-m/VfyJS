function boolean(index) {
  if (typeof index !== "boolean") {
    throw new Error("");
  }
  return true;
}
class ErrorMessage extends Error {
  constructor(property, message) {
    super(message);
    this.property = property;
  }
}

exports.handleValidationError = (property, message) => {
  if (!property) {
    throw new ErrorMessage(property, "Custom error message");
  }
  // Optionally, return something indicating success or additional information.
  // For example, you might return the validated property.
  return property;
};
