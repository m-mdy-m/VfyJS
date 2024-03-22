const {isPassword} = require('../../index');

describe('isPassword function', () => {
  test('validates a password with all criteria met', () => {
    const password = 'StrongPwd@123';
    const options = {
      minLength: { value: 8, message: 'Password must be at least 8 characters long.' },
      maxLength: { value: 64, message: 'Password cannot exceed 64 characters.' },
      uppercase: { required: true, message: 'Password must contain at least one uppercase letter.' },
      lowercase: { required: true, message: 'Password must contain at least one lowercase letter.' },
      number: { required: true, message: 'Password must contain at least one number.' },
      specialCharacter: { required: true, message: 'Password must contain at least one special character.' },
      whitespace: { required: false, message: 'Password cannot contain whitespace.' },
    };
    const isValid = isPassword(password, options);
    expect(isValid).toBe(true);
  });

  test('throws error for password with insufficient length', () => {
    const password = 'Pwd@123'; // Length less than required 8 characters
    const options = {
      minLength: { value: 8, message: 'Password must be at least 8 characters long.' },
      maxLength: { value: 64, message: 'Password cannot exceed 64 characters.' },
      uppercase: { required: true, message: 'Password must contain at least one uppercase letter.' },
      lowercase: { required: true, message: 'Password must contain at least one lowercase letter.' },
      number: { required: true, message: 'Password must contain at least one number.' },
      specialCharacter: { required: true, message: 'Password must contain at least one special character.' },
      whitespace: { required: false, message: 'Password cannot contain whitespace.' },
    };
    expect(() => {
      isPassword(password, options);
    }).toThrowError('Password must be at least 8 characters long.');
  });

});
