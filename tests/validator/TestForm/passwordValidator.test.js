const passwordValidator = require('../../../src/validator/validate_form/passwordValidator')

describe('validates a password with at least 8 characters', () => {
  test('should return true for a valid password', () => {
    const validPassword = 'SecurePwd123!';
    expect(passwordValidator(validPassword)).toBe(true);
  });

  test('should return false for an invalid password', () => {
    const invalidPassword = 'Pwd';
    expect(passwordValidator(invalidPassword)).toBe(false);
  });
});