const inputValidator = (input) => ({
  hasUppercase: () => /(?=.*[A-Z])/.test(input),
  hasLowerCase: () => /(?=.*[a-z])/.test(input),
  hasNumber: () => /(?=.*[\d])/.test(input),
  hasSpecialCharacter: () =>
    /(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(input),
  hasString: () => /(?=.*[\w])/.test(input),
});

module.exports = inputValidator;
