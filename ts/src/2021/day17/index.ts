import { getInput } from '../../utils/getInput';

const rawData = getInput('17', 2021, 'input.txt');
const paths = rawData.split('\n').map(line => line.split(' -> '))
const [start, rules] = [paths[0][0], paths.slice(2)]

export const partOne = () => {
}

export const partTwo = () => {
};
