// read is
import { log } from './utils';
import {proc} from './obtain-files';
import RoseTree from './fp/monad/rosetree';

const dir = RoseTree.of('.');
// this is Left Rigth | Either
const recursive = x => typeof x === 'string' ? x : proc(x);
const j = proc(dir).ap(RoseTree.of(recursive))
log('M')(JSON.stringify(j))



