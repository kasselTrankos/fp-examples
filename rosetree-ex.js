// rosetree-ex.js is
import RoseTree from './fp/monad/rosetree';
import {I} from './lambda'
const toArr = (acc, x) => [...acc, x];
const e = RoseTree.of(12);
console.log(e.reduce(toArr, []));

