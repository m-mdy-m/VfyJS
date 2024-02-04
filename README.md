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

# Configuration

## ConfigColor

The `isColor` function in vfyjs provides various methods to identify and validate different color formats. Here are the available methods:

- `HEX()`: Validate if the input is a valid hexadecimal color code.
- `CssVar()`: Validate if the input is a valid CSS variable for a color.
- `HSL()`: Validate if the input is a valid HSL color representation.
- `HWB()`: Validate if the input is a valid HWB color representation.
- `NameColor()`: Validate if the input is a valid named color.
- `RGB()`: Validate if the input is a valid RGB color representation.
- `RGBA()`: Validate if the input is a valid RGBA color representation.

#### Example

```javascript
const isColor = require("vfyjs").isColor;

const hasHex = "#fff";
console.log("isColor(hasHex).HEX() =>", isColor(hasHex).HEX()); // true

const hasCssVar = "var(--main-color)";
console.log("isColor(hasCssVar).CssVar() =>", isColor(hasCssVar).CssVar()); // true

const hasHSL = "hsl(120, 100%, 50%)";
console.log("isColor(hasHSL).HSL() =>", isColor(hasHSL).HSL()); // true

const hasHWB = "hwb(120, 100%, 50%)";
console.log("isColor(hasHWB).HWB() =>", isColor(hasHWB).HWB()); // true

const hasNameColor = "red";
console.log(
  "isColor(hasNameColor).NameColor() =>",
  isColor(hasNameColor).NameColor()
); // true

const hasRGB = "rgb(255, 0, 0)";
console.log("isColor(hasRGB).RGB() =>", isColor(hasRGB).RGB()); // true

const hasRGBA = "rgba(255, 0, 0, 0.5)";
console.log("isColor(hasRGBA).RGBA() =>", isColor(hasRGBA).RGBA()); // true
```

---

## ConfigLinks

### isHttp and isHttps

The `isHttp` and `isHttps` functions in vfyjs allow you to check if a given URL uses HTTP or HTTPS, respectively.

#### Examples

```javascript
const { isHttp, isHttps } = require("vfyjs");

// Example 1: Check if the URL is using HTTPS
const resultHttps1 = isHttps("https://www.example.com");
console.log("Result HTTPS Example 1 =>", resultHttps1); // Output: true

// Example 2: Try to check HTTPS for an HTTP URL, should throw an error
try {
  const resultHttps2 = isHttps("http://www.example.com");
  console.log("Result HTTPS Example 2 =>", resultHttps2);
} catch (error) {
  console.error(error.message); // Output: "The URL must contain the substring 'https'. Please provide a valid URL."
}

// Example 3: Check if the URL is using HTTP
const resultHttp1 = isHttp("http://www.example.com");
console.log("Result HTTP Example 1 =>", resultHttp1); // Output: true

// Example 4: Try to check HTTP for an HTTPS URL, should throw an error
try {
  const resultHttp2 = isHttp("https://www.example.com");
  console.log("Result HTTP Example 2 =>", resultHttp2);
} catch (error) {
  console.error(error.message); // Output: "Only HTTP URLs are allowed."
}
```

---

# ConfigPassword

### isPassword

The `isPassword` function in vfyjs allows you to validate and configure password requirements.

#### Configurations

- `minLength`: Specifies the minimum length for the password.
- `maxLength`: Specifies the maximum length for the password.
- `alphabetic`: Requires the password to contain alphabetic characters.
- `lowercase`: Requires the password to contain lowercase characters.
- `number`: Requires the password to contain numeric characters.
- `specialCharacter`: Requires the password to contain special characters.
- `uppercase`: Requires the password to contain uppercase characters.
- `whitespace`: Allows or disallows whitespace characters in the password.

#### Example Usage

Now, let's delve into detailed explanations and examples for each configuration.

### Example 1: Basic Password Validation

```javascript
const { isPassword } = require("vfyjs");
const input = "!@3DS!@#ASdasc";
const pass = isPassword(input); // true
console.log(pass); // Output: true
```

This example showcases the basic usage of the isPassword function without additional configuration, returning true for a isPassword that meets default requirements.

### Example 2: Custom Minimum Length

```javaScript
const { isPassword } = require("vfyjs");
const input = '!@3DS!@#ASdasc';
let pass2;

try {
    pass2 = isPassword(input, {
        minLength: 20,
    });
} catch (error) {
    console.log(error.message); // Output: "Password length must be between 20 and 64 characters."
}
```

In this case, the isPassword function is configured with a custom minimum length of 20 characters, resulting in an error since the input password is shorter than the specified minimum length.

### Example 3: Advanced Password Configuration

```javaScript
const { isPassword } = require("vfyjs");
const input = '!@3DS!@#ASdasc';

try {
    const pass3 = isPassword(input, {
        minLength: { value: 2, errorMessage: 'Password minLength 2' },
        maxLength: { value: 10, errorMessage: 'Password maxLength 10' },
        alphabetic: { required: true, errorMessage: 'The password must be alphabetic' },
        lowercase: false,
        number: { required: false, errorMessage: 'Number is false' },
        specialCharacter: false,
        uppercase: true,
        whitespace: false,
    });
} catch (error) {
    console.log(error.message); // Output: "Password length must be between 2 and 10 characters."
}
```

This example demonstrates various isPassword configuration options, allowing you to set custom minimum and maximum lengths, specify character requirements, and control the presence of whitespace in the password. Adjust these configurations based on your specific requirements.

---

# ConfigEmail

### isEmail

The `isEmail` function in vfyjs allows you to validate and configure email address requirements.

#### Configurations

- `minLenLocal`: Specifies the minimum length for the local part of the email address.
- `maxLenLocal`: Specifies the maximum length for the local part of the email address.
- `minLenSubdomain`: Specifies the minimum length for the subdomain part of the email address.
- `maxLenSubdomain`: Specifies the maximum length for the subdomain part of the email address.
- `minLenDomain`: Specifies the minimum length for the domain part of the email address.
- `maxLenDomain`: Specifies the maximum length for the domain part of the email address.

#### Explanation

An email address typically consists of three parts: `local@subdomain.domainPart`. Let's break down each part:

- **Local Part**: The local part is the portion of the email address before the '@' symbol. It often represents the user's username or mailbox name.

- **Subdomain Part**: The subdomain part is the section between the '@' symbol and the first dot ('.'). It may represent a subdomain of the email provider.

- **Domain Part**: The domain part is the portion after the first dot ('.'). It signifies the domain name of the email provider.

#### Examples

### Example 1: Minimum Length for Local Part

```javascript
const { isEmail } = require("vfyjs");
let email = "je@sub.example.com";

try {
  isEmail(email, { minLenLocal: 5 });
} catch (error) {
  console.log(error.message); // Output: "Length must be at least 5 characters for the local part."
}
```

In this example, the isEmail function checks if the local part of the email address has a minimum length of 5 characters and throws an error if it doesn't meet this requirement.

### Example 2: Maximum Length for Subdomain Part

```javaScript
const { isEmail } = require("vfyjs");
let email = 'john.doe@sub.example.com';
let result = isEmail(email, { maxLenSubdomain: 2 });
console.log('Result =>', result); // Output: true
```

In this example, the isEmail function validates that the subdomain part of the email address has a maximum length of 2 characters. The email address is considered valid, and the result is true.

## Feel free to customize these configurations based on your specific requirements. Adjust the values as needed for your use case.

## ConfigPhone

### hasPhone

The hasPhone function in vfyjs is a versatile utility designed for validating and extracting detailed information about phone numbers. This function aids in understanding the origin, type (landline or mobile), and service availability of a given phone number.

#### Parameters

- `code`: The country code of the phone number.
- `phoneNumber`: The phone number to be validated.

### Explanation

The primary purpose of the hasPhone function is to offer comprehensive validation and analysis of phone numbers. It verifies the input phone number against the specified country code, providing detailed information in the result object. The result includes data such as the continent, country, ISO code, validation status, duplicate code presence, service availability, and phone type (landline or mobile).

#### Examples

### Example 1: Validating and Extracting Information for an Iranian Mobile Number

```javaScript
const { hasPhone } = require("vfyjs");

hasPhone('98', '9112348424').then(result => {
    console.log('Result =>', result);
});

// Output:
/**
{
  continent: 'Asia',
  country: 'Iran',
  code: '98',
  isoCode: 'IR',
  phone: '9112348424',
  hasCode: true,
  hasPhone: true,
  isDuplicateCode: false,
  mobile: true,
  service: true,
  landline: false
}
*/
```

In this example, the hasPhone function is used to validate and extract information about an Iranian mobile number ('9112348424') with the country code '98'. The result object provides a comprehensive set of details about the phone number, including its continent, country, ISO code, and characteristics.

### Example 2: Validating and Extracting Information for a North American Phone Number

```javaScript
const { hasPhone } = require("vfyjs");

hasPhone("1", "1234567890").then(result => {
    console.log('Result =>', result);
});

// Output:
/**
{
  continent: 'North America',
  country: [ 'Canada', 'United States' ],
  code: '1',
  isoCode: [ 'CA', 'US' ],
  phone: '1234567890',
  hasCode: true,
  hasPhone: true,
  isDuplicateCode: true,
  tollFree: false,
  service: true,
  landline: true,
  mobile: true
}
*/
```

In this example, the hasPhone function is applied to validate and extract information about a North American phone number ('1234567890') with the country code '1'. The result object provides a detailed analysis, including continent, countries, ISO codes, and various characteristics of the phone number.

## Usage

To use the hasPhone function, import it from the vfyjs library and invoke it with the appropriate country code and phone number as parameters. The function returns a Promise, so it should be used with asynchronous syntax, such as .then().

```javaScript
const { hasPhone } = require("vfyjs");

hasPhone('98', '9112348424').then(result => {
    console.log('Result =>', result);
});
```

Feel free to incorporate this utility into your applications to enhance phone number validation and gain valuable insights into the provided phone numbers. Adjust the parameters and utilize the information in the result object based on your specific requirements.

---

## ConfigBinaryTree

### BinarySearchTree

The `BinarySearchTree` class is a JavaScript implementation of a binary search tree (BST) data structure. It provides methods for inserting values into the tree, searching for values, and handling multiple values simultaneously. The tree is composed of nodes, each with a value and references to left and right child nodes.

### Parameters

- `insert(value)`: Inserts a value into the binary search tree.
- `insertArray(values)`: Inserts multiple values from an array into the binary search tree.
- `search(value)`: Searches for a value within the binary search tree.

### Examples

### Examples

#### Example 1: Inserting and Searching for Values in a Binary Search Tree

```javascript
const { Binary } = require("vfyjs");

// Create a new binary search tree instance
const bst = new Binary.Search();

// Insert values into the binary search tree
bst.insert(10);
bst.insert(5);
bst.insert(15);

// Search for a value in the binary search tree
const foundValue = bst.search(5);

if (foundValue) {
  console.log("Value 5 is found in the binary search tree.");
} else {
  console.log("Value 5 is not found in the binary search tree.");
}
```

In this example, we create a new instance of the `BinarySearchTree` class and insert values `10`, `5`, and `15` into the tree using the `insert` method. Then, we search for the value `5` using the `search` method and log whether the value is found or not.

#### Example 2: Inserting Reserved Usernames into a Binary Search Tree

```javascript
const { Binary } = require("vfyjs");

// Create a new binary search tree instance
const usernameValidator = new Binary.Search();

// Reserved usernames to insert into the binary search tree
const reservedUsernames = ["admin", "root", "superuser"];

// Insert reserved usernames into the binary search tree
usernameValidator.insertArray(reservedUsernames);

// Validate a username
const usernameToValidate = "admin";
const isReserved = usernameValidator.search(usernameToValidate);

if (isReserved) {
  console.log(
    `Username '${usernameToValidate}' is reserved. Please choose another.`
  );
} else {
  console.log(`Username '${usernameToValidate}' is valid.`);
}
```

In this example, we create a new instance of the `BinarySearchTree` class and insert reserved usernames (`"admin"`, `"root"`, `"superuser"`) into the tree using the `insertArray` method. Then, we validate a username (`"admin"`) by searching for it in the binary search tree using the `search` method. If the username is found, we log a message indicating that it is reserved; otherwise, we log a message indicating that it is valid.

---

## ConfigValue

## Validation Functions

The `inputValidator` function returns an object with various validation functions for string inputs. Here are the available functions:

- `hasUppercase`: Checks if the input has at least one uppercase letter.
- `hasLowerCase`: Checks if the input has at least one lowercase letter.
- `hasNumber`: Checks if the input has at least one numeric digit.
- `hasSpecialCharacter`: Checks if the input has at least one special character.
- `hasAlphabetic`: Checks if the input contains at least one alphabetic character.
- `hasNumeric`: Checks if the input contains at least one numeric digit.
- `hasAlphanumeric`: Checks if the input contains only alphanumeric characters.
- `hasWhitespace`: Checks if the input contains any whitespace character.
- `hasNonAlphanumeric`: Checks if the input contains any non-alphanumeric character.
- `hasMinLength(minLength)`: Checks if the input has a minimum length.
- `hasMaxLength(maxLength)`: Checks if the input has a maximum length.
- `matchesCustomPattern(pattern)`: Checks if the input matches a custom regex pattern.
- `matchesEmailFormat`: Checks if the input matches the standard email format.
- `hasRepeat(repeatCount)`: Checks if the input contains consecutive repeated characters.

## Usage Example

```javascript
const validator = inputValidator("Sample123");
const isValid = validator.hasUppercase() && validator.hasNumber();
console.log(isValid); // true
```

---

## ConfigSubstring

### getSubstring

The `getSubstring` function in vfyjs is designed to retrieve substrings from a given string based on specified indexes.

#### Parameters

- `inputString`: The original string from which to extract the substring.
- `startIndex`: An array representing the start index or range for extracting the substring. If a single value is provided, it is considered the start index. If an array is provided, it represents a range [start, end].
- `endIndex`: An optional parameter representing the end index for extracting the substring. If not provided, the substring will be extracted up to the end of the string.

#### Explanation

The `getSubstring` function allows you to precisely obtain a substring from the provided input string by specifying the start and end indexes. This is useful for extracting specific portions of a string based on your application's requirements.

#### Examples

### Example 1: Extracting Substring "hello" from "Hello-World"

```javascript
const { getSubstring } = require("vfyjs");

const formatHello = getSubstring("Hello-World", [0, 4]);
console.log("Result =>", formatHello); // Output: "hello"
```

In this example, the getSubstring function is used to extract the substring "hello" from the input string "Hello-World" based on the specified start index [0] and end index [4].

### Example 2: Extracting Substring "Wo" from "Hello-World"

```javaScript
const { getSubstring } = require("vfyjs");

const formatHello = getSubstring('Hello-World', [6, 7]);
console.log('Result =>', formatHello); // Output: "Wo"
```

In this example, the getSubstring function is used to extract the substring "Wo" from the input string "Hello-World" based on the specified start index [6] and end index [7].

---

## ConfigTrimValue

### trimValue

The `trimValue` function in vfyjs is a powerful utility designed to clean up strings by removing any leading and trailing whitespace, providing a more sanitized and consistent representation.

#### Parameters

- `inputString`: The string to be trimmed.

#### Explanation

The primary purpose of the `trimValue` function is to ensure that strings are free from unnecessary spaces at the beginning and end. This is particularly useful in scenarios where user inputs, configuration data, or formatted text need to be processed without unwanted whitespace.

#### Example

### Example: Removing Extra Spaces from a String

```javascript
const { trimValue } = require("vfyjs");

let inputString = "      He  l  l  o   W  o  r  l  d";
let trimmedResult = trimValue(inputString);
console.log("Result =>", trimmedResult); // Output: "HelloWorld"
```

In this example, the trimValue function is applied to the input string, which contains extra spaces. The result is a cleaned string without leading or trailing whitespace, producing the sanitized output "HelloWorld".

Feel free to utilize the trimValue function in your applications to ensure consistent and well-formatted strings, improving the overall robustness and reliability of your data processing tasks. Adjust the input parameters based on your specific requirements.

---

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
