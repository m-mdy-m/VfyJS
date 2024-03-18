const Validator = require("../Validator");

class MinLengthValidator extends Validator {
  validate(field, ruleValue, body) {
    if (typeof body[field] !== "string") {
      return `${field} must be a string.`;
    }

    if (body[field].length < parseInt(ruleValue)) {
      return `${field} must be at least ${ruleValue} characters long.`;
    }

    return null;
  }
}

class MaxLengthValidator extends Validator {
  validate(field, ruleValue, body) {
    if (typeof body[field] !== "string") {
      return `${field} must be a string.`;
    }

    if (body[field].length > parseInt(ruleValue)) {
      return `${field} cannot exceed ${ruleValue} characters.`;
    }

    return null;
  }
}

class LengthRangeValidator extends Validator {
  validate(field, ruleValue, body) {
    const [minLength, maxLength] = ruleValue.split(",").map(value => parseInt(value));

    // Check if ruleValue is valid
    if (isNaN(minLength) || isNaN(maxLength)) {
      throw new Error(`Invalid rule value for ${field}. Please provide a valid range in the format 'minLength,maxLength'.`);
    }

    const fieldLength = body[field].length;
    if (fieldLength < minLength || fieldLength > maxLength) {
      return `${field} must be between ${minLength} and ${maxLength} characters long.`;
    }
    return null;
  }
}
class DateRangeValidator extends Validator {
  validate(field, ruleValue, body) {
    const [startDate, endDate] = ruleValue.split(",").map(date => new Date(date));
    const fieldValue = new Date(body[field]);

    // Check if ruleValue is valid dates
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      throw new Error(`Invalid rule value for ${field}. Please provide valid start and end dates.`);
    }

    if (fieldValue < startDate || fieldValue > endDate) {
      return `${field} must be between ${startDate.toDateString()} and ${endDate.toDateString()}.`;
    }
    return null;
  }
}
module.exports = { MaxLengthValidator, MinLengthValidator,LengthRangeValidator,DateRangeValidator };
