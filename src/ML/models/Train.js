const { Binary, isEmail } = require("../../../index");

const trainTrueEmail = [
  "john.doe@example.com",
  "jane_smith1234@gmail.com",
  "bob123@yahoo.co.uk",
  "alice-123@example.net",
  "info@company.com",
  "support@website.org",
  "user@email-domain.io",
  "sales@mycompany.biz",
  "customer.service@example.us",
  "webmaster@example.edu",
];
const trainFalseEmail = [
  "example.com",
  "john.doe@example",
  "@example.com",
  " john.doe@example_com",
  "john.doe@example#com",
  "john.doe@.example.com",
  " john.doe@example.com@",
  " john.doe@example..com",
  ".john.doe@example.com",
];
const trainEmails = [
  { truthy: trainTrueEmail, isValid: 1 },
  { falsy: trainFalseEmail, isValid: 0 },
];
class Train {
  constructor(trainingData) {
    this.features = [];
    this.labels = [];
    this.model = {
      weights: [0.1, 0.5, -0.2],
      bias: 0.0,
    };
    for (const iterator of trainingData) {
      const { truthy, falsy, isValid } = iterator;
      const features = { truthy, falsy };
      this.features.push(features);
      this.labels.push(isValid);
    }

    const learningRate = 0.01;
    const numIterations = 100;
    for (let iter = 0; iter < numIterations; iter++) {
      for (let i = 0; i < this.features.length; i++) {
        const prediction = this.predict(this.features[i]);
        const error = this.labels[i] - prediction;
        for (let j = 0; j < this.model.weights.length; j++) {
          this.model.weights[j] += learningRate * error * this.features[i][j];
        }
        this.model.bias += learningRate * error;
      }
    }

    return this.model;
  }
  predict(features) {
    let prediction = this.model.bias;
    for (let i = 0; i < this.model.weights.length; i++) {
      prediction += this.model.weights[i] * features[i];
    }
    return this.sigmoid(prediction) >= 0.5 ? 1 : 0;
  }
  sigmoid(z) {
    return 1 / (1 + Math.exp(-z));
  }
}
module.exports = Train;
