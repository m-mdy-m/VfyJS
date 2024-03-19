const { validateUrl } = require('../../../src/validator/links/validate.url');
const { expect } = require('@jest/globals');

describe('validateUrl function', () => {
  it('should return true for valid HTTP URLs', () => {
    const result = validateUrl('http://www.example.com', 'http');
    expect(result).toBe(true);
  });

  it('should return true for valid HTTPS URLs', () => {
    const result = validateUrl('https://www.example.com', 'https');
    expect(result).toBe(true);
  });

  it('should throw an error for invalid protocol', () => {
    expect(() => {
      validateUrl('http://www.example.com', 'ftp');
    }).toThrow('Invalid expected protocol. Please provide "http" or "https".');
  });

  it('should throw an error for empty URL', () => {
    expect(() => {
      validateUrl('', 'http');
    }).toThrow('URL cannot be empty. Please provide a valid URL.');
  });

  it('should throw an error for URL not containing expected protocol', () => {
    expect(() => {
      validateUrl('https://www.example.com', 'http');
    }).toThrow('The URL must contain the substring "http". Please provide a valid URL.');
  });
});
