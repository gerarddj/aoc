import { getInput } from '../../utils/getInput';

const data = getInput('05', 2021, 'input.txt');
const parsedData = data
  .trim()
  .split('\n')
  .map((line) => {
    let pair = line
      .split(' -> ')
      .map((item) => item.trim().split(',').map(Number));
    return pair;
  });

export const partOne = (partTwo = false) => {
  let x1, y1, x2, y2;
  let chart: any = [];
  let data = filterDiag(parsedData);
  if (partTwo) {
    data = parsedData;
  }
  for (let line of data) {
    x1 = line[0][0];
    y1 = line[0][1];
    x2 = line[1][0];
    y2 = line[1][1];
    const points = pointsBetween(x1, y1, x2, y2);
    let point = points.next().value;
    while (point) {
      if (!chart[point[0]]) {
        chart[point[0]] = [];
      }

      if (!chart[point[0]][point[1]]) {
        chart[point[0]][point[1]] = 1;
      } else {
        chart[point[0]][point[1]] = chart[point[0]][point[1]] + 1;
      }
      point = points.next().value;
    }
  }
  let sum = chart.reduce((a: any, v: any) => {
    let rowSum = v.reduce((a: any, v: any) => {
      if (v >= 2) {
        return (a += 1);
      } else {
        return a;
      }
    }, 0);
    return (a += rowSum);
  }, 0);
  console.log(sum);
};

export const partTwo = () => {
  partOne(true);
};

const filterDiag = (lines: any) => {
  let filteredLines = lines.filter((line: any) => {
    let onX = line[0][0] === line[1][0];
    let onY = line[0][1] === line[1][1];
    return onX || onY;
  });
  return filteredLines;
};

function* pointsBetween(x1: number, y1: number, x2: number, y2: number) {
  let x3, y3;
  while (x1 != x2 || y1 != y2) {
    if (x1 > x2) {
      x3 = x1--;
    } else if (x1 < x2) {
      x3 = x1++;
    } else {
      x3 = x1;
    }

    if (y1 > y2) {
      y3 = y1--;
    } else if (y1 < y2) {
      y3 = y1++;
    } else {
      y3 = y1;
    }
    yield [x3, y3];
  }
  yield [x2, y2];
}
