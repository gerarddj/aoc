import { getInput } from '../../utils/getInput';

const data = getInput('03', 2021, 'input.txt');
const parsedData = data.split('\n').map((item) => item.trim().split(''));

export const partOne = () => {
  let transformedData = parsedData[0]
    .map((_, colIndex) => parsedData.map((row) => row[colIndex]))
    .map((item) => item.join(''));

  let e = [];
  let g = [];
  for (let line of transformedData) {
    if (line.split('0').length > parsedData.length / 2) {
      e.push(1);
      g.push(0);
    } else {
      e.push(0);
      g.push(1);
    }
  }
  console.log(parseInt(e.join(''), 2) * parseInt(g.join(''), 2));
};

export const partTwo = () => {
  let o2Data = parsedData.slice();
  let co2Data = parsedData.slice();

  const bitLength = o2Data[0].length;

  for (let i = 0; i < bitLength; i++) {
    if (o2Data.length === 1) {
      break;
    }
    let bitCount = 0;
    for (let line of o2Data) {
      if (line[i] === '1') {
        bitCount += 1;
      }
    }

    if (bitCount >= o2Data.length / 2) {
      o2Data = o2Data.filter((line) => line[i] === '1');
    } else {
      o2Data = o2Data.filter((line) => line[i] === '0');
    }
  }

  for (let i = 0; i < bitLength; i++) {
    if (co2Data.length === 1) {
      break;
    }
    let bitCount = 0;
    for (let line of co2Data) {
      if (line[i] === '1') {
        bitCount += 1;
      }
    }

    if (bitCount >= co2Data.length / 2) {
      co2Data = co2Data.filter((line) => line[i] === '0');
    } else {
      co2Data = co2Data.filter((line) => line[i] === '1');
    }
  }

  let o2Bin = parseInt(o2Data[0].join(''), 2);
  let co2Bin = parseInt(co2Data[0].join(''), 2);
  console.log(o2Bin * co2Bin);
};
