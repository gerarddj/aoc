import { getInput } from '../../utils/getInput';

const data = getInput('01', 2021, 'input.txt');
const parsedData = data.split('\n').map((data) => parseFloat(data));

export const partOne = () => {
  let increased = 0;
  for (let i = 1; i <= parsedData.length; i++) {
    if (parsedData[i] > parsedData[i - 1]) {
      increased++;
    }
  }
  console.log(increased);
};

export const partTwo = () => {
  let increased = 0;
  for (let i = 3; i <= parsedData.length; i++) {
    if (parsedData[i] > parsedData[i - 3]) {
      increased++;
    }
  }
  console.log(increased);
};
