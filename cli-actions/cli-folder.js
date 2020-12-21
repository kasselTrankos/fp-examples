// read files cli
import { getFromList, question } from './../utils/cli';
import Maybe from 'crocks/Maybe';
import { prop, compose, trim, isEmpty, not } from  'ramda';
import { getFileByExtension, toJSON, stringify, gotWhiteSpaces, getMaybe } from './../utils'; 
import { readdir,  readfile, writefile} from './../utils/fs';
import maybeToAsync from 'crocks/Async/maybeToAsync'

// madeQuestionMaybe :: String -> Async e String
const madeQuestionMaybe = q => question(q)
  .map(compose(trim, prop('element')))
  .chain(maybeToAsync('Pattern can\'t contains spaces', getMaybe(compose(not, gotWhiteSpaces))))


// proc :: String -> Async Nothing Just String
const proc = x => readdir(x)
  .chain(maybeToAsync('No henmos encontrado nada', getMaybe(compose(not, isEmpty))))
  .map(x => x.filter(getFileByExtension('json')))
  .chain(getFromList('Select file: '))
  .map(prop('element'))
  .chain(readfile)
  .map(compose(stringify, prop('dependencies'), toJSON))
  .chain(
    str => madeQuestionMaybe(
      'Nombre del archivo: '
    )
    .chain(name => 
      writefile(`${name}.json`)(str)
      .map(x => `${name}.json File saved`)
    )
  );

export const cliJSON = path => proc(path).fork(console.log, console.log);