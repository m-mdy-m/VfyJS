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

Based on the provided code and documentation, the `validateFormPassword` function in `vfyjs` allows you to validate passwords based on customizable criteria. Let's update and improve the documentation to provide comprehensive explanations and examples for each configuration option.

### ConfigPassword

### validateFormPassword

The `validateFormPassword` function in vfyjs allows you to validate passwords based on customizable criteria.

#### Configuration Options

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
const { validateFormPassword } = require("vfyjs");

const password = "StrongPwd@123";
const isValid = validateFormPassword(password);
console.log(isValid); // Output: true
```

This example showcases the basic usage of the `validateFormPassword` function without additional configuration, returning `true` for a password that meets default requirements.

### Example 2: Custom Minimum Length

```javascript
const { validateFormPassword } = require("vfyjs");

const password = "!@3DS!@#ASdasc";
try {
    const isValid = validateFormPassword(password, {
        minLength: { value: 20, errorMessage: 'Password must be at least 20 characters long.' },
    });
} catch (error) {
    console.error(error.message); // Output: "Password must be at least 20 characters long."
}
```

In this case, the `validateFormPassword` function is configured with a custom minimum length of 20 characters, resulting in an error since the input password is shorter than the specified minimum length.

### Example 3: Advanced Password Configuration

```javascript
const { validateFormPassword } = require("vfyjs");

const password = "!@3DS!@#ASdasc";
try {
    const isValid = validateFormPassword(password, {
        minLength: { value: 2, errorMessage: 'Password must be at least 2 characters long.' },
        maxLength: { value: 10, errorMessage: 'Password must not exceed 10 characters.' },
        alphabetic: { required: true, errorMessage: 'The password must contain alphabetic characters.' },
        lowercase: false,
        number: { required: false, errorMessage: 'The password must not contain numeric characters.' },
        specialCharacter: false,
        uppercase: true,
        whitespace: false,
    });
} catch (error) {
    console.error(error.message); // Output: "Password must be at least 2 characters long."
}
```

---

## ConfigEmail

### validateEmail

The `validateEmail` function in vfyjs allows you to validate email addresses based on customizable criteria.

#### Configuration Options

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
const { validateEmail } = require("vfyjs");
let email = "je@sub.example.com";

try {
  validateEmail(email, { minLenLocal: 5 });
} catch (error) {
  console.log(error.message); // Output: "Length must be at least 5 characters for the local part."
}
```

In this example, the `validateEmail` function checks if the local part of the email address has a minimum length of 5 characters and throws an error if it doesn't meet this requirement.

### Example 2: Maximum Length for Subdomain Part

```javaScript
const { validateEmail } = require("vfyjs");
let email = 'john.doe@sub.example.com';
let result = validateEmail(email, { maxLenSubdomain: 2 });
console.log('Result =>', result); // Output: true
```

In this example, the `validateEmail` function validates that the subdomain part of the email address has a maximum length of 2 characters. The email address is considered valid, and the result is true.

**Feel free to customize these configurations based on your specific requirements. Adjust the values as needed for your use case.**

---

With these updates, the documentation provides clear explanations and examples for configuring and using the `validateEmail` function to validate email addresses in different scenarios.

# ConfigPhone

### hasPhone

The `hasPhone` function in vfyjs is a powerful utility crafted for thorough validation and detailed analysis of phone numbers. It offers insights into the origin, type (landline or mobile), and service availability of the provided phone number.

#### Parameters

- `code`: The country code of the phone number.
- `phoneNumber`: The phone number to be validated.

### Explanation

The `hasPhone` function serves the dual purpose of validating and extracting comprehensive information about phone numbers. It rigorously verifies the input phone number against the specified country code, furnishing an exhaustive result object. This object contains crucial data points including the continent, country, ISO code, validation status, presence of duplicate codes, service availability, and phone type (landline or mobile).

#### Examples

### Example 1: Validating and Extracting Information for an Iranian Mobile Number

```javascript
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

In this example, the `hasPhone` function is utilized to validate and extract information about an Iranian mobile number ('9112348424') with the country code '98'. The resulting object provides a comprehensive array of details regarding the phone number, encompassing its continent, country, ISO code, and various characteristics.

### Example 2: Validating and Extracting Information for a North American Phone Number

```javascript
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

In this example, the `hasPhone` function is employed to validate and extract information about a North American phone number ('1234567890') with the country code '1'. The resulting object furnishes a detailed analysis, encompassing the continent, countries, ISO codes, and various characteristics of the phone number.

## Usage

To leverage the capabilities of the `hasPhone` function, import it from the vfyjs library and invoke it with the appropriate country code and phone number as parameters. Since the function returns a Promise, it should be utilized with asynchronous syntax, such as `.then()`.

```javascript
const { hasPhone } = require("vfyjs");

hasPhone('98', '9112348424').then(result => {
    console.log('Result =>', result);
});
```

Feel empowered to integrate this utility into your applications to elevate phone number validation and acquire valuable insights into the provided phone numbers. Customize the parameters and harness the information in the result object to suit your specific requirements.

---

# ConfigBinaryTree

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

# ConfigValue

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