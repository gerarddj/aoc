import { getInput } from '../../utils/getInput';

const data = getInput('20', 2020, 'example.txt');
const tiles = data.split('\r\n\r\n').map((item) => item.trim());

const rawTileMap = tiles.map((tile) => {
  const s = tile.split('\r\n');
  return [s[0], s.slice(1)];
});

const cleanedTileMap = rawTileMap.map((tile) => {
  let cleanedId = parseInt(tile[0].slice(5, tile[0].length - 1) as string);
  let cleanedTile = (tile[1] as string[]).map((row) => {
    let pixelArray = [];
    for (let pixel of row.split('')) {
      pixel === '.' ? pixelArray.push(0) : pixelArray.push(1);
    }
    return pixelArray.join('');
  });
  return { id: cleanedId, data: cleanedTile };
});

export const partOne = () => {
  // let corners = [];
  let edges = getAllEdges(cleanedTileMap);
  let compressed = edges
    .map((edge) => [edge.n, edge.s, edge.e, edge.w])
    .flat(1);
  console.log(compressed.length);

  // for (let comp of compressed) {
  //   console.log(comp);
  // }
  // for (let edge of edges) {
  //   console.log(compressed.indexOf(edge.w, compressed.indexOf(edge.w)));
  //   let n =
  //     compressed.indexOf(edge.n, compressed.indexOf(edge.n)) === -1 ? 0 : 1;
  //   let s =
  //     compressed.indexOf(edge.s, compressed.indexOf(edge.s)) === -1 ? 0 : 1;
  //   let e =
  //     compressed.indexOf(edge.e, compressed.indexOf(edge.e)) === -1 ? 0 : 1;
  //   let w =
  //     compressed.indexOf(edge.w, compressed.indexOf(edge.w)) === -1 ? 0 : 1;
  //   console.log(edge.id, n, s, e, w);
  // }
};

const getAllEdges = (tileMap: any) => {
  let edgeArray = [];
  for (let tile of tileMap) {
    let tileEdges = {
      id: tile.id,
      n: tile.data[0],
      s: tile.data[tile.data.length - 1],
      w: tile.data.map((row: any) => row[0]).join(''),
      e: tile.data.map((row: any) => row[row.length - 1]).join(''),
    };
    edgeArray.push(tileEdges);
  }
  return edgeArray;
};

const rotateTile = (tile: any) => {};

export const partTwo = () => {};
