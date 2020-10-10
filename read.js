// read is
import { log, ap, pipe } from './utils';
import { I } from './lambda';
import {proc} from './obtain-files';
import RoseTree from './fp/monad/rosetree';

const dir = RoseTree.of('./')
const t = pipe(
  // ap(new RoseTree(I, [ RoseTree.of(proc)])),
  proc
);
const m = t(dir);
log('END')(JSON.stringify(m))



