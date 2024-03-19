# ConfigErrors

## Overview

The `ConfigErrors` module in vfyjs provides a set of custom error classes and utilities for consistent error handling during configuration validation. These errors help identify and handle configuration-related issues, enhancing the robustness of your applications.

## Custom Error Classes

### `CustomError`

Custom error class for validation-related errors.

- **Properties:**
  - `property` (string): The property or field associated with the validation error.
  - `message` (string): The error message describing the validation failure.

### `ValidationError`

Specific error class for validation errors.

- **Extends:** `CustomError`

### `TypeError`

Specific error class for type errors.

- **Extends:** `CustomError`

### `LengthError`

Specific error class for length-related errors.

- **Extends:** `CustomError`

## Validation Functions

### `ifFalsyValue(property, message)`

Throws a validation error if the specified property is truthy.

- **Parameters:**

  - `property` (any): The property or condition to be validated.
  - `message` (string, optional): The error message for the validation failure.

- **Returns:**

  - `property` (any): Returns the input property if it is falsy.

- **Throws:**
  - `ValidationError`: Throws a validation error with the specified property and message if validation fails.

### `ifTruthyValue(property, message)`

Validates if the provided property is truthy.

- **Parameters:**

  - `property` (any): The property to be validated.
  - `message` (string, optional): The error message for the validation failure.

- **Throws:**
  - `ValidationError`: Throws a validation error with the specified property and message if validation fails.

### `validateIfBothTruthy(property, method, message)`

Validates if both the provided property and method are truthy.

- **Parameters:**

  - `property` (any): The property to be validated.
  - `method` (any): The method or condition to be validated.
  - `message` (string, optional): The error message to be associated with the validation failure.

- **Throws:**
  - `ValidationError`: Throws a validation error with the specified property and message if validation fails.

### `IfNotType(expectedType, property, message)`

Throws a type error if the type of the specified property is not as expected.

- **Parameters:**

  - `expectedType` (string): The expected type of the property.
  - `property` (any): The property to be validated for its type.
  - `message` (string, optional): The error message to be associated with the type validation failure.

- **Throws:**
  - `TypeError`: Throws a type error with the specified property and message if type validation fails.

### `isTypeMismatch(expectedType, property)`

Checks if the type of the specified property mismatches the expected type.

- **Parameters:**

  - `expectedType` (string): The expected type of the property.
  - `property` (any): The property to be validated for its type.

- **Returns:**
  - `undefined`: Returns undefined if type matches, indicating a mismatch.

### `IfTypeMatches(expectedType, property, message)`

Throws a type error if the type of the specified property matches the expected type.

- **Parameters:**

  - `expectedType` (string): The expected type of the property.
  - `property` (any): The property to be validated for its type.
  - `message` (string, optional): The error message to be associated with the type validation failure.

- **Throws:**
  - `TypeError`: Throws a type error with the specified property and message if type validation fails.

### `IfIsNumber(property, message)`

Throws a type error if the specified property is a valid number (not NaN).

- **Parameters:**

  - `property` (any): The property to be validated for not being a valid number.
  - `message` (string, optional): The error message to be associated with the type validation failure.

- **Throws:**
  - `TypeError`: Throws a type error with the specified property and message if the property is a valid number.

### `validateLength(value, minLength, maxLength, message)`

Validates the length of a value within the specified range.

- **Parameters:**

  - `value` (string): The value to be validated.
  - `minLength` (number): The minimum allowed length.
  - `maxLength` (number): The maximum allowed length.
  - `message` (string, optional): The error message to be associated with the length validation failure.

- **Throws:**
  - `LengthError`: Throws an error with the specified message if length validation fails.

### `validatePropertyLengthAndType(minLength, maxLength, minLengthType, maxLengthType, property, message)`

Validates the length and type of a property.

- **Parameters:**

  - `minLength` (number): The minimum allowed length.
  - `maxLength` (number): The maximum allowed length.
  - `minLengthType` (string): The expected type for minLength.
  - `maxLengthType` (string): The expected type for maxLength.
  - `property` (any): The property to be validated.
  - `message` (string, optional): The error message to be associated with the validation failure.

- **Throws:**
  - `TypeError`: Throws a TypeError with the specified message if type validation fails.
  - `LengthError`: Throws a LengthError with the specified message if length validation fails.

### `TypesCheck(property, types, message)`

Throws a type error if the type of the specified property is not one of the expected types.

- **Parameters:**

  - `property` (any): The property to be validated for its type.
  - `types` (string[]): An array of expected types.
  - `message` (string, optional): The error message to be associated with the type validation failure.

- **Throws:**
  - `TypeError`: Throws a type error with the specified property and message if type validation fails.

### `isEmpty(value, message)`

Checks if a value is empty and throws an error if it is.

- **Parameters:**

  - `value` (any): The value to be checked for emptiness.
  - `message` (string, optional): The error message to be associated with the emptiness check failure.

- **Throws:**

  - `ValidationError`: Throws an error with the specified message if the value is empty.

- **Returns:**
  - `value` (any): Returns the input value if it is not empty.

### `validationsLen(value, options)`

Validations the length of a value within the specified range.

- **Parameters:**

  - `value` (string): The value to be validated.
  - `options` (object): The options for length validation.
    - `min` (number): The minimum allowed length.
    - `minMessage` (string, optional): The error message for minimum length validation failure.
    - `max` (number): The maximum allowed length.
    - `maxMessage` (string, optional): The error message for maximum length validation failure.

- **Throws:**
  - `LengthError`: Throws a LengthError if length validation fails.

### `validateMinLen(value, options)`

Validates the minimum length of a value.

- **Parameters:**

  - `value` (string): The value to be validated.
  - `options` (object): The options for minimum length validation.
    - `min` (number): The minimum allowed length.
    - `minMessage` (string, optional): The error message for minimum length validation failure.

- **Throws:**
  - `LengthError`: Throws a LengthError if minimum length validation fails.

### `validateMaxLen(value, options)`

Validates the maximum length of a value.

- **Parameters:**

  - `value` (string): The value to be validated.
  - `options` (object): The options for maximum length validation.
    - `max` (number): The maximum allowed length.
    - `maxMessage` (string, optional): The error message for maximum length validation failure.

- **Throws:**
  - `LengthError`: Throws a LengthError if maximum length validation fails.

## Usage Examples

### Example 1: Validate Falsy Value

```javascript
try {
  ifFalsyValue("", "Value should not be empty");
} catch (error) {
  console.error(error.name); // 'ValidationError'
  console.error(error.message); // 'Value should not be empty'
}
```

### Example 2: Validate Truthy Value

```javaScript
try {
  ifTruthyValue('Some Value', 'Invalid value');
} catch (error) {
  console.error(error.name); // 'ValidationError'
  console.error(error.message); // 'Invalid value'
}
```
