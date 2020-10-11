// is obtain-files.js
import { B } from './lambda';
import { pipe, ap, getFiles, chain, filter, map,isDirectory } from './utils';
import RoseTree from './fp/monad/rosetree';

const isNotHideHidenDir = x => x.substring(0, 1) !== '.';
const getFolderName = x => x.split('/').slice(-1)[0];

const obtainDirs = pipe(
  map(RoseTree.of),
  filter(
    B(isNotHideHidenDir)(getFolderName)
  ),
  filter(isDirectory),
  getFiles
);

export const proc = pipe(
  chain(xs => new RoseTree(xs, obtainDirs(xs)))
);