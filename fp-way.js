// read is
import { log, pipe, ap } from './utils';
import {proc, proccess} from './obtain-files';
import RoseTree from './fp/monad/rosetree';

const dir = RoseTree.of('');
// this is Left Rigth | Either
const recursive = p => x =>typeof x === 'string' ?  x :  run(x, p);
const run = (a, p) => a.concat(
    proccess(p, a.map(x =>  p ? `${p}/${x}`: x))
  ).ap(RoseTree.of(
    recursive(a.reduce((acc, x)=> `${acc || ''}/${x}`, '.'))
  )
); 
// const run = proc;

const j = run(dir, '.')
log('M')(JSON.stringify(j))



