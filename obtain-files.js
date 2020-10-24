// is obtain-files.js
import { B } from './lambda';
import { pipe, getFiles, filter, map, isDirectory } from './utils';


const isNotHideHidenDir = x => x.substring(0, 1) !== '.';
const getFolderName = x => x.split('/').slice(-1)[0];


export const proc = pipe(
  filter(B(isNotHideHidenDir)(getFolderName)),
  filter(isDirectory),
  getFiles,
);