// is obtain-files.js
import { I } from './lambda';
import { pipe, getFiles, ap, chain, filter, map, lift2, flatMap, isDirectory } from './utils';
import RoseTree from './fp/monad/rosetree';

const log = t => x => {
  console.log(t, '::::', x)
  return x;
}
const traverse = T => xs => xs.reduce((acc, x)=> lift2(append)(x)(acc), T.of([])) 
const append = x => xs => [x, ...xs]; 
const dir = RoseTree.of('./');
const files = pipe(
  // traverse(RoseTree),
  log('recursive'),
  map(RoseTree.of),
  filter(isDirectory),
  getFiles
);

export const proc = pipe(
  chain(xs => new RoseTree(xs, files(xs)))
);

// const e = proc(dir);


// log('end')(e)
// console.log(JSON.stringify(e))
