import { getInput } from '../../utils/getInput';

const rawData = getInput('12', 2021, 'input.txt');
const paths = rawData.split('\n').map(line => line.split('-'))

export const partOne = () => {
  // let p = paths.slice()
  // let entries = getRoutes('start', p)
  // console.log(entries.sort((a: any, b: any) => (b - a) ? 1 : 0))
};

const getRoutes: any = (path: any, routeMap: any) => {
  let currentCaveIdx = path.lastIndexOf('-')
  let routes = []
  let currentCave = path
  if (currentCaveIdx !== -1) {
    currentCave = path.slice(currentCaveIdx + 1)
  }

  let previousCaves = path.split('-')
  previousCaves = previousCaves.slice(0, previousCaves.length)
  let nextCavesFullList = routeMap.filter((path: any) => path.includes(currentCave))
  let nextCaves = nextCavesFullList.map((fullRoute: any) => fullRoute.indexOf(currentCave) ? fullRoute[0] : fullRoute[1])
  for (let nextCave of nextCaves) {
    if (nextCave === 'end') {
        routes.push(`${path}-end`)
    } else if (nextCave === nextCave.toLowerCase()) {
      let lowerCaseIndex = previousCaves.reduce((a: any, v: any) => {
        if ( ['start', 'end'].includes(v) || v.toUpperCase() === v) {
          return a
        } else {
          if (a[v] === undefined) {
            a[v] = 1
          } else {
            a[v] += 1
          }
        }
        return a}, {});

        if (lowerCaseIndex[nextCave]) {
          lowerCaseIndex[nextCave] += 1
        }
        
        let doubleLowerCaseUnders = Object.values(lowerCaseIndex).reduce((a: any, v: any) => {
          if (v === 2) {
            return a += 1
          }
          return a
        }, 0)
        
      if ((doubleLowerCaseUnders as number < 2) && !Object.values(lowerCaseIndex).includes(3) && !['start', 'end'].includes(nextCave)) {
        routes.push(...getRoutes(`${path}-${nextCave}`, routeMap))
      }
    } else {
        routes.push(...getRoutes(`${path}-${nextCave}`, routeMap))
    }
  }
  return routes
}

export const partTwo = () => {
  let p = paths.slice()
  let entries = getRoutes('start', p)
  console.log(entries.length)
};
