//get-methods-name

import { question } from './utils/cli';
import { readdir, readfile, writefile} from './utils/fs';
import { getFileByExtension, filter, stringify, map } from './utils'; 
import compose from 'crocks/helpers/compose'
import Pair from 'crocks/Pair'
import merge from 'crocks/pointfree/merge'
import { prop, trim, props, equals, flatten, isEmpty, not, add } from 'ramda';
import Maybe from 'crocks/Maybe';
import maybeToAsync from 'crocks/Async/maybeToAsync'
import { all } from 'crocks/Async';

import { tokenize } from 'esprima';
import IO from './fp/monad/io';

const { Just, Nothing } = Maybe;

const getMaybe = f => x => f(x) ? Just(x) : Nothing();

const error = x => console.log(`Vaya error feo: ${x}`);

// getIdentifier :: String -> {} -> Boolean
const getIdentifier = pattern => obj => 
  equals(props(['type', 'value'], obj), ['Identifier', pattern]);

const setMarkDown = m => x => `${m} ${x}`

const getLoc = o => prop('loc', o);

// getLineNumber :: String -> {} -> Int 
const getLineNumber = position => loc => prop('line', prop(position, loc));

// getColumnNumber :: String -> {} -> Int 
const getColumnNumber = position => loc => prop('column', prop(position, loc));


// // getLine :: [String] -> Object ->  [String]
const getLine = lines => loc => lines[add(getLineNumber('start')(loc))(-1)];

// setNegrita :: {} -> String -> String
const setNegrita = loc => line => {
  const start = getColumnNumber('start')(loc);
  const end = getColumnNumber('end')(loc);
  return `line ${getLineNumber('start')(loc)}: ${line.substring(0, start)}**${line.substring(start, end)}**${line.substring(end)}`
}

// // gotWhiteSpaces :: String -> Maybe a b
const gotWhiteSpaces = x => /\s/g.test(x);

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
  compose(map(getLoc), getUnsafeProp, filter(getIdentifier(pattern))
)(arr);
const getUnsafeProp = x => x.unsafePerformIO();

// tokenizeFiles :: [ String ] -> [ String ]
const tokenizeFiles = files => files.map(tokenizePair)

// readFiles :: [String] -> Async e [String]
const readFiles = files => all(files.map(readfile));

// joinIntoLines :: [ * ] -> String
const joinIntoLines = arr => arr.join('\n');


const addTitleMarkDown = title => content => [`#${title}`, ...content];

const getFileContentListMarkDown = lines => loc =>
  compose( setMarkDown('*'), setNegrita(loc) ,getLine(lines))(loc)

// aqui necesito un maybe y concat o left y right mas bien
const getFileMarkdown = file => (lines, locs) => locs.length ? [
  '', 
  ...file.map(setMarkDown('##')), 
  ...locs.map(getFileContentListMarkDown(lines))
] : [];

// getFilesMarkdownCoincidences :: [ String ] -> [ Pair String {}] -> [ String ]
const getFilesMarkdownCoincidences = files => pairs =>
  map(merge((lines, locs) => getFileMarkdown(files.splice(0, 1))(lines, locs)))
(pairs)

// parser :: String -> [ String ] -> [String] 
const parser = pattern => files => 
  readFiles(files)
  .map(tokenizeFiles)
  .map(map(map(getLinePattern(pattern))))
  .map(getFilesMarkdownCoincidences(files))
  .map(flatten)
  .chain(maybeToAsync('No hay ningún resultado', getMaybe(compose(not, isEmpty))))
  .map(addTitleMarkDown(pattern))
  .map(joinIntoLines)

// getJsFiles :: String -> [ String]
const getJsFiles = x => readdir('./')
  .map(filter(getFileByExtension('js')));

// madeQuestionMaybe :: String -> Async e String
const madeQuestionMaybe = q => question(q)
  .map(compose(trim, prop('element')))
  .chain(maybeToAsync('Pattern can\'t contains spaces', getMaybe(compose(not, gotWhiteSpaces))))
    


madeQuestionMaybe(
  'Que méthod buscas?'
  )
  .chain(
    a => getJsFiles(a).chain(b => parser(a)(b))
  )
  .chain(
    str => madeQuestionMaybe(
      'Nombre del archivo: '
    ).chain(name => writefile(`${name}.md`)(str))
  )
  .fork(error, x => console.log('enhorabuena ya tienes tu MARKDOWN'))