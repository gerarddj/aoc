import { getInput } from '../../utils/getInput';

const data = getInput('07', 2021, 'input.txt');
const parsedData = data.trim().split(',').map(Number);

export const partOne = () => {
  let keys = Array.from(new Set(parsedData)).sort((a, b) => a - b);
  let idx = Math.floor(keys.length / 2);
  let data = parsedData;
  let optimal = null;
  while (!optimal) {
    let focus = cost(keys[idx], data);
    let higher = cost(keys[idx + 1], data);
    let lower = cost(keys[idx - 1], data);
    if (focus < higher && focus < lower) {
      optimal = focus;
    } else if (focus > higher) {
      idx += 1;
    } else {
      idx -= 1;
    }
  }
  console.log(optimal);
};

const cost = (position: number, data: any) => {
  let cost = 0;
  for (let i of data) {
    cost += Math.abs(i - position);
  }
  return cost;
};

const costPartTwo = (position: number, data: any) => {
  let cost = 0;
  for (let i of data) {
    let steps = Math.abs(i - position);
    let incrCost = (steps + 1) * (steps / 2);
    cost += incrCost;
  }
  return cost;
};

export const partTwo = () => {
  let keys = Array.from(new Set(parsedData)).sort((a, b) => a - b);
  let idx = Math.floor(Math.max(...parsedData) / 2);
  console.log(keys);
  let data = parsedData;
  let optimal = null;
  while (!optimal) {
    let focus = costPartTwo(idx, data);
    let higher = costPartTwo(idx + 1, data);
    let lower = costPartTwo(idx - 1, data);
    if (focus < higher && focus < lower) {
      optimal = focus;
    } else if (focus > higher) {
      idx += 1;
    } else {
      idx -= 1;
    }
  }
  console.log(optimal);
};

const stepDay = (state: any) => {
  return state;
};
