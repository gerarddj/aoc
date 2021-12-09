import fs from 'fs';
import path from 'path';

export const getInput = (day: string, year = 2021, file = 'input.txt') => {
  const inputPath = path.join(
    __dirname,
    `../../../data/${year}/day${day}/${file}`
  );
  return fs.readFileSync(inputPath, 'utf-8');
};
