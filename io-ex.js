//io-ex.js is
const IO = require('./fp/monad/io');
import { taggedSum } from 'daggy';
import Maybe from './fp/monad/maybe';
import RoseTree from './fp/monad/rosetree';
import {Nothing, Just} from './fp/monad/maybe';
var fs = require('fs');
const { B, I, ONCE } = require('./lambda'); 
import {map, chain} from './utils';
import { O_NOCTTY } from 'constants';
import { prop } from 'ramda';

// safeValue :: Function -> Any -> Just Any | Nothing
const safe = f => x => f(x);

//    recur :: Integer -> Integer
const recur = x => x > 10000 ? M.of(x) : M.of(x + 1).chain(recur);


const abc = IO(()=> x );