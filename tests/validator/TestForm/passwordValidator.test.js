const passwordValidator = require('../../../src/validator/validate_form/passwordValidator')


test('validates a password with at least 8 characters', () => {
    const validPassword = 'SecurePwd';
    const invalidPassword = 'Pwd';
  
    expect(passwordValidator(validPassword)).toBe(true);
    expect(passwordValidator(invalidPassword)).toBe(false);
  });