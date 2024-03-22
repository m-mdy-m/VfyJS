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

Here's the updated documentation for `isHttp` and `isHttps` functions in vfyjs:

### isHttp and isHttps

The `isHttp` and `isHttps` functions in vfyjs allow you to check if a given URL uses HTTP or HTTPS, respectively.

#### Usage

```javascript
const { isHttp, isHttps } = require("vfyjs");

// Example 1: Check if the URL is using HTTPS
const resultHttps1 = isHttps("https://www.example.com");
console.log("Result HTTPS Example 1 =>", resultHttps1); // Output: true

// Example 2: Handle an invalid HTTPS URL with try-catch
try {
  const resultHttps2 = isHttps("http://www.example.com");
  console.log("Result HTTPS Example 2 =>", resultHttps2);
} catch (error) {
  console.error(error.message); // Output: "Only HTTPS URLs are allowed."
}

// Example 3: Check if the URL is using HTTP
const resultHttp1 = isHttp("http://www.example.com");
console.log("Result HTTP Example 1 =>", resultHttp1); // Output: true

// Example 4: Handle an invalid HTTP URL with try-catch
try {
  const resultHttp2 = isHttp("https://www.example.com");
  console.log("Result HTTP Example 2 =>", resultHttp2);
} catch (error) {
  console.error(error.message); // Output: "Only HTTP URLs are allowed."
}
```

---
# Global Configuration for Username and Password Validation

This module provides functions for configuring default options for username and password validation.

## Default Options

An object containing the default options for password and username validation.

### Password Validation Options:

- `minLength`: Minimum length requirements for the password.
- `maxLength`: Maximum length requirements for the password.
- `uppercase`: Uppercase letter requirements for the password.
- `lowercase`: Lowercase letter requirements for the password.
- `number`: Numeric digit requirements for the password.
- `specialCharacter`: Special character requirements for the password.
- `whitespace`: Whitespace requirements for the password.

### Username Validation Options:

- `minLength`: Minimum length requirements for the username.
- `maxLength`: Maximum length requirements for the username.
- `alphanumeric`: Alphanumeric character requirements for the username.
- `whitespace`: Whitespace requirements for the username.

## Functions

### setPasswordConfig(option)

Sets the configuration options for password validation.

- `option` (Object): Options object for customizing password validation criteria.

### setUsernameConfig(option)

Sets the configuration options for username validation.

- `option` (Object): Options object for customizing username validation criteria.

## Example Usage

```javascript
const { setPasswordConfig, setUsernameConfig } = require('vfyjs');

// Set custom options for password validation
setPasswordConfig({
  minLength: { value: 10, message: "Must be at least 10 characters long." },
  maxLength: { value: 50, message: "Cannot exceed 50 characters." },
  uppercase: { required: true, message: "At least one uppercase letter is required." },
  lowercase: { required: true, message: "At least one lowercase letter is required." },
  number: { required: true, message: "At least one numeric digit is required." },
  specialCharacter: { required: true, message: "At least one special character is required." },
});

// Set custom options for username validation
setUsernameConfig({
  minLength: { value: 5, message: "Username must be at least 5 characters long." },
  maxLength: { value: 20, message: "Username cannot exceed 20 characters." },
  alphanumeric: { required: true, message: "Only alphanumeric characters are allowed in the username." },
  whitespace: { required: false, message: "Leading or trailing whitespaces are allowed in the username." },
});
```
# Username Validation

This module provides functionality to validate usernames based on customizable criteria.

## Overview

The `isUsername` function validates usernames according to specified criteria, including length constraints, character composition, and format restrictions.

## Function Signature

```javascript
isUsername(input, options = {})
```

- **Parameters:**
  - `input`: The username string to be validated.
  - `options`: An optional object containing customization options for validation criteria.

- **Returns:** 
  - `boolean`: Indicates whether the username is valid according to the specified criteria.

- **Throws:** 
  - `Error`: Throws an error if validation fails.

## Username Options

### `minLength`

Specifies the minimum length requirements for the username.

### `maxLength`

Specifies the maximum length requirements for the username.

### `alphanumeric`

Defines whether the username must consist of alphanumeric characters.

### `whitespace`

Specifies whether whitespace characters are disallowed in the username.

Each option includes a `required` property to specify whether the corresponding criteria are mandatory, along with a `message` property to define the error message for validation failures.

## Example Usage

```javascript
const { isUsername } = require("vfyjs");

const username = "JohnDoe123";
const isValid = isUsername(username);

console.log(isValid); // true
```

In this example, the function validates the username `"JohnDoe123"` without any specific customization.

```javascript
const { isUsername } = require("vfyjs");

const username = "Admin123";
const options = {
  minLength: { value: 6, message: "Username must be at least 6 characters long." },
  maxLength: { value: 20, message: "Username cannot exceed 20 characters." },
  alphanumeric: { required: true, message: "Username must consist of alphanumeric characters only." },
  whitespace: { required: false, message: "Username cannot contain whitespace characters." }
};

const isValid = isUsername(username, options);

console.log(isValid); // true
```
# Password Validation

This module provides functionality to validate passwords based on customizable criteria for enhanced security.

## Overview

The `isPassword` function validates passwords according to specified criteria, including length constraints, character composition, and format restrictions.

## Function Signature

```javascript
isPassword(input, options = {})
```

- **Parameters:**
  - `input`: The password string to be validated.
  - `options`: An optional object containing customization options for validation criteria.

- **Returns:** 
  - `boolean`: Indicates whether the password is valid according to the specified criteria.

- **Throws:** 
  - `Error`: Throws an error if validation fails.

## Password Options

### `minLength`

Specifies the minimum length requirements for the password.

### `maxLength`

Specifies the maximum length requirements for the password.

### `lowercase`

Specifies whether lowercase letters are required in the password.

### `uppercase`

Specifies whether uppercase letters are required in the password.

### `number`

Specifies whether numeric digits are required in the password.

### `specialCharacter`

Specifies whether special characters are required in the password.

### `whitespace`

Specifies whether whitespace characters are allowed in the password.

Each option includes a `required` property to specify whether the corresponding criteria are mandatory, along with a `message` property to define the error message for validation failures.

## Example Usage

```javascript
const { isPassword } = require("vfyjs");

const password = "StrongPwd@123";
const isValid = isPassword(password);

console.log(isValid); // true
```

In this example, the function validates the password `"StrongPwd@123"` without any specific customization.

```javascript
const { isPassword } = require("vfyjs");

const password = "!@3DS!@#ASdasc";
try {
  const isValid = isPassword(password, {
    minLength: {
      value: 20,
      message: "Password must be at least 20 characters long.",
    },
  });
} catch (error) {
  console.error(error.message); // Output: "Password must be at least 20 characters long."
}
```

In this case, the function is configured with a custom minimum length of 20 characters, resulting in an error since the input password is shorter than the specified minimum length.

```javascript
const { isPassword } = require("vfyjs");

const password = "!@3DS!@#ASdasc";
try {
  const isValid = isPassword(password, {
    minLength: { value: 2, message: "Password must be at least 2 characters long." },
    maxLength: { value: 10, message: "Password must not exceed 10 characters." },
    alphabetic: { required: true, message: "The password must contain alphabetic characters." },
    lowercase: false,
    number: { required: false, message: "The password must not contain numeric characters." },
    specialCharacter: false,
    uppercase: true,
    whitespace: false,
  });
} catch (error) {
  console.error(error.message); // Output: "Password must be at least 2 characters long."
}
```

# Email Validation

This module provides functionality to validate email addresses based on customizable criteria, ensuring their format and length meet specified requirements.

## Overview

The `isEmail` function allows you to validate email addresses with precision, checking various aspects such as the length of different parts (local, subdomain, domain), ensuring proper format, and detecting potential errors.

## Function Signature

```javascript
isEmail(input, options = {})
```

- **Parameters:**
  - `input`: The email address to be validated.
  - `options`: An optional object containing customization options for email validation.

- **Returns:** 
  - `boolean`: Indicates whether the email address is valid according to the specified criteria.

- **Throws:** 
  - `TypeError`: Throws a TypeError if the input is not a string.
  - `ValidationError`: Throws a ValidationError if the email format is invalid.

## Email Validation Options

### `minLenLocal`

Specifies the minimum length allowed for the local part of the email address.

### `maxLenLocal`

Specifies the maximum length allowed for the local part of the email address.

### `minLenSubdomain`

Specifies the minimum length allowed for the subdomain part of the email address.

### `maxLenSubdomain`

Specifies the maximum length allowed for the subdomain part of the email address.

### `minLenDomain`

Specifies the minimum length allowed for the domain part of the email address.

### `maxLenDomain`

Specifies the maximum length allowed for the domain part of the email address.

Each option includes a value to set the length requirement and a corresponding error message for validation failures.

## Example Usage

```javascript
const { isEmail } = require("vfyjs");

const email = "example@example.com";
const isValid = isEmail(email);

console.log(isValid); // true
```

In this example, the function validates the email address `"example@example.com"` without any specific customization.

```javascript
const { isEmail } = require("vfyjs");

const email = "example@example.com";
try {
  const isValid = isEmail(email, { minLenLocal: 5 });
} catch (error) {
  console.error(error.message); // Output: "Length must be at least 5 characters for the local part."
}
```

Here, the function checks if the local part of the email address has a minimum length of 5 characters and throws an error if it doesn't meet this requirement.

```javascript
const { isEmail } = require("vfyjs");

const email = "example@example.com";
try {
  const isValid = isEmail(email, { maxLenSubdomain: 2 });
} catch (error) {
  console.error(error.message); // Output: "Length cannot exceed 2 characters for the subdomain part."
}
```

This example validates that the subdomain part of the email address has a maximum length of 2 characters, triggering an error if this requirement is not met.

---

# ConfigValue

## Validation Functions

The `inputValidator` function provides an object with a comprehensive set of validation functions tailored for string inputs. Each function targets specific criteria, enabling thorough validation of input strings. Here are the available validation functions:

- `hasUppercase`: Validates if the input contains at least one uppercase letter.
- `hasLowerCase`: Validates if the input contains at least one lowercase letter.
- `hasNumber`: Validates if the input contains at least one numeric digit.
- `hasSpecialCharacter`: Validates if the input contains at least one special character.
- `hasAlphabetic`: Validates if the input contains at least one alphabetic character.
- `hasNumeric`: Validates if the input contains at least one numeric digit.
- `hasAlphanumeric`: Validates if the input contains only alphanumeric characters.
- `hasWhitespace`: Validates if the input contains any whitespace character.
- `hasNonAlphanumeric`: Validates if the input contains any non-alphanumeric character.
- `hasMinLength(minLength)`: Validates if the input meets a minimum length requirement.
- `hasMaxLength(maxLength)`: Validates if the input meets a maximum length requirement.
- `matchesCustomPattern(pattern)`: Validates if the input matches a custom regex pattern.
- `matchesEmailFormat`: Validates if the input matches the standard email format.
- `hasRepeat(repeatCount)`: Validates if the input contains consecutive repeated characters.

## Usage Example

```javascript
const validator = inputValidator("Sample123");
const isValid = validator.hasUppercase() && validator.hasNumber();
console.log(isValid); // true
```