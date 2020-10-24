// read is
import { log } from './utils';
import { B } from './lambda'
import { proc } from './obtain-files';
import RoseTree from './fp/monad/rosetree';
const lift2 =  (f, a, b) => b.ap(a.map(f))

const run = s => RoseTree.of(s).ap(RoseTree.Cons(x => x, [ RoseTree.of(proc) ]))
  .reduce((acc, x) => x, []).reduce((acc, x) => acc.concat(run(x)), s);

const t = run('.');

const d = new Date();

log('GGGGG :::: ---- :: ---  -')(JSON.stringify(t));
log('BEFORE')(d);
log('AFTER')(new Date())
log('DIFF')(new Date().getTime() - d.getTime())
