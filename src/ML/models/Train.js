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
  }
  
}
module.exports = Train;
