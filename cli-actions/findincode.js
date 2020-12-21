//get-methods-name

import { question } from './../utils/cli';
import { readdir, readfile, writefile} from './../utils/fs';
import { tokenizeIO, getIdentifier, getEndColumnNumber,getStartLineNumber, getStartColumnNumber } from './../utils/tokenize' 
import { getFileByExtension, filter, map, getIndexValue, gotWhiteSpaces, getMaybe } from './../utils'; 
import compose from 'crocks/helpers/compose'
import Pair from 'crocks/Pair'
import merge from 'crocks/pointfree/merge'
import { prop, trim, flatten, isEmpty, not, add, curry } from 'ramda';

import maybeToAsync from 'crocks/Async/maybeToAsync'
import { all } from 'crocks/Async';


const error = x => console.log(`Vaya error feo: ${x}`);

const setMarkDown = m => x => `${m} ${x}`;

// // getLine :: [String] -> Object ->  [String]
const getLine = lines => loc => 
  compose(getIndexValue(lines), add(-1), getStartLineNumber)
(loc)


// setNegrita :: {} -> String -> String
const setNegrita = loc => line => {
  const start = getStartColumnNumber(loc);
  const end = getEndColumnNumber(loc);
  return `line ${getStartLineNumber(loc)}: ${line.substring(0, start)}**${line.substring(start, end)}**${line.substring(end)}`
}

// splitCodeLines :: String -> [ String ]
const splitCodeLines = code => code.split('\n');





// tokenizePair :: String -> Pair( String, IO String )
const tokenizePair = code => Pair(
  splitCodeLines(code), 
  tokenizeIO(code)
);

const getLinePattern = pattern => arr =>  
  compose(
      map(map(curry(prop)('loc'))), 
      // x => x.unsafePerformIO(), 
      filter(getIdentifier(pattern)
    )
)(arr);

// readFiles :: [String] -> Async e [String]
const readFiles = files => all(files.map(readfile));

// joinIntoLines :: [ * ] -> String
const joinIntoLines = arr => arr.join('\n');


const addTitleMarkDown = title => content => [`#${title}`, ...content];

const getFileContentListMarkDown = lines => loc =>
  compose(setMarkDown('*'), setNegrita(loc) ,getLine(lines))
(loc)

// aqui necesito un maybe y concat o left y right mas bien
const getFileMarkdown = file => (lines, locs) => locs.map(compose(not, isEmpty)).equals(true) 
  ? [
    '',
    ...file.map(setMarkDown('##')), 
    ...locs.map(map(getFileContentListMarkDown(lines))).unsafePerformIO()
  ] : [];

// getFilesMarkdownCoincidences :: [ String ] -> [ Pair String {}] -> [ String ]
const getFilesMarkdownCoincidences = files => pairs =>
  map(merge((lines, locs) => getFileMarkdown(files.splice(0, 1))(lines, locs)))
(pairs)

// parser :: String -> [ String ] -> [String] 
const parser = pattern => files => 
  readFiles(files)
  .map(map(tokenizePair))
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
    


export const findinfiles = () => madeQuestionMaybe(
  'Que méthod buscas?'
  )
  .chain(
    pattern => getJsFiles(pattern).chain(files => parser(pattern)(files))
  )
  .chain(
    str => madeQuestionMaybe(
      'Nombre del archivo: '
    ).chain(
      name => writefile(`${name}.md`)(str)
      .map(() => `${name}.md File saved`)
    )
  )
  .fork(error, console.log)