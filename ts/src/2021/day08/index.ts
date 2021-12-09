import { getInput } from '../../utils/getInput';

const data = getInput('08', 2021, 'input.txt');
const parsedData = data
  .trim()
  .split('\r\n')
  .map((item) => item.split(' | '));

let valid = [
  '1110111',
  '0010010',
  '1011101',
  '1011011',
  '0111010',
  '1101011',
  '1101111',
  '1010010',
  '1111111',
  '1111011',
];
let signalMapping = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

const isValid = (inputArray: any, map: string) => {
  for (let bit of inputArray) {
    if (!valid.includes(convertToBin(bit, map))) {
      return false;
    }
  }
  return true;
};

const convertToBin = (bit: string, map: string) => {
  let bin = [0, 0, 0, 0, 0, 0, 0];
  for (let i of bit.split('')) {
    bin[map.indexOf(i)] = 1;
  }
  return bin.join('');
};

export const partOne = () => {
  let uniqueCount = 0;
  for (let i = 0; i < parsedData.length; i++) {
    let output = parsedData[i][1].split(' ');
    let uniqueArray = [2, 4, 3, 7];
    let rowSum = output.reduce((a: any, v: any) => {
      if (uniqueArray.includes(v.length)) {
        return (a += 1);
      } else {
        return a;
      }
    }, 0);
    uniqueCount += rowSum;
  }
  console.log(uniqueCount);
};

export const partTwo = () => {
  let allMappingPermutations = perm('', signalMapping.join(''));
  let answer = 0;

  for (let i = 0; i < parsedData.length; i++) {
    let input = parsedData[i][0].split(' ');
    let output = parsedData[i][1].split(' ');
    for (let map of allMappingPermutations) {
      if (isValid(input, map)) {
        answer += decodeOutput(output, map);
      }
    }
  }
  console.log(answer);
};

const decodeOutput = (output: any, map: any) => {
  let returnArray: any = [];
  for (let bit of output) {
    let num = valid.indexOf(convertToBin(bit, map));
    returnArray.push(num);
  }
  return parseInt(returnArray.join(''));
};

const perm = (start: any, str: any): any => {
  if (str.length == 1) {
    return [start + str];
  } else {
    let returnResult = [];
    for (let i = 0; i < str.length; i++) {
      let res = perm(str[i], str.substr(0, i) + str.substr(i + 1));
      for (let j = 0; j < res.length; j++) {
        returnResult.push(start + res[j]);
      }
    }
    return returnResult;
  }
};
