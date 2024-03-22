const { isHttp, isHttps, validateUrl } = require('../../../src/validator/links/validate.url');

describe('validateUrl function', () => {
  test('validates a valid HTTPS URL', () => {
    const url = 'https://www.example.com';
    expect(validateUrl(url, 'https')).toBe(true);
  });

  test('throws error for an invalid HTTPS URL', () => {
    const url = 'http://www.example.com';
    expect(() => {
      validateUrl(url, 'https');
    }).toThrowError('Only https URLs are allowed.');
  });

  test('validates a valid HTTP URL', () => {
    const url = 'http://www.example.com';
    expect(validateUrl(url, 'http')).toBe(true);
  });

  test('throws error for an invalid HTTP URL', () => {
    const url = 'https://www.example.com';
    expect(() => {
      validateUrl(url, 'http');
    }).toThrowError('Only http URLs are allowed.');
  });
});

describe('isHttps function', () => {
  test('returns true for a valid HTTPS URL', () => {
    const url = 'https://www.example.com';
    expect(isHttps(url)).toBe(true);
  });

  test('throws error for an invalid HTTPS URL', () => {
    const url = 'http://www.example.com';
    expect(() => {
      isHttps(url);
    }).toThrowError('Only https URLs are allowed.');
  });
});

describe('isHttp function', () => {
  test('returns true for a valid HTTP URL', () => {
    const url = 'http://www.example.com';
    expect(isHttp(url)).toBe(true);
  });

  test('throws error for an invalid HTTP URL', () => {
    const url = 'https://www.example.com';
    expect(() => {
      isHttp(url);
    }).toThrowError('Only http URLs are allowed.');
  });
});
