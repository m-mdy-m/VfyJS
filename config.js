const { isEmail } = require("./index");
let gmail = "john.doesub.example.com";
try {
    isEmail(gmail)
} catch (error) {
    console.log(error.message);// Email address must contain the "@" symbol.
}
gmail = 'john.doe@sub.example.co!!m'

try {
    isEmail(gmail)
} catch (error) {
    console.log(error.message); // Subdomain should not contain special characters
}
gmail ='john.doe@sub.example.com'
let result = isEmail(gmail, { maxLenSubdomain: 2 })
console.log('result =>', result); // true

gmail = 'john.doe@sub.example..com'
try {
    isEmail(gmail)
} catch (error) {
    console.log(error.message); // The value must have at most one dot.
}
gmail ='john.doe@sub.example.com'
result = isEmail(gmail, { maxLenSubdomain: 20 })
console.log('result =>', result); // true

gmail ='je@sub.example.com'

try {
    isEmail(gmail, { maxLenLocal: 3 })
    
} catch (error) {
    console.log(error.message); // Length must be at least 3 characters.
    
}
// All Config =>
isEmail(gmail,{
    minLenLocal : '',
    maxLenLocal : '',
    minLenSubdomain : '',
    maxLenSubdomain : '',
    minLenDomain : '',
    maxLenDomain : '',
})