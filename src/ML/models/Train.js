const {Binary}  = require('../../../index')
class Train {
  constructor(trainingData) {
    this.model = {
      slope: 0,
      intercept: 0,
    };
    this.calculation(trainingData);
  }
  calculation(data) {
    let sumX=0,sumY=0,sumXY=0,sumXSquare=0
    for (let i = 0; i < data.length; i++) {
      const { x, y } = data[i];
      sumX += x;
      sumY += y;
      sumXY += x * y;
      sumXSquare += x * x;
    }
    this.length = data.length;
    this.model.slope =(this.length * sumXY - sumX * sumY) / (this.length * sumXSquare - sumX * sumX);
    this.model.intercept = (sumX - this.model.slope * sumX) / this.length;

    return this.model;
  }
}
class TrainValidate {
  constructor(rules, trainingData) {
    this.result = {};
    this.rule = rules;
    this.trainModel = new Train(trainingData);

    for (const key in rules) {
      if (rules.hasOwnProperty(key)) {
        const rule = rules[key]
        this.validation(rule)
        const predicted = this.predict(rule);
        this.result[key] = predicted >= 0 && predicted <= 100;
      }
    }
    return this.result;
  }
  predict(rule) {
    const { slope, intercept } = this.trainModel.model;
    return slope * rule + intercept;
  }
  validation(key){
    // this.
  }
}
module.exports = TrainValidate;
