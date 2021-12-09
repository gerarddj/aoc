import { getInput } from '../../utils/getInput';

const data = getInput('02', 2021, 'input.txt');
const parsedData = data.split('\n').map((data) => {
  const split = data.split(' ');
  return { d: split[0], m: parseFloat(split[1]) };
});

export const partOne = () => {
  let horizontal = 0;
  let depth = 0;

  for (let instruction of parsedData) {
    switch (instruction.d) {
      case 'forward':
        horizontal += instruction.m;
        break;
      case 'down':
        depth += instruction.m;
        break;
      case 'up':
        depth -= instruction.m;
        break;
    }
  }
  console.log(horizontal * depth);
};

export const partTwo = () => {
  let horizontal = 0;
  let depth = 0;
  let aim = 0;

  for (let instruction of parsedData) {
    switch (instruction.d) {
      case 'forward':
        horizontal += instruction.m;
        depth += aim * instruction.m;
        break;
      case 'down':
        aim += instruction.m;
        break;
      case 'up':
        aim -= instruction.m;
        break;
    }
  }
  console.log(horizontal * depth);
};
