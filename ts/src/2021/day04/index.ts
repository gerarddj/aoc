import { getInput } from '../../utils/getInput';

const data = getInput('04', 2021, 'input.txt');
const parsedData = data.split('\n\r\n');
const draws = parsedData.splice(0, 1)[0].split(',').map(Number);
const rawBoards = parsedData.map((line) => line.split('\r\n'));
const boards = rawBoards.map((line) =>
  line.map((col) =>
    col
      .trim()
      .split(' ')
      .filter((cell) => cell !== '')
      .map(Number)
  )
);
// const boards = parsedData.map((line) => line.trim().split(' '));
const drawBall = (draw: number, boards: any) => {
  for (let board of boards) {
    board.forEach((row: any) => {
      const idx = row.indexOf(draw);
      if (idx != -1) {
        row.splice(idx, 1, 'x');
      }
    });
  }
};

const checkBoards = (boards: any) => {
  let checkArray = [];
  for (let i in boards) {
    let idx = Number(i);
    let checkBoard = boards[idx]
      .concat(transposeBoard(boards[idx]))
      .map((row: any) => row.join(''));
    checkArray.push(checkBoard.indexOf('xxxxx'));
  }
  return checkArray;
};

const transposeBoard = (board: any) => {
  const boardCopy = board.slice();
  const transposedBoard = boardCopy.map((_: any, colIndex: any) =>
    boardCopy.map((row: any) => row[colIndex])
  );
  return transposedBoard;
};

export const partOne = () => {
  const play = () => {
    for (let draw of draws) {
      console.log('-------------------------');
      console.log('Draw: ', draw);
      drawBall(draw, boards);
      let results = checkBoards(boards);
      for (let i = 0; i < results.length; i++) {
        if (results[i] != -1) {
        }
      }
    }
  };

  // play();
};

export const partTwo = () => {
  const play = () => {
    let finalIndex = null;
    for (let draw of draws) {
      console.log('-------------------------');
      console.log('Draw: ', draw);
      drawBall(draw, boards);
      let results = checkBoards(boards);
      let unsolvedCount = results.reduce((a, v) => {
        if (v === -1) {
          return (a += 1);
        } else {
          return a;
        }
      }, 0);
      if (unsolvedCount === 1) {
        finalIndex = results.indexOf(-1);
      } else {
        if (finalIndex) {
          let sum = 0;
          for (let row of boards[finalIndex]) {
            for (let val of row) {
              //@ts-ignore
              if (val !== 'x') {
                sum += val;
              }
            }
          }
          console.log(draw * sum);
          break;
        }
      }
    }
  };

  play();
};
