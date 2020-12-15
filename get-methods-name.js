//get-methods-name

import Pair from 'crocks/Pair'
import { Parser } from './fp/monad/parser'; 
import { question } from './utils/cli';
import { prop, trim, compose, props, equals } from 'ramda';
import Maybe from 'crocks/Maybe';
import Async, { Resolved } from 'crocks/Async';
import { tokenize } from 'esprima';
import IO from './fp/monad/io';
import maybeToAsync from 'crocks/Async/maybeToAsync'
import { getFileByExtension, map, filter, parse, stringify } from './utils'; 
import { readdir, readfile, writeFile} from './utils/fs';

const { Just, Nothing } = Maybe;
const { Resolve, all } = Async


const hightLigt = code => IO(() => tokenize(code, { comment: true, loc: true }));

// hightLighter :: String -> Pair( String, IO String )
const highLighter = code => Pair(code, hightLigt(code));


// isMap :: Object -> Boolean
const isMap = x => equals(props(['type', 'value'], x), ['Identifier', 'map'])


// getLines :: Pair
const getLines = pair => {
  const lines = pair.fst().split('\n');
  const getLines = x => lines[prop('line', prop('start', prop('loc', x))) - 1];
  // console.log(lines, '0asdas')
  return pair.map(map(map(getLines)))
}

// filterIdenfiedMap :: [IO] -> [IO]
const filterIdenfiedMap = x => x.filter(isMap)
// readFiles :: [String] -> Async e [String]
const readFiles = folders => all(folders.map(readfile));
const hightLigthFiles = files => files.map(highLighter)

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
  // .map(x => x.map(v => console.log(v) || v))
  .chain(readFiles)
  .map((hightLigthFiles))
  .map(map(map(filterIdenfiedMap)))
  .map(map(getLines))
  // .map(map(map(x => console.log(x.unsafePerformIO() || x ))))
  // .map(x => x.map(Parser.fromEsprima))
//   .map(x => x.map(c => c.toString()))
  .fork(console.error, x => console.log(x.map(c => c.snd().unsafePerformIO())))

proc('Que méthod buscas?')
    .fork(error, findInFiles)

