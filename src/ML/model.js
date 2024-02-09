let model
class TrainModel {
  constructor(train) {
    model = {
      slope: 0,
      intercept: 0,
    };
    this.calculation(train);
  }

  calculation(trainMode) {
    this.sumX = 0;
    this.sumY = 0;
    this.sumXY = 0;
    this.sumXSquare = 0;
    for (let i = 0; i < trainMode.length; i++) {
      const { x, y } = trainMode[i];
      this.sumX += x;
      this.sumY += y;
      this.sumXY += x * y;
      this.sumXSquare += x * x;
    }
    model.slope =
      (trainMode.length * this.sumXY - this.sumX * this.sumY) /
      (trainMode.length * this.sumXSquare - this.sumX * this.sumX);
    model.intercept =
      (this.sumY - model.slope * this.sumX) / trainMode.length;
    return model;
  }
}
module.exports = {TrainModel , model}
