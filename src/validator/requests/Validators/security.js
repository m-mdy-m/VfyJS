const Validator = require("../Validator");

class SQLInjectionValidator extends Validator {
  validate(field, ruleValue, body) {
    // List of common SQL keywords used in injection attacks
    const sqlKeywords = [
      "SELECT", "INSERT", "UPDATE", "DELETE", "CREATE", "DROP", "ALTER",
      "EXECUTE", "TRUNCATE", "DECLARE", "USE", "MERGE", "RENAME", "GRANT", "REVOKE"
    ];

    // Regular expression pattern to detect SQL injection attempts
    const sqlInjectionPattern = new RegExp(
      `\\b(${sqlKeywords.join("|")})(?:\\s|\\b)|--.*|\\/\\*.*\\*\\/`, "i"
    );

    // Check if the input contains any SQL injection patterns
    if (sqlInjectionPattern.test(body[field])) {
      return `Potential SQL injection detected in '${field}'.`;
    }

    return null; // Return null if no SQL injection patterns found
  }
}
class NoSQLInjectionValidator extends Validator {
  validate(field, ruleValue, body) {
    // Regular expression pattern to detect NoSQL injection attempts
    const nosqlInjectionPattern = new RegExp(
      `\\$where|javascript:|\\$\\$\\(.*\\)|\\$eq|\\$ne|\\$gt|\\$gte|\\$lt|\\$lte|\\$in|\\$nin|\\$regex|\\$expr`, "i"
    );

    // Check if the input contains any NoSQL injection patterns
    if (nosqlInjectionPattern.test(body[field])) {
      return `Potential NoSQL injection detected in '${field}'.`;
    }

    return null; // Return null if no NoSQL injection patterns found
  }
}
class XSSValidator extends Validator {
  validate(field, ruleValue, body) {
    // Regular expression pattern to detect XSS attack payloads
    const xssPattern = new RegExp(
      `<script>|<\\/script>|<\\s*img\\s+[^>]*src\\s*=\\s*("|')?[^\\s>"']*("|')?|onerror\\s*=\\s*("|')[^"]*("|')`, "i"
    );

    // Check if the input contains any XSS attack payloads
    if (xssPattern.test(body[field])) {
      return `Potential XSS attack detected in '${field}'.`;
    }

    return null; // Return null if no XSS attack payloads found
  }
}
class AuthTokenValidator extends Validator {
  validate(field, ruleValue, body) {
    // Regular expression pattern to validate authentication token format
    const authTokenPattern = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/;

    // Check if the input matches the authentication token pattern
    if (!authTokenPattern.test(body[field])) {
      return `Invalid authentication token format in '${field}'. The token must consist of three parts separated by periods.`;
    }
    return null; // Return null if the token is valid
  }
}
class PasswordHashValidator extends Validator {
  validate(field, ruleValue, body) {
    // Regular expression pattern to validate password hash format
    const passwordHashPattern = /^\$2[ayb]\$[0-9]{2}\$[A-Za-z0-9/.]{53}$/;

    // Check if the input matches the password hash pattern
    if (!passwordHashPattern.test(body[field])) {
      return `The password field '${field}' must be securely hashed using bcrypt or similar algorithms.`;
    }

    return null; // Return null if the password hash is valid
  }
}
module.exports = {SQLInjectionValidator,NoSQLInjectionValidator,AuthTokenValidator,PasswordHashValidator,XSSValidator}