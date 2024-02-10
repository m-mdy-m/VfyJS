class Train {
  constructor(trainingData) {
    this.model = {
      slope: 0,
      intercept: 0,
    };
    this.calculation(trainingData);
  }
  calculation(data) {
    this.sumX = 0;
    this.sumY = 0;
    this.sumXY = 0;
    this.sumXSquare = 0;
    for (let i = 0; i < data.length; i++) {
      const { x, y } = data[i];
      this.sumX += x;
      this.sumY += y;
      this.sumXY += x * y;
      this.sumXSquare += x * x;
    }
    this.length = data.length;
    this.model.slope =
      (this.length * this.sumXY - this.sumX * this.sumY) /
      (this.length * this.sumXSquare - this.sumX * this.sumX);
    this.model.intercept =
      (this.sumX - this.model.slope * this.sumX) / this.length;

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
}
module.exports = TrainValidate;
