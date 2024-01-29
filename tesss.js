const input = document.querySelector("input");
input.addEventListener("input", () => {
  const value = input.value;
  console.log('value =>',value);
  try {
    vfyjs.isPassword(input);
  } catch (error) {
    // console.log('error =>',error);
    console.log("error.message =>", error.message);
    // console.log("error.property =>", error.property);
    // console.log("error.input =>", error.input);
    // console.log("error.errors =>", error.errors);
    // console.log("error.value =>", error.value);
    // console.log("error.validationRule =>", error.validationRule);
    // console.log("error.fieldType =>", error.fieldType);
    // console.log("error.timestamp =>", error.timestamp);
    // console.log("error.statusError =>", error.statusError);
  }
});
