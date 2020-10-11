// is obtain-files.js
import { I } from './lambda';
import { pipe, getFiles, B, ap, log, chain, filter, map, lift2, flatMap, isDirectory, prop } from './utils';
import RoseTree from './fp/monad/rosetree';

const traverse = T => xs => xs.reduce((acc, x)=> lift2(append)(x)(acc), T.of([])) 
const append = x => xs => [x, ...xs]; 
const dir = RoseTree.of('.');
export const files = pipe(
  // traverse(RoseTree),
  map(RoseTree.of),
  filter(isDirectory),
  log('Alv'),
  getFiles
);
const getNode = prop('node');
const setPath = s => `${s}/`;

export const obtainFiles = x => console.log('obtainFiles', x) || x.chain(xs => new RoseTree(xs, files(xs)));


export const proc = pipe(
  obtainFiles
);

// const h = dir.map(c => console.log(c, '00000'))
// const k = proc(dir);
// log('K::: os ')(k)