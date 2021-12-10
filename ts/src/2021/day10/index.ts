import { getInput } from '../../utils/getInput';

const data = getInput('10', 2021, 'input.txt');

const parsedData = data
  .trim()
  .split('\n')
  .map((item) => item.trim().split(''));

const points = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
};

const count = {
  ')': 0,
  ']': 0,
  '}': 0,
  '>': 0,
};

export const partOne = () => {
  for (let line of parsedData) {
    const validation = validateLine(line);
    if (validation !== 1) {
      //@ts-ignore
      if (typeof validation === 'string') {
        count[validation] += 1;
      }
    }
  }
  let sum = 0;
  Object.keys(count).forEach((token) => {
    sum += count[token] * points[token];
  });
  console.log(sum);
};

const validateLine = (line: any) => {
  let openTokens = ['(', '[', '{', '<'];
  let validTokenList = [];
  let count = 0;
  for (let token of line) {
    if (openTokens.includes(token)) {
      validTokenList.push(closingToken(token));
    } else if (
      validTokenList.length &&
      token === validTokenList[validTokenList.length - 1]
    ) {
      validTokenList.pop();
    } else {
      return token;
    }
  }
  return validTokenList;
};

const closingToken = (token: string) => {
  let validTokenList = ['(', '[', '{', '<'];
  if (!validTokenList.includes(token)) {
    return false;
  } else {
    switch (token) {
      case '(':
        return ')';
      case '[':
        return ']';
      case '{':
        return '}';
      case '<':
        return '>';
    }
  }
};

const pointsTwo = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4,
};

const countTwo = {
  ')': 0,
  ']': 0,
  '}': 0,
  '>': 0,
};

export const partTwo = () => {
  let data = parsedData.slice();
  let scores = [];
  for (let line of parsedData) {
    let score = 0;
    const validation = validateLine(line);
    if (validation !== 1) {
      //@ts-ignore
      if (typeof validation === 'object') {
        let reverse = validation.reverse();
        for (let token of reverse) {
          score = score * 5 + pointsTwo[token];
        }
        scores.push(score);
      }
    }
  }
  let sorted = scores.sort((a, b) => a - b);
  console.log(sorted[(sorted.length - 1) / 2]);
};
