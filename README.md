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

- [Data Validation](https://github.com/m-mdy-m/VfyJS/blob/main/doc/DataValidation.doc.md)
- [Request Validation](https://github.com/m-mdy-m/VfyJS/blob/main/doc/request.validate.md)
### DataValidation

- **Colors**: Validate various color formats, including hex, name, RGB, RGBA, and CssVarHwb. [Configuration](https://github.com/m-mdy-m/VfyJS/blob/main/doc/DataValidation.doc.md#configcolor)
- **Links**: Detect and validate HTTP or HTTPS links. [Configuration](https://github.com/m-mdy-m/VfyJS/blob/main/doc/DataValidation.doc.md#configlinks)
- **Global Configuration**: Set default options for username and password validation. [Configuration](https://github.com/m-mdy-m/VfyJS/blob/main/doc/DataValidation.doc.md#global-configuration-for-username-and-password-validation)
- **Usernames**: Validate usernames with customizable criteria. [Configuration](https://github.com/m-mdy-m/VfyJS/blob/main/doc/DataValidation.doc.md#configusername)
- **Passwords**: Strong password detection with customization options. [Configuration](https://github.com/m-mdy-m/VfyJS/blob/main/doc/DataValidation.doc.md#configpassword)
- **Emails**: Recognize and validate email addresses. [Configuration](https://github.com/m-mdy-m/VfyJS/blob/main/doc/DataValidation.doc.md#configemail)
- **Custom Validation Functions**: Validate various aspects of a string input. [Configuration](https://github.com/m-mdy-m/VfyJS/blob/main/doc/DataValidation.doc.md#configvalue)

## Request Validation

Request validation is a crucial aspect of web development, ensuring that the data sent to your server meets specific criteria before processing it further. The `RequestValidator` class provided by VfyJS simplifies this process by offering a comprehensive set of validation methods tailored for Node.js applications.

### Features

- **Flexible Validation**: Define rules for each field in the request data to ensure its validity.
- **Custom Error Messages**: Provide custom error messages for individual fields to improve clarity in error reporting.
- **Wide Range of Validators**: Choose from a variety of built-in validators covering common validation scenarios.
- **Custom Validators**: Define custom validators to address specific validation requirements unique to your application.

### Example

Consider a scenario where you have an endpoint `/signup` in your Express application to handle user registrations. You want to ensure that the incoming data for `username`, `password`, and `email` fields adheres to certain criteria before processing the signup request.

```javascript
const express = require('express');
const {RequestValidator} = require('vfyjs');

const app = express();
app.use(express.json());

app.post('/signup', (req, res) => {
  const validator = new RequestValidator(req.body);
  const rules = {
    username: 'string|alphanumeric|min:5|max:20',
    password: 'string|min:8',
    email: 'email',
  };
  const errors = validator.validate(rules);
  if (Object.keys(errors).length === 0) {
    // Data is valid, proceed with signup
    res.status(200).json({ message: 'Signup successful!' });
  } else {
    // Validation errors, return error response
    res.status(400).json({ errors });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

In this example, when a POST request is made to `/signup` endpoint with JSON data containing `username`, `password`, and `email` fields, the `RequestValidator` class is utilized to validate the request body against specified rules. If there are validation errors, the server responds with a 400 status code and the error messages; otherwise, it responds with a 200 status code indicating successful signup.


## Installation

Install vfyjs using npm:

```bash
npm install vfyjs
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
