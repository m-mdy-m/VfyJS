const {isEmail} = require('../../index');

describe('isEmail function', () => {
  test('validates a valid email', () => {
    const email = 'test@example.com';
    const isValid = isEmail(email);
    expect(isValid).toBe(true);
  });

  test('throws error for invalid email format', () => {
    const email = 'invalid.email';
    expect(() => {
      isEmail(email);
    }).toThrowError('Email must contain @');
  });

  test('throws error for email without "@" symbol', () => {
    const email = 'invalid.email';
    expect(() => {
      isEmail(email);
    }).toThrowError('Email must contain @');
  });

  test('throws error for email with more than one dot', () => {
    const email = 'test@example..com';
    expect(() => {
      isEmail(email);
    }).toThrowError('Must have at most one dot.');
  });

  test('throws error for subdomain with special characters', () => {
    const email = 'test@sub!domain.example.com';
    expect(() => {
      isEmail(email);
    }).toThrowError('Subdomains cannot contain special characters.');
  });

});
