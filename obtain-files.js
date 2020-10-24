// is obtain-files.js
import { B, ONCE } from './lambda';
import { pipe, prop, log, getFiles, chain, filter, map, isFile, readFile, isDirectory } from './utils';
import RoseTree from './fp/monad/rosetree';
import {Left, Right} from './fp/monad/either';



let path = '.';


const isNotHideHidenDir = x => x.substring(0, 1) !== '.';
const getFolderName = x => x.split('/').slice(-1)[0];
const getName = ONCE(prop('name'));
const toJSON = x => JSON.parse(x);
const getPackage = pipe(
  x => `${x}/package.json`,
);
const getPackageName = pipe(
  getName,
  toJSON,
  readFile,
  getPackage
);
const getFile = x =>  B(isFile)(getPackage)(x) && getPackageName(x)
  ? getPackageName(x)
  : getFolderName(x)


export const proccess = xs => {
  const path = xs;
  const getPath = p => `${path}/${p}`;
  const obtainDirs = pipe(
    map(RoseTree.of),
    // map(B(RoseTree.of)(getFolderName)),
    // map(B(RoseTree.of)(B(getName)(toJSON))),
    // map(B(readFile)(B(getFolderName)(getPackage))),
    // filter(B(isFile)(B(getFolderName)(getPackage))),
    // filter(B(isNotHideHidenDir)(getFolderName)),
    filter(isDirectory),
    // map(getPath),
    getFiles,
  );
  
  const p = obtainDirs(xs);
    // const h = p.reduce((acc, x) => acc.concat(x), xs);
  // const g = RoseTree.Cons(xs, p);

  return p;
  // return a
}