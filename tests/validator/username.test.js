const {isUsername} = require('../../index');

describe('isUsername function', () => {
  test('validates a username with all criteria met', () => {
    const username = 'StringUsername123';
    const options = {
      minLength: { value: 5, message: 'Username must be at least 5 characters long.' },
      maxLength: { value: 20, message: 'Username cannot exceed 20 characters.' },
      alphanumeric: { required: true, message: 'Username must contain only alphanumeric characters.' },
      whitespace: { required: false, message: 'Username cannot contain whitespace.' },
    };
    const isValid = isUsername(username, options);
    expect(isValid).toBe(true);
  });

  test('throws error for username with whitespace', () => {
    const username = 'User Name'; // Contains whitespace
    const options = {
      minLength: { value: 5, message: 'Username must be at least 5 characters long.' },
      maxLength: { value: 20, message: 'Username cannot exceed 20 characters.' },
      alphanumeric: { required: true, message: 'Username must contain only alphanumeric characters.' },
      whitespace: { required: false, message: 'Username cannot contain whitespace.' },
    };
    expect(() => {
      isUsername(username, options);
    }).toThrowError('Username must contain only alphanumeric characters.');
  });
});
