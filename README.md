# vfyjs

**vfyjs** is a powerful and flexible JavaScript library designed to streamline data validation, string manipulation, and error handling in your projects. Whether you're working with user input, configuration data, or API responses, vfyjs provides a comprehensive set of utilities to ensure data integrity and enhance code reliability.
## Introduction

Data validation, string manipulation, and error handling are fundamental aspects of software development. vfyjs aims to simplify these tasks, allowing developers to focus on building robust applications without compromising on data integrity.

## Features 

- [Data Validation](#data-validation)
- [String Manipulation](#string-manipulation)
- [Error Handling](#error-handling)
- [Configuration](#configuration)

### Data Validation {#data-validation}

- **Colors**: Validate various color formats, including hex, name, RGB, RGBA, and CssVarHwb. [Configuration](#ConfigColor)
- **Links**: Detect and validate HTTP or HTTPS links. [Configuration](#ConfigLinks)
- **Passwords**: Strong password detection with customization options. [Configuration](#ConfigPassword)
- **Emails**: Recognize and validate email addresses. [Configuration](#ConfigEmail)
- **Phone Numbers**: Validate phone numbers from 50 countries, providing detailed information about the country, code, and phone type (landline, mobile, etc.). [Configuration](#ConfigPhone)

### String Manipulation {#string-manipulation}

- **getSubstring**: Retrieve substrings from a given string based on specified indexes. [Configuration](#ConfigSubstring)
- **trimValue**: Trim extra spaces from the beginning and end of a string. [Configuration](#ConfigtrimValue)

### Error Handling {#error-handling}

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

## ConfigColor {#ConfigColor}
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
const isColor = require('vfyjs').isColor;

const hasHex = '#fff';
console.log('isColor(hasHex).HEX() =>', isColor(hasHex).HEX()); // true

const hasCssVar = 'var(--main-color)';
console.log('isColor(hasCssVar).CssVar() =>', isColor(hasCssVar).CssVar()); // true

const hasHSL = 'hsl(120, 100%, 50%)';
console.log('isColor(hasHSL).HSL() =>', isColor(hasHSL).HSL()); // true

const hasHWB = 'hwb(120, 100%, 50%)';
console.log('isColor(hasHWB).HWB() =>', isColor(hasHWB).HWB()); // true

const hasNameColor = 'red';
console.log('isColor(hasNameColor).NameColor() =>', isColor(hasNameColor).NameColor()); // true

const hasRGB = 'rgb(255, 0, 0)';
console.log('isColor(hasRGB).RGB() =>', isColor(hasRGB).RGB()); // true

const hasRGBA = 'rgba(255, 0, 0, 0.5)';
console.log('isColor(hasRGBA).RGBA() =>', isColor(hasRGBA).RGBA()); // true
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
console.log('Result HTTPS Example 1 =>', resultHttps1); // Output: true

// Example 2: Try to check HTTPS for an HTTP URL, should throw an error
try {
  const resultHttps2 = isHttps("http://www.example.com");
  console.log('Result HTTPS Example 2 =>', resultHttps2);
} catch (error) {
  console.error(error.message); // Output: "The URL must contain the substring 'https'. Please provide a valid URL."
}

// Example 3: Check if the URL is using HTTP
const resultHttp1 = isHttp("http://www.example.com");
console.log('Result HTTP Example 1 =>', resultHttp1); // Output: true

// Example 4: Try to check HTTP for an HTTPS URL, should throw an error
try {
  const resultHttp2 = isHttp("https://www.example.com");
  console.log('Result HTTP Example 2 =>', resultHttp2);
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
const input = '!@3DS!@#ASdasc';
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
let email = 'je@sub.example.com';

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

Feel free to customize these configurations based on your specific requirements. Adjust the values as needed for your use case.

## License

VfyJS is released under the MIT License. For more information, see the LICENSE file.


## ........
link organization : https://github.com/VfyJs
link main repository : https://github.com/m-mdy-m/VfyJS
link npm : https://www.npmjs.com/package/vfyjs
