// is obtain-files.js
import { I } from './lambda';
import { pipe, getFiles, ap, log, chain, filter, map, lift2, flatMap, isDirectory, prop } from './utils';
import RoseTree from './fp/monad/rosetree';

const traverse = T => xs => xs.reduce((acc, x)=> lift2(append)(x)(acc), T.of([])) 
const append = x => xs => [x, ...xs]; 
const dir = RoseTree.of('./');
const files = pipe(
  // traverse(RoseTree),
  map(RoseTree.of),
  filter(isDirectory),
  getFiles
);
const getNode = prop('node');

const obtainFiles =  chain(xs => new RoseTree(xs, files(xs)));

export const proc = r => {
  const path = getNode(r);
  log('PAT')(path)
  return pipe(obtainFiles)(r)
} 


const k = proc(dir);

console.log(k);
log('K::: os ')(k.node)