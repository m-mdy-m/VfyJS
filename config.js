const { isEmail } = require("./index");
const gmail = "example@example.com";

    let isValid1 = isEmail('john.doe@sub.example.com', { maxLengthSubdomain: 10 });
    let isValid2 = isEmail('j.d@example.com', { minLengthLocal: 3, maxLengthDomainPart: 10 });
    try {
        
        let isValid3 = isEmail('john.doe@sub..example.com');
        console.log('isValid3 =>',isValid3);
    } catch (error) {
        console.log(error.message); // The provided email address 'john.doe@sub..example.com' is not valid. Please enter a valid email
    }
    try {
        
        let isValid4 = isEmail('j.d@example.com', { minLengthLocal: 3, maxLengthDomainPart: 10 });
        console.log('isValid4 =>',isValid4);
    } catch (error) {
        console.log(error.message); // The provided email address 'john.doe@sub..example.com' is not valid. Please enter a valid email
    }
    console.log('isValid1 =>',isValid1); // true
    console.log('isValid2 =>',isValid2); // true