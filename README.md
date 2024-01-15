# Introduction

VfyJS is a lightweight JavaScript library designed for value validation, ensuring data integrity and empowering developers with an advanced platform to address diverse validation tasks in their projects. This documentation provides a comprehensive overview of the library, its components, and usage guidelines.


## Key Features
- Comprehensive value validation
- Advanced error handling
- Customizable validation criteria
- Lightweight and easy-to-use design

## Installation
To install VfyJS, run the following command:

```bash
npm install vfyjs
```

## Usage
To use VfyJS, import the desired validation functions from the library and call them with the value to be validated and any optional validation criteria.

### Password Validation
To validate a password, import the password function from the library and call it with the password value and an optional validation criteria object.

```javaScript
const { password } = require('vfyjs');

const validValue = "sdaa@@#asd354A3%#!w";
const validOptions = {
  minLength: {
    value: 10,
    errorMessage: "Password must be at least 10 characters long.",
  },
  maxLength: {
    value: 30,
    errorMessage: "Password cannot exceed 30 characters.",
  },
  uppercase: { required: false, errorMessage: "uppercase ." },
  lowercase: { required: true, errorMessage: "lowercase r." },
  number: { required: false, errorMessage: "number ." },
  specialCharacter: { required: false, errorMessage: "specialCharacter" },
  alphabetic: { required: true, errorMessage: "alphabetic " },
  whitespace: { required: false, errorMessage: "whitespace " },
};

const is_valid = password(validValue, validOptions);
console.log(is_valid); // true
```

### Optional objects:

- `errorMessage` : Take a text as an input and if you encounter an error, it will show the text, which is different by default for each property!

- `required` : Adjusts whether it is a single object or not (true or false)

- `value` : It takes a number

- `minLength`: The minimum length requirement for the password, with a default value of 8.
- `maxLength`: The maximum length requirement for the password, with a default value of 64.
- `uppercase`: An object with a required property (default true) and an errorMessage property (default "Password must contain at least one uppercase letter.").

- `lowercase`: An object with a required property (default true) and an errorMessage property (default "Password must contain at least one lowercase letter.").

- `number`:  An object with a required property (default true) and an errorMessage property (default "Password must have at least one number.").
- `specialCharacter`: An object with a required property (default true) and an errorMessage property (default "Password must contain at least one special character such as (@#$%^&*)..").
- `alphabetic`: An object with a required property (default true) and an errorMessage property (default "Input must contain at least one alphabetic character. ").
- `whitespace`: An object with a required property (default false) and an errorMessage property (default "Password cannot contain whitespace. ").

### Email Validation
To validate an email address, import the email function from the library and call it with the email value.

```javaScript
const { email } = require('vfyjs');

const validValue = "mahdimamashli1383@gmail.com";

const is_valid = email(validValue);
console.log(is_valid); // true
```

### Error Handling

VfyJS includes custom error handling for validation-related errors. If validation fails, an error will be thrown with a detailed error message and the associated property or field.

```javaScript
const { password } = require('vfyjs');

const invalidValue = "12345678";
const validOptions = {
  minLength: {
    value: 10,
    errorMessage: "Password must be at least 10 characters long.",
  },
};

try {
  const is_valid = password(invalidValue, validOptions);
} catch (error) {
  console.error(error.property, error.message);
  // Password, Password must be at least 10 characters long.
}
```

## License

VfyJS is released under the MIT License. For more information, see the LICENSE file.


## Contributing

Contributions to VfyJS are welcome! If you'd like to contribute, please fork the repository and submit a pull request.


For more information about VfyJS, visit the official GitHub repository.

If you have any questions or need assistance, please don't hesitate to open an issue or [contact](https://twitter.com/m__mdy__m).

