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