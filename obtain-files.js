// is obtain-files.js
import { B } from './lambda';
import { pipe, log, getFiles, chain, filter, map,isDirectory } from './utils';
import RoseTree from './fp/monad/rosetree';

const isNotHideHidenDir = x => x.substring(0, 1) !== '.';
const getFolderName = x => x.split('/').slice(-1)[0];
let path = '.';
const getPath = p => `${path}/${p}`;
const setPath = xs => {
  path = xs.node;
  return xs;
}
const obtainDirs = pipe(
  // map(RoseTree.of),
  // map(getFolderName),
  map(B(RoseTree.of)(getFolderName)),
  filter(
    B(isNotHideHidenDir)(getFolderName)
  ),
  filter(isDirectory),
  map(getPath),
  getFiles,
); 
export const proc = pipe(
  chain(xs => new RoseTree(xs, obtainDirs(xs))),
  setPath,
);