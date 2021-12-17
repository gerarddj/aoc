import { getInput } from '../../utils/getInput';

const rawData = getInput('14', 2021, 'input.txt');
const paths = rawData.split('\n').map(line => line.split(' -> '))
const [start, rules] = [paths[0][0], paths.slice(2)]

export const partOne = () => {
  console.log(getAnswer(10))
}

export const partTwo = () => {
  console.log(getAnswer(40))
};

const getAnswer = (steps: number) => {
  let map = getMap(start)
  let result = map;
  for (let i = 0; i < steps; i++) {
    result = step(result, rules)
  }
  let answer = reduceAnswer(result)
  answer[start.split('').slice(-1)[0]] += 1
  let max = Math.max(...Object.values(answer) as number[])
  let min = Math.min(...Object.values(answer) as number[])
  return (max - min)
}

const step = (map: any, rules: string[][]) => {
  let newMap = JSON.parse(JSON.stringify(map))
  let rulesMap = rules.map((elem) => elem[0])
  for (let line of Object.keys(map)) {
    let idx = rulesMap.indexOf(line)
    if (idx != -1) {
      let left = line[0] + rules[idx][1]
      let right = rules[idx][1] + line[1]
      if (!newMap[left]) {
        newMap[left] = map[line]
      } else {
        newMap[left] += map[line]
      }
      if (!newMap[right]) {
        newMap[right] = map[line]
      } else {
        newMap[right] += map[line]
      }
      newMap[line] -= map[line]
    }
  }
  return newMap
}


const getMap = (sequence: string) => {
  let pairs = sequence.split('').map((el, idx) => {
    if (idx + 1 < sequence.length) {
      return sequence[idx] + sequence[idx + 1]
    }
  }).filter(item => item)

  let map = pairs.reduce((a: any, v: any) => {
    if (!a[v]) {
      a[v] = 1;
    } else {
      a[v] = a[v] + 1
    }
    return a
  }, {})
  return map
}

const reduceAnswer = (obj: any) => {
  const letterMap = Object.keys(obj).reduce((a: any, v: any) => {
    if (!a[v[0]]) {
      a[v[0]] = obj[v]
    } else {
      a[v[0]] += obj[v]
    }
    return a
  }, {});
  return letterMap
}
