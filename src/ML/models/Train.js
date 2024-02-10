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
    this.model.slope =(this.length * this.sumXY - this.sumX * this.sumY) / (this.length * this.sumXSquare - this.sumX * this.sumX);
    this.model.intercept =
      (this.sumX - this.model.slope * this.sumX) / this.length;

    return this.model;
  }
}
class TrainValidate {
  constructor(rule, trainingData) {
    this.result = {};
    this.rule = rule;
    for (const key in rule) {
      if (rule.hasOwnProperty(key)) {
        this.trainModel = new Train(trainingData);
        this.obj = rule[key];
        this.predicted = this.trainModel.model.slope * this.obj + this.trainModel.model.intercept;
        if (this.predicted >= 0 && this.predicted <= 100) {
          this.result[key] = true;
        } else {
          this.result[key] = false;
        }
      }
    }
    return this.result
  }
}
module.exports = TrainValidate;
