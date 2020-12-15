//get-methods-name

import { Parser } from './fp/monad/parser'; 
import { question } from './utils/cli';
import { prop, trim, compose } from 'ramda';
import Maybe from 'crocks/Maybe';
import Async, { Resolved } from 'crocks/Async';
import maybeToAsync from 'crocks/Async/maybeToAsync'
import { getFileByExtension, parse, stringify } from './utils'; 
import { readdir, readfile, writeFile} from './utils/fs';

const { Just, Nothing } = Maybe;
const { Resolve, all } = Async

// readFiles :: [String] -> Async e [String]
const readFiles = folders => all(folders.map(readfile));
const parseFiles = files => files.map(parse)

const error = x => console.log(`Vaya error feo: ${x}`);

// gotWhiteSpaces :: String -> Maybe a b
const gotWhiteSpaces = x => /\s/g.test(x) ? Nothing() : Just(x);
// proc :: String -> Async e String
const proc = q => question(q)
    .map(compose(trim, prop('element')))
    .chain(maybeToAsync('Can\'t contains space', gotWhiteSpaces))

// findInFiles :: String -> Async Error Stringmap
const findInFiles = pattern => readdir('./')
  .map(x => x.filter(getFileByExtension('js')))
  .chain(readFiles)
  .map(parseFiles)
  .map(x => x.map(Parser.fromEsprima))
//   .map(x => x.map(c => c.toString()))
  .fork(console.error, console.log)

proc('Que méthod buscas?')
    .fork(error, findInFiles)

