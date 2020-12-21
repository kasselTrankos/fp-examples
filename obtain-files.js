// is obtain-files.js
import { B } from './lambda';
import { getFromList } from './utils/cli';
import { readdir, isdirectory, basename } from './utils/fs';
import { ignoreHidden, getFileByExtension, map } from './utils';
import { all } from 'crocks/Async';
import { zipWith, flatten, filter, compose, flip } from 'ramda';
// import { map } from 'crocks/core/flNames';
import Pair from 'crocks/Pair'
import fanout from 'crocks/Pair/fanout'
import merge from 'crocks/pointfree/merge'
import Async from 'crocks/Async'
const { Resolved } = Async

const getSnd = x => x.snd(); 

// getDirs :: [String] -> Async e [String]
const getDirs = files =>
  all(files.map(isdirectory))
  .map(x => zipWith( (a, b) => Pair(a, b), x ,files))
  .map(filter(compose(x => x !== 'node_modules', basename, getSnd)))
  .map(filter(compose(ignoreHidden, basename, getSnd)))
  .chain(readDirs)
  .map(flatten)
  


// concatPath :: [String] -> String -> [ String ]
const concatPath = a => b => b.map(c => `${a}/${c}`);

// setFullPath :: String -> Async e [ String ]
const setFullPath = file => Async.of(concatPath)
  .ap(Resolved(file))
  .ap(readdir(file))


// readDirs :: [String] -> Async e [String]
const readDirs = dir => all(dir.map(
    x => x.fst()  ? 
      setFullPath(x.snd())
      .chain(getDirs) : Resolved(x.snd()) )
)



const proc = path => readdir(path)
  .map(concatPath(path))
  .chain(getDirs)
  .map(filter(compose(getFileByExtension('js'), basename)))
  // .map(map(merge(
  //   (a, b) => [b, a ? b : 0, '']
  // )))
  // .map(filter(ignoreHidden))
  // .chain(readDirs)
  // .map(flatten)
  .fork(console.error, console.log);
proc('./../fp-sanctuary')
