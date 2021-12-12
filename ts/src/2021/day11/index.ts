import { exit } from 'process';
import { getInput } from '../../utils/getInput';

const rawData = getInput('11', 2021, 'input.txt');
const data = rawData.split('\n').map(line => line.split('').map(Number))
const grid = data


export const partOne = () => {
  // let zeros = 0;
  // for (let i = 0; i < 100; i++) {
  //   console.log(`-------------------Step ${i}-------------------`)
  //   initialIncrement();
  //   resolveIncrement();
  //   let resultantZeros = grid.slice().flat().reduce((a, v) => 
  //   { if (v === 0) {
  //     return a += 1
  //   } else {
  //     return a
  //   }}, 0 )
  //   zeros += resultantZeros 
  //   console.log(zeros)
  // }
  // console.log(zeros)
};

export const partTwo = () => {
  let steps = 0
  while (true) {
    steps += 1
    initialIncrement();
    resolveIncrement();
    let resultantZeros = grid.slice().flat().reduce((a, v) => 
    { if (v === 0) {
      return a += 1
    } else {
      return a
    }}, 0 )
    if (resultantZeros === (grid.length * grid[0].length)) {
      console.log(steps)
      break;
    }
  }
};

const initialIncrement = () => {
  for (let i = 0; i < grid.length; i ++) {
    for (let j = 0; j < grid[i].length; j ++) {
      grid[i][j] += 1
    }
  }
}


const resolveIncrement = () => {
  let resolved = true 
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] > 9) {
        resolved = false
        getAdjacentCells(i, j).forEach(cell => { 
          if (grid[cell[0]][cell[1]] !== 0) {
            grid[cell[0]][cell[1]] = grid[cell[0]][cell[1]] + 1
          }
        })
        grid[i][j] = 0
      }
    }
  }
  if (resolved) {
    return 
  } else {
    resolveIncrement()
  }
}


const getAdjacentCells = (row: any, col: any) => {
  let adjacentCells = []
  // increment 
  if (row + 1 < grid.length) {
    adjacentCells.push([row + 1, col])
  }
  if (col + 1 < grid[row].length) {
    adjacentCells.push([row, col + 1])
  }
  if ((row + 1 < grid.length) && (col + 1 < grid[row].length)) {
    adjacentCells.push([row + 1, col + 1])
  }

  // decrement
  if (row - 1 >= 0) {
    adjacentCells.push([row - 1, col])
  }
  if (col - 1 >= 0) {
    adjacentCells.push([row, col - 1])
  }
  if ((row - 1 >= 0) &&  (col - 1 >= 0)) {
    adjacentCells.push([row - 1, col - 1])
  }

  // corners
  if ((row - 1 >= 0) && (col + 1 < grid[row].length)) {
    adjacentCells.push([row - 1, col + 1])
  }
  if ((row + 1 < grid.length) &&  (col - 1 >= 0)) {
    adjacentCells.push([row + 1, col - 1])
  }
  return adjacentCells
}


