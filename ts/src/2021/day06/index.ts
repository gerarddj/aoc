import { getInput } from '../../utils/getInput';

const data = getInput('06', 2021, 'input.txt');
const parsedData = data.trim().split(',').map(Number);

export const partOne = () => {
  const days = 80;
  let state = parsedData.slice();
  for (let day = 0; day < days; day++) {
    for (let i = 0; i < state.length; i++) {
      if (state[i] === 0) {
        state[i] = 6;
        state.push(9);
      } else {
        state[i] = state[i] - 1;
      }
    }
  }
  console.log(state.length);
};

export const partTwo = () => {
  const days = 256;
  let data = parsedData.slice();
  let initialState = new Array(9).fill(0);
  for (let idx = 0; idx < data.length; idx++) {
    initialState[data[idx]] += 1;
  }

  let oldArray = initialState.slice();
  for (let day = 0; day < days; day++) {
    let newArray = new Array(9).fill(0);
    for (let i = 0; i < initialState.length; i++) {
      newArray[i] = oldArray[i + 1] ?? oldArray[0];
    }
    newArray[6] = oldArray[7] + oldArray[0];
    oldArray = newArray.slice();
  }
  console.log(oldArray.reduce((a, v) => (a += v), 0));
};

const stepDay = (state: any) => {
  return state;
};
