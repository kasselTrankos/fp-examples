//io-ex.js is
const IO = require('./fp/monad/io');
import Maybe from './fp/monad/maybe';
import {Nothing, Just} from './fp/monad/maybe';
var fs = require('fs');
const { B, I, ONCE } = require('./lambda'); 
import {map, chain, prop} from './utils';

// safeValue :: Function -> Any -> Just Any | Nothing
const safeValue = f => x => ONCE(f)(x) ? Just(ONCE(f)(x)) : Nothing; 
const getName = safeValue(ONCE(prop('name')));

//  readFile :: String -> IO String
var readFile = filename => IO(() => fs.readFileSync(filename, 'utf-8'));

//  toJSON :: String -> IO JSON
var toJSON = x => IO.of(JSON.parse(x));



var cat = B(map(getName))(B(chain(toJSON))(readFile));
console.log(cat('package.json').unsafePerformIO())