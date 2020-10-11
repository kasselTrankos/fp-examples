// read is
import { log } from './utils';
import {proc} from './obtain-files';
import RoseTree from './fp/monad/rosetree';

const dir = RoseTree.of('.')

const j = proc(dir).ap(RoseTree.of(x => typeof x === 'string' ? x : proc(x)))
log('M')(JSON.stringify(j))



