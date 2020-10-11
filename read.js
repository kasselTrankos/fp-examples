// read is
import { log, ap, pipe, map } from './utils';
import { I, S } from './lambda';
import {proc, obtainFiles, files} from './obtain-files';
import RoseTree from './fp/monad/rosetree';

const dir = RoseTree.of('.')
const t = pipe(
  ap(new RoseTree(I, [ RoseTree.of(c)])),
  proc
);

const m = dir.concat(proc(dir))
const j = m.ap(new RoseTree(x => typeof x === 'string' ? x : proc(x), []))
log('M')(JSON.stringify(j))



