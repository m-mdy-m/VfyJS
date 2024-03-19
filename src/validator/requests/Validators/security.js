class SQLInjectionValidator extends Validator {
  validate(field, ruleValue, body) {
    const sqlInjectionPattern =
      /(\b(SELECT|INSERT|UPDATE|DELETE|CREATE|DROP|ALTER)\b)|(--.*)/i;
    if (sqlInjectionPattern.test(body[field])) {
      return `Potential SQL injection detected in ${field}.`;
    }
    return null;
  }
}
class NoSQLInjectionValidator extends Validator {
  validate(field, ruleValue, body) {
    const nosqlInjectionPattern = /\$where|javascript:/i;
    if (nosqlInjectionPattern.test(body[field])) {
      return `Potential NoSQL injection detected in ${field}.`;
    }
    return null;
  }
}
class XSSValidator extends Validator {
  validate(field, ruleValue, body) {
    const xssPattern =
      /<script>|<\/script>|<img\s+src\s*=\s*".*?"|onerror\s*=\s*".*?"/i;
    if (xssPattern.test(body[field])) {
      return `Potential XSS attack detected in ${field}.`;
    }
    return null;
  }
}