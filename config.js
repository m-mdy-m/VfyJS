const { HandleError } = require("./index");
try {
    HandleError.IfIsNumber(42)
} catch (error) {
    console.log(error.message); // Value should not be a number
}
