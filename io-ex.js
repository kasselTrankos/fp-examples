//io-ex.js is
const IO = require('./fp/monad/io');
import { taggedSum } from 'daggy';
import Maybe from './fp/monad/maybe';
import RoseTree from './fp/monad/rosetree';
import {Nothing, Just} from './fp/monad/maybe';
var fs = require('fs');
const { B, I, ONCE } = require('./lambda'); 
import {map, chain, prop} from './utils';
import { O_NOCTTY } from 'constants';
import { F } from 'ramda';

// safeValue :: Function -> Any -> Just Any | Nothing
const safeValue = f => x => ONCE(f)(x) ? Just(ONCE(f)(x)) : Nothing; 
const getName = safeValue(ONCE(prop('name')));

//  readFile :: String -> IO String
var readFile = filename => IO(() => fs.readFileSync(filename, 'utf-8'));

//  toJSON :: String -> IO JSON
var toJSON = x => IO.of(JSON.parse(x));

var cat = B(map(prop('name')))(B(chain(toJSON))(readFile));


// console.log(RoseTree.of( cat('package.json').unsafePerformIO()), RoseTree.of('poc'))
// console.log(RoseTree.of(cat('package.json')))
const a = RoseTree.Cons(1, [ RoseTree.of(2)]);
const b = RoseTree.Cons(12, [ RoseTree.Cons(23, [RoseTree.of(9098)]) ])
const c = a.concat(b).concat(RoseTree.empty()).map(x  => x + 12);
const e = RoseTree.empty();
const r = a.reduce((acc, x)=>  `${acc}/${x}`, '')
console.log( r)
