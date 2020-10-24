// is obtain-files.js
import { B } from './lambda';
import { pipe, getFiles, filter, map, isDirectory } from './utils';
import RoseTree from './fp/monad/rosetree';


const isNotHideHidenDir = x => x.substring(0, 1) !== '.';
const getFolderName = x => x.split('/').slice(-1)[0];


export const proc = pipe(
  map(RoseTree.of),
  filter(B(isNotHideHidenDir)(getFolderName)),
  filter(isDirectory),
  getFiles,
);