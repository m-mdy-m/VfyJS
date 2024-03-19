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

- **Colors**: Validate various color formats, including hex, name, RGB, RGBA, and CssVarHwb. [Configuration](https://github.com/m-mdy-m/VfyJS/blob/main/doc/DataValidation.doc.md#configcolor)
- **Links**: Detect and validate HTTP or HTTPS links. [Configuration](https://github.com/m-mdy-m/VfyJS/blob/main/doc/DataValidation.doc.md#configlinks)
- **Global Configuration**: Set default options for username and password validation. [Configuration](https://github.com/m-mdy-m/VfyJS/blob/main/doc/DataValidation.doc.md#global-configuration-for-username-and-password-validation)
- **Usernames**: Validate usernames with customizable criteria. [Configuration](https://github.com/m-mdy-m/VfyJS/blob/main/doc/DataValidation.doc.md#configusername)
- **Passwords**: Strong password detection with customization options. [Configuration](https://github.com/m-mdy-m/VfyJS/blob/main/doc/DataValidation.doc.md#configpassword)
- **Emails**: Recognize and validate email addresses. [Configuration](https://github.com/m-mdy-m/VfyJS/blob/main/doc/DataValidation.doc.md#configemail)
- **Phone Numbers**: Validate phone numbers from 50 countries, providing detailed information about the country, code, and phone type (landline, mobile, etc.). [Configuration]()
- **BinaryTree**: Efficient searching and manipulation of data using a binary tree data structure [Configuration](#ConfigBinaryTree)
- **Custom Validation Functions**: Validate various aspects of a string input. [Configuration]()

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
