const passwordValidator = require('../../../src/validator/validate_form/passwordValidator')

describe('validates a password with at least 8 characters', () => {
  test('should return true for a valid password', () => {
    const validPassword = 'mahdi_'; 
    const isValid = passwordValidator(validPassword, {
      minLength: 4,
      LowerCase: true,
      UpperCase: false,
      Number: false,
      SpecialCharacter: true,
      repeatChar : 2,
    });

    expect(isValid).toBe(true);
  });

  test('should return false for an invalid password', () => {
    const invalidPassword = 'Pwd';
    const isValid = passwordValidator(invalidPassword);

    expect(isValid).toBe(false);
  });
});