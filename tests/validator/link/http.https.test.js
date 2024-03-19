const { isHttp, isHttps } = require('../../../src/validator/links/validate.url');
const { expect } = require('@jest/globals');

describe('isHttp and isHttps functions', () => {
  it('should return true for valid HTTP URL', () => {
    const result = isHttp('http://www.example.com');
    expect(result).toBe(true);
  });

  it('should return true for valid HTTPS URL', () => {
    const result = isHttps('https://www.example.com');
    expect(result).toBe(true);
  });

  it('should throw an error for invalid HTTP URL', () => {
    expect(() => {
      isHttp('https://www.example.com');
    }).toThrow('Only http URLs are allowed.');
  });

  it('should throw an error for invalid HTTPS URL', () => {
    expect(() => {
      isHttps('http://www.example.com');
    }).toThrow('Only https URLs are allowed.');
  });
});
