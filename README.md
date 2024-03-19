# vfyjs

**vfyjs** is a powerful and flexible JavaScript library designed to streamline data validation, string manipulation, and error handling in your projects. Whether you're working with user input, configuration data, or API responses, vfyjs provides a comprehensive set of utilities to ensure data integrity and enhance code reliability.

## Introduction

Data validation, string manipulation, and error handling are fundamental aspects of software development. vfyjs aims to simplify these tasks, allowing developers to focus on building robust applications without compromising on data integrity.

### In Node.js

After installing the package, you can import it into your Node.js application. Below is an example demonstrating how to use vfyjs for password validation:

```javascript
const vfyjs = require("vfyjs");

// Example usage
const data = "123!#@ScsA";
const validationResult = vfyjs.isPassword(data);
console.log(validationResult);
```

The `isPassword` function checks whether the provided string meets the criteria for a valid password. Adjust the `password` variable with your actual password data for validation.

### In Browser

To utilize vfyjs in a browser environment, include the `vfyjs.bundle.js` script in your HTML file:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Your Webpage</title>
  </head>
  <body>
    <!-- Include vfyjs script -->
    <script src="path/to/vfyjs.bundle.js"></script>
    <script>
      // Example usage in browser
      const data = "123!#@ScsA";
      const validationResult = vfyjs.isPassword(data);
      console.log(validationResult);
    </script>
  </body>
</html>
```

Ensure to replace `"path/to/vfyjs.bundle.js"` with the correct path relative to your HTML file.

## Features

- [Data Validation](#DataValidation)
- [String Manipulation](#StringManipulation)
- [Error Handling](#ErrorHandling)
- [Math Operations](#MathOperations)
- [Configuration](#configuration)

### DataValidation

- **Colors**: Validate various color formats, including hex, name, RGB, RGBA, and CssVarHwb. [Configuration](#ConfigColor)
- **Links**: Detect and validate HTTP or HTTPS links. [Configuration](#ConfigLinks)
- **Passwords**: Strong password detection with customization options. [Configuration](#ConfigPassword)
- **Emails**: Recognize and validate email addresses. [Configuration](#ConfigEmail)
- **Phone Numbers**: Validate phone numbers from 50 countries, providing detailed information about the country, code, and phone type (landline, mobile, etc.). [Configuration](#ConfigPhone)
- **BinaryTree**: Efficient searching and manipulation of data using a binary tree data structure [Configuration](#ConfigBinaryTree)
- **Custom Validation Functions**: Validate various aspects of a string input. [Configuration](#ConfigValue)

### StringManipulation

- **getSubstring**: Retrieve substrings from a given string based on specified indexes. [Configuration](#ConfigSubstring)
- **trimValue**: Trim extra spaces from the beginning and end of a string. [Configuration](#ConfigtrimValue)

### ErrorHandling

- **HandleError**: A utility for consistent error handling and type validation. [Configuration](#ConfigErrors)

## Installation

Install vfyjs using npm:

```bash
npm install vfyjs
```

## Usage

Usage Example:

```JavaScript
const { validatePhoneNumber, getSubstring, trimValue, HandleError } = require('vfyjs');

// Validate a phone number
validatePhoneNumber('1', '1234567890').then(result => {
   console.log(result);
});

// Get a substring
const inputString = "Hello, World!";
const result = getSubstring(inputString, [0, 5], [7, 12]);
console.log(result); // Hello-World

// Trim a value
const inputString = ' H ell o, World! ';
const result = trimValue(inputString);
console.log(result); // Output: 'Hello, World!'

// Handle an error
const userAge = '25'; // Note: '25' is a string, not a number
try {
    HandleError.IfNotType('number', userAge, 'Age should be a number');
    console.log('Age is valid.');
} catch (error) {
    console.error(error.name); // 'TypeError'
    console.error(error.message); // 'Age should be a number'
}

```


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

## Math Operations

#### Usage

To use in your JavaScript project, you can import it as follows:

```javascript
const { mathOperations } = require("vfyjs");
```

#### Functions

1. **isEven**

   - `isEven()` function checks if the base number is even.
   - **Returns:** `boolean` - True if the base number is even, false otherwise.

2. **areAllOdd**

   - `areAllOdd()` function checks if all numbers (including the base number) are odd.
   - **Returns:** `boolean` - True if all numbers are odd, false otherwise.

3. **isOdd**

   - `isOdd()` function checks if the base number is odd.
   - **Returns:** `boolean` - True if the base number is odd, false otherwise.

4. **areAllEven**

   - `areAllEven()` function checks if all numbers (including the base number) are even.
   - **Returns:** `boolean` - True if all numbers are even, false otherwise.

5. **add**

   - `add()` function adds all additional numbers to the base number.
   - **Returns:** `number` - The result of adding all numbers.

6. **subtract**

   - `subtract()` function subtracts all additional numbers from the base number.
   - **Returns:** `number` - The result of subtracting all numbers.

7. **isDivisibleBy**

   - `isDivisibleBy()` function checks if the base number is divisible by each additional number.
   - **Returns:** `Object` - An object where keys are additional numbers, and values are boolean indicating divisibility.

8. **multiply**

   - `multiply()` function multiplies the base number by all additional numbers.
   - **Returns:** `number` - The result of multiplying all numbers.

9. **divide**

   - `divide()` function divides the base number by all additional numbers.
   - **Throws:** `Error` - If any of the additional numbers is zero.
   - **Returns:** `number` - The result of dividing all numbers.

10. **power**

    - `power()` function raises the base number to the power of all additional numbers.
    - **Returns:** `number` - The result of raising the base number to the power of all additional numbers.

11. **generateRandomNumber**

    - `generateRandomNumber(min, max)` function generates a random number within the specified interval.
    - **Parameters:** `min` - The minimum value of the interval (inclusive), `max` - The maximum value of the interval (inclusive).
    - **Returns:** `number` - A random number between `min` and `max`.

12. **generateRandomEvenNumber**

    - `generateRandomEvenNumber(min, max)` function generates a random even number within the specified interval.
    - **Parameters:** `min` - The minimum value of the interval (inclusive), `max` - The maximum value of the interval (inclusive).
    - **Returns:** `number` - A random even number between `min` and `max`.

13. **generateRandomOddNumber**
    - `generateRandomOddNumber(min, max)` function generates a random odd number within the specified interval.
    - **Parameters:** `min` - The minimum value of the interval (inclusive), `max` - The maximum value of the interval (inclusive).
    - **Returns:** `number` - A random odd number between `min` and `max`.
14. **isEqual**
    - `isEqual()` function checks if all additional numbers passed are equal to the base number.
    - **Returns:** `boolean ` - True if all additional numbers are equal to the base number, false otherwise.

#### Example

```javascript
const { mathOperations } = require("vfyjs");

const math = MathOperations(2, 3, 4, 5);
console.log(math.isEqual()); // Output: false (since additional numbers 3, 4, 5 are not equal to the base number 2)
console.log(math.isEven()); // Output: true
console.log(math.areAllOdd()); // Output: false
console.log(math.isOdd()); // Output: true
console.log(math.areAllEven()); // Output: false
console.log(math.add()); // Output: 14 (2 + 3 + 4 + 5)
console.log(math.subtract()); // Output: -10 (2 - 3 - 4 - 5)
console.log(math.isDivisibleBy()); // Output: {3: false, 4: true, 5: false} (2 % 3, 2 % 4, 2 % 5)
console.log(math.multiply()); // Output: 120 (2 * 3 * 4 * 5)
console.log(math.divide()); // Output: 0.03333333333333333 (2 / 3 / 4 / 5)
console.log(math.power()); // Output: 32 (2^3^4^5)
console.log(math.generateRandomNumber(1, 100)); // Output: Random number between 1 and 100
console.log(math.generateRandomEvenNumber(1, 100)); // Output: Random even number between 1 and 100
console.log(math.generateRandomOddNumber(1, 100)); // Output: Random odd number between 1 and 100
```

## License

VfyJS is released under the MIT License. For more information, see the [LICENSE](./LICENSE) file.

## Links

- GitHub Organization: [VfyJS](https://github.com/VfyJs)
- Main Repository: [VfyJS Repository](https://github.com/m-mdy-m/VfyJS)
- npm Package: [VfyJS on npm](https://www.npmjs.com/package/vfyjs)

## Feedback and Suggestions

If you have any feedback, suggestions, or feature requests for VfyJS, we'd love to hear from you! Your input is valuable in improving the library and making it more useful for the community.

- **Feedback**: Share your thoughts on your experience with VfyJS.
- **Feature Requests**: Let us know if there are specific features you'd like to see in future releases.
- **Suggestions**: If you have ideas for improvement or alternative approaches, feel free to suggest them.
- **Criticism**: Constructive criticism helps us identify areas for enhancement.

## Community Discussions

For open discussions, questions, and community interactions, we encourage you to visit the [VfyJS Discussions](https://github.com/orgs/VfyJs/discussions) section on GitHub. This is the ideal space for:

- Asking questions about how to use VfyJS effectively.
- Sharing your experiences and best practices with the community.
- Discussing potential features or improvements.
- Providing feedback and suggestions.

Feel free to start a new discussion thread or participate in existing conversations. The Discussions section is a collaborative space where the VfyJS community can come together, learn from each other, and contribute to the growth of the library.

I look forward to seeing you in the [VfyJS Discussions](https://github.com/orgs/VfyJs/discussions) area!

I appreciate your support and involvement in the development of VfyJS!
