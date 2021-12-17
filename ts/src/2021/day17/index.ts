import { getInput } from '../../utils/getInput';

const rawData = getInput('17', 2021, 'input.txt');
const xIdx = rawData.indexOf('x=')
const yIdx = rawData.indexOf('y=')
const [rawX, rawY]= [rawData.substr(xIdx, yIdx - xIdx),rawData.substr(yIdx, rawData.length - yIdx)]
const x = rawX.replace('x=','').replace(',','').split('..').map(Number)
const y = rawY.replace('y=','').split('..').map(Number)

class Probe {
    xPos: number
    yPos: number 
    xVel: number 
    yVel: number

  constructor(xPos: number, yPos: number, xVel: number, yVel: number) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.xVel = xVel;
    this.yVel = yVel;
  }

  step() {
    this.xPos += this.xVel
    this.yPos += this.yVel
    this.xVel = (this.xVel === 0) ? 0 : (this.xVel > 0) ? this.xVel - 1 : this.xVel + 1 
    this.yVel -= 1
  }

  isInTarget(x: number[], y: number[]) {
    let inX = (this.xPos >= x[0] && this.xPos <= x[1]) 
    let inY = (this.yPos >= y[0] && this.yPos <= y[1])
    return (inX && inY)
  }

  isOOB(x: number[], y: number[]) {
    let inX = (this.xPos > x[1]) 
    let inY = (this.yPos < y[0])
    return (inX || inY)
  }
  
  getMaxHeight() {
    let maxHeight = 0
    let hitsTarget = false
    while (!this.isOOB(x, y)) {
      maxHeight = Math.max(this.yPos, maxHeight)
      if (this.isInTarget(x, y)) {
        hitsTarget = true
      }
      this.step()
    }
    if (hitsTarget) {
      return maxHeight
    } else {
      return - 1
    }
  }

  print() {
    console.log(`
    x: ${this.xPos} 
    y: ${this.yPos}
    xVel: ${this.xVel}
    yVel: ${this.yVel}
    inRange: ${this.isInTarget(x, y)}
    isOOB: ${this.isOOB(x, y)}`)
  }
}

export const partOne = () => {
  let xBound = x
  let yBound = y
  let maxHorizontalVelocity = xBound[1]
  let maxVerticalVelocity = xBound[1] + Math.abs(yBound[1])
  let max = []
  for ( let i = maxHorizontalVelocity; i > 0; i--) {
  for ( let j = maxVerticalVelocity; j > 0; j--) {
      let p = new Probe(0, 0, j, i)
      max.push(p.getMaxHeight())
    }
  }
  console.log(Math.max(...max))
}

export const partTwo = () => {
  let xBound = x
  let yBound = y
  let maxHorizontalVelocity = xBound[1]
  let maxVerticalVelocity = xBound[1] + Math.abs(yBound[1])
  let initialParameters = []
  for ( let i = maxHorizontalVelocity; i >= yBound[0]; i--) {
  for ( let j = maxVerticalVelocity; j >= 0; j--) {
      let p = new Probe(0, 0, j, i)
      if (p.getMaxHeight() != -1) {
        initialParameters.push([i, j])
      }
    }
  }
  console.log(initialParameters.length)
};