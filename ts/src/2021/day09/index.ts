import { getInput } from '../../utils/getInput';

const data = getInput('09', 2021, 'input.txt');
const parsedData = data
  .trim()
  .split('\n')
  .map((item) => item.trim().split('').map(Number));
const grid = parsedData;

export const partOne = () => {
  let lowPoints = getLowPoints();
  let sum = 0;
  for (let point of lowPoints) {
    sum += grid[point[0]][point[1]] + 1;
  }
  console.log(sum);
};

export const partTwo = () => {
  let lowPoints = getLowPoints();
  let basins: any = [];
  for (let point of lowPoints) {
    let basin = spread(point[0], point[1]);
    basins.push(basin.length);
  }
  const sorted = basins.sort((a: number, b: number) => b - a).slice(0, 3);
  const answer = sorted[0] * sorted[1] * sorted[2];
  console.log(answer);
};

const spread = (row: any, col: any, points: any = []) => {
  let val = grid[row][col];
  let adj = getAdjacent(row, col);
  if (!inPointArray(row, col, points)) {
    points.push([row, col]);
    adj.forEach((cell) => {
      let adjValue = grid[cell[0]][cell[1]];
      if (
        adjValue >= val &&
        adjValue != 9 &&
        !inPointArray(cell[0], cell[1], points)
      ) {
        points.push(...spread(cell[0], cell[1], points));
      }
    });
  }
  return Array.from(new Set(points));
};

const getLowPoints = () => {
  let points = [];
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      let val = grid[row][col];
      let adj = getAdjacent(row, col);
      let lowest = true;
      for (let i of adj) {
        let adjValue = grid[i[0]][i[1]];
        if (adjValue <= val) {
          lowest = false;
        }
      }
      if (lowest) {
        points.push([row, col]);
      }
    }
  }
  return points;
};

const getAdjacent = (row: number, col: number) => {
  let adj = [];
  if (row + 1 < grid.length) {
    adj.push([row + 1, col]);
  }
  if (row - 1 >= 0) {
    adj.push([row - 1, col]);
  }
  if (col + 1 < grid[row].length) {
    adj.push([row, col + 1]);
  }
  if (col - 1 >= 0) {
    adj.push([row, col - 1]);
  }
  return adj;
};

const inPointArray = (row: number, col: number, pointArray: number[][]) => {
  for (let point of pointArray) {
    if (point[0] === row && point[1] === col) {
      return true;
    }
  }
  return false;
};
