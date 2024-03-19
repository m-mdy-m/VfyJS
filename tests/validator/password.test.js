const {isPassword} = require('../../index');

describe('isPassword', () => {
    // Test valid passwords
    test('Valid password with all criteria met', () => {
        const input = 'StrongPwd@123';
        const options = { minLength: 8, uppercase: true, lowercase: true, number: true, specialCharacter: true, alphabetic: true, whitespace: false };
        expect(isPassword(input, options)).toBe(true);
    });

    // Test invalid passwords
    test('Invalid password with insufficient length', () => {
        const input = 'Weak';
        const options = { minLength: 8 };
        expect(() => isPassword(input, options)).toThrowError('length must be between 8 and 64 characters.');
    });

    test('Invalid password missing uppercase letter', () => {
      const input = 'weakpassword@123';
      const options = { minLength: 8, uppercase: true, lowercase: true, number: true, specialCharacter: true, alphabetic: true, whitespace: false };
      expect(() => isPassword(input, options)).toThrowError('Must contain at least one uppercase letter.');
    });
  

    // Test edge cases
    test('Empty password', () => {
        const input = '';
        const options = { minLength: 8, uppercase: true, lowercase: true, number: true, specialCharacter: true, alphabetic: true, whitespace: false };
        expect(() => isPassword(input, options)).toThrowError('Value should not be empty');
    });

    test('Null password', () => {
        const input = null;
        const options = { minLength: 8, uppercase: true, lowercase: true, number: true, specialCharacter: true, alphabetic: true, whitespace: false };
        expect(() => isPassword(input, options)).toThrowError('Value should not be empty');
    });
});
