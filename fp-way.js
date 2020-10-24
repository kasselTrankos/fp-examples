// read is
import { log, pipe, ap } from './utils';
import { proc } from './obtain-files';
import RoseTree from './fp/monad/rosetree';
const a = RoseTree.of('./bb')

const run = s => s.ap(RoseTree.Cons(x => x, [ RoseTree.of(proc) ]))
  .reduce((acc, x) => x, a).reduce((acc, x) => acc.concat(run(x)), s);

const t = run(RoseTree.of('./'));

const d = new Date();

log('GGGGG :::: ---- :: ---  -')(JSON.stringify(t));
log('BEFORE')(d);
log('AFTER')(new Date())
log('DIFF')(new Date().getTime() - d.getTime())
