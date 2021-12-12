import { getInput } from '../../utils/getInput';

const rawData = getInput('12', 2021, 'input.txt');
const paths = rawData.split('\n').map(line => line.split('-'))

export const partOne = () => {
  let p = paths.slice()
  let entries = getRoutes('start', p)
  console.log(entries)
};

const getRoutes = (path: any, routeMap: any) => {
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
      if (!previousCaves.includes(nextCave)) {
        routes.concat(getRoutes(`${path}-${nextCave}`, routeMap))
      }
    } else {
        routes.concat(getRoutes(`${path}-${nextCave}`, routeMap))
    }
  }
  return routes
  // for (let route of nextRoutes) {
  //   if (route === 'end' || visited.includes(route)) {
  //     return 
  //   } else if (route === route.toLowerCase()) {
  //     console.log(`visited small cave ${route}`)
  //   } else {
  //     console.log(`visited big cave ${route}`)
  //   }
  // }

}


export const partTwo = () => {
};
