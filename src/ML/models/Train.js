class Train {
  constructor(trainingData) {
    this.model = {
      slope: 0,
      intercept : 0
    };
    this.calculation(trainingData)
  }
  calculation(data){
    this.sumX=0
    this.sumY=0
    this.sumXY = 0
    this.sumXSquare = 0
    for (let i = 0; i < data.length; i++) {
        const {x,y} = data[i]
        this.sumX+=x
        this.sumY+=y
        this.sumXY+=x*y
        this.sumXSquare+=x * x
    }
    this.length = data.length
    this.model.slope = (this.length  * this.sumX-this.sumX * this.sumXY) / (this.length*this.sumXSquare - this.sumX * this.sumX)
    this.model.intercept = (this.sumX - this.model.slope * this.sumX) / this.length
  }
}
class TrainValidate {
    constructor(rule , trainingData) {
        this.result = {}
        this.rule = rule
        this.trainModel = new Train(trainingData)
        
    }
}