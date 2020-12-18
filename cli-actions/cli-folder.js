// read files cli
import { getFromList, question } from './../utils/cli';
import Maybe from 'crocks/Maybe';
import { prop, compose, trim, isEmpty, not } from  'ramda';
import { getFileByExtension, toJSON, stringify } from './../utils'; 
import { readdir,  readfile, writefile} from './../utils/fs';
import maybeToAsync from 'crocks/Async/maybeToAsync'

const { Just, Nothing } = Maybe;

const getMaybe = f => x => f(x) ? Just(x) : Nothing();

// gotWhiteSpaces :: String -> Maybe a b
const gotWhiteSpaces = x => /\s/g.test(x);

// getMaybeOreDefault :: * -> Maybe -> *
const getMaybeOreDefault = def => maybe => maybe.getOrElse(def);

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

  )
    // .bimap(() => Maybe.Nothing(), toMaybe);

export const cliJSON = path => proc(path).fork(console.log, console.log);