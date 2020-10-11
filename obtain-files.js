// is obtain-files.js
import { I } from './lambda';
import { pipe, getFiles, B, ap, log, chain, filter, map, lift2, flatMap, isDirectory, prop } from './utils';
import RoseTree from './fp/monad/rosetree';

const obtainDirs = pipe(
  map(RoseTree.of),
  filter(isDirectory),
  getFiles
);

export const proc = pipe(
  chain(xs => new RoseTree(xs, obtainDirs(xs)))
);