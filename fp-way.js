// read is
import { log, pipe, ap } from './utils';
import {proc} from './obtain-files';
import RoseTree from './fp/monad/rosetree';
import Either from './fp/monad/either';
const  { Left, Right} = Either;

const dir = RoseTree.of('.');
// this is Left Rigth | Either
const recursive = p => x => typeof x === 'string' ?  x : run(x, p);
const g = m => m === 10 
  ? Left(1)
  : Right(m)

const run =(a, p= '.') => a.concat(proc(a.map(x => `${p}/${x}`))).ap(RoseTree.of(recursive(`${p}/${a.node}`))); 


const j = run(dir)
log('M')(j)



