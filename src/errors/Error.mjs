class ValidationError extends Error {
  constructor(message, property, value, fieldType) {
    super(message);
    this.property = property;
    this.value = value;
    this.fieldType = fieldType;
    this.timestamp = new Date();
  }
  formatErrorMessage() {
    return `${this.message} (Property: ${this.property}, Value: ${this.value}, FieldType: ${this.fieldType})`;
  }
}
export function throwFalsy(message= 'Value cannot be falsy', property, value) {
  if (!property) {
    throw new ValidationError(message, property, value, "boolean");
  }
  return property;
}
export function throwTruthy(message='Value cannot be truthy', property, value) {
  if (property) {
    throw new ValidationError(message,property,'boolean')
  }
  return property;
}
