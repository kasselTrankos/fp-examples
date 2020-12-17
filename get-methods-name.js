//get-methods-name

import { question } from './utils/cli';
import { readdir, readfile, writefile} from './utils/fs';
import { getFileByExtension, filter, stringify, map } from './utils'; 
import compose from 'crocks/helpers/compose'
import Pair from 'crocks/Pair'
import merge from 'crocks/pointfree/merge'
import { prop, trim, props, equals } from 'ramda';
import Maybe from 'crocks/Maybe';
import maybeToAsync from 'crocks/Async/maybeToAsync'
import { all } from 'crocks/Async';

import { tokenize } from 'esprima';
import IO from './fp/monad/io';

const { Just, Nothing } = Maybe;



const error = x => console.log(`Vaya error feo: ${x}`);

// getIdenfier :: String -> {} -> Boolean
const getIdenfier = pattern => obj => 
  equals(props(['type', 'value'], obj), ['Identifier', pattern]);

const setMarkDown = m => x => `${m} ${x}`

const getLoc = o => prop('loc', o);
const getLineNumber = loc => prop('line', prop('start', loc)) - 1;

const addList = files => loc => line => line;

// // getLine :: [String] -> Object ->  [String]
const getLine = lines => loc => lines[getLineNumber(loc)];

// setNegrita :: {} -> String -> String
const setNegrita = loc => line => {
  const start = prop('column', prop('start', loc));
  const end = prop('column', prop('end', loc));
  return `line ${prop('line', prop('start', loc))}: ${line.substring(0, start)}**${line.substring(start, end)}**${line.substring(end)}`
}

// // gotWhiteSpaces :: String -> Maybe a b
const gotWhiteSpaces = x => /\s/g.test(x) ? Nothing() : Just(x);

// splitCodeLines :: String -> [ String ]
const splitCodeLines = code => code.split('\n');


// tokenizeIO : String -> IO {}
const tokenizeIO = code => IO(() => tokenize(code, { comment: true, loc: true }));


// tokenizePair :: String -> Pair( String, IO String )
const tokenizePair = code => Pair(
  splitCodeLines(code), 
  tokenizeIO(code)
);

const getLinePattern = pattern => arr =>  
  compose(map(getLoc), getUnsafeProp, filter(getIdenfier(pattern))
)(arr);
const getUnsafeProp = x => x.unsafePerformIO();

// tokenizeFiles :: [ String ] -> [ String ]
const tokenizeFiles = files => files.map(tokenizePair)

// readFiles :: [String] -> Async e [String]
const readFiles = files => all(files.map(readfile));

// joinIntoLines :: [ * ] -> String
const joinIntoLines = arr => arr.join('\n');


const setTitle = title => content => [`#${title}`, ...content];

const getFileContentListMarkDown = lines => loc =>
  compose( setMarkDown('*'), setNegrita(loc) ,getLine(lines))(loc)

const getFileMarkdown = file => (lines, locs) => locs.length ? [
  '', 
  ...file.map(setMarkDown('##')), 
  ...locs.map(getFileContentListMarkDown(lines))
] : [];

// getFilesMarkdownCoincidences :: [ String ] -> [ Pair String {}] -> [ String ]
const getFilesMarkdownCoincidences = files => pairs =>
  compose(
    map(joinIntoLines),
    map(merge((lines, locs) => getFileMarkdown(files.splice(0, 1))(lines, locs)))
  )
(pairs)

// parser :: String -> [ String ] -> [String] 
const parser = pattern => files => 
  readFiles(files)
  .map(tokenizeFiles)
  .map(map(map(getLinePattern(pattern))))
  .map(getFilesMarkdownCoincidences(files))
  .map(setTitle(pattern))
  .map(joinIntoLines)

// getJsFiles :: String -> [ String]
const getJsFiles = x => readdir('./')
  .map(filter(getFileByExtension('js')));

// proc :: String -> Async e String
const proc = q => question(q)
    .map(compose(trim, prop('element')))
    .chain(maybeToAsync('Can\'t contains space', gotWhiteSpaces))
    


proc(
  'Que méthod buscas?'
  )
  .chain(
    a => getJsFiles(a).chain(b => parser(a)(b))
  )
  .chain(str => proc(
    'Nombre del archivo: '
  ).chain(name => writefile(`${name}.md`)(str)))
  .fork(error, x => console.log(0, 'asd', x))