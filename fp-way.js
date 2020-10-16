// read is
import { log, pipe, ap } from './utils';
import {proc} from './obtain-files';
import RoseTree from './fp/monad/rosetree';

const dir = RoseTree.of('.');
// this is Left Rigth | Either
const recursive = p => x => typeof x === 'string' ?  x : run(x, p);
const run =(a, p= '.') => a.concat(proc(a.map(x => `${p}/${x}`))).ap(RoseTree.of(recursive(`${p}/${a.node}`))); 


const j = run(dir)
log('M')(JSON.stringify(j))



