// read is
import { log, pipe, ap } from './utils';
import {proc} from './obtain-files';
import RoseTree from './fp/monad/rosetree';
import Either from './fp/monad/either';
const  { Left, Right} = Either;

const dir = RoseTree.of('.');
// this is Left Rigth | Either
const recursive = x => typeof x === 'string' ?  x : run(x);
const g = m => m === 10 
  ? Left(1)
  : Right(m)

function run(a) {
 return  proc(a).ap(RoseTree.of(recursive))
} 


log('Either')(g(90))
log('BEFORE')(new Date())
const j = run(dir)
log('M')(JSON.stringify(j))
log('AFTER')(new Date())



