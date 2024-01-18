const {isHttp} = require('../../../index')

describe('isHttpUrl', () => {
    // Test valid HTTP URLs
    test('Valid HTTP URL - Case 1', () => {
        expect(isHttp('http://www.example.com')).toBe(true);
    });

    test('Valid HTTP URL - Case 2', () => {
        expect(isHttp('http://subdomain.example.co.uk')).toBe(true);
    });

    // Test invalid protocols
    test('Invalid Protocol - HTTPS', () => {
        expect(() => isHttp('https://www.example.com')).toThrowError('Only HTTP URLs are allowed.');
    });

    test('Invalid Protocol - FTP', () => {
        expect(() => isHttp('ftp://www.example.com')).toThrowError('Only HTTP URLs are allowed.');
    });

    // Test invalid formats
    test('Invalid Format - Missing Protocol', () => {
        expect(() => isHttp('www.example.com')).toThrowError('Invalid URL format.');
    });

    test('Invalid Format - Missing Domain', () => {
        expect(() => isHttp('http://')).toThrowError('Invalid URL format.');
    });

    // Test numeric input
    test('Numeric Input', () => {
        expect(() => isHttp(123)).toThrowError('URL must be a string.');
    });

    // Test various invalid URL formats
    test('Invalid Format - No Dot in Domain', () => {
        expect(() => isHttp('http://example')).toThrowError('Invalid URL format.');
    });

    test('Invalid Format - Invalid Characters', () => {
        expect(() => isHttp('http://www.!invalid#.com')).toThrowError('Invalid URL format.');
    });

    // Test mixed case protocol
    test('Mixed Case Protocol', () => {
        expect(isHttp('HTTP://www.example.com')).toBe(true);
    });

    // Additional tests can be added based on your specific requirements
});