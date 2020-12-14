// read files cli
import { getFromList } from './cli';
import Maybe from 'folktale/maybe';
import { prop, compose, map, filter, pipeK } from  'ramda';
import { getFileByExtension, toJSON, stringify } from './utils'; 
import { readdir,  readFile, writeFile} from './utils/fs';

const { Just, Nothing } = Maybe;

// getMaybeOreDefault :: * -> Maybe -> *
const getMaybeOreDefault = def => maybe => maybe.getOrElse(def);

// toMaybe :: * -> Maybe Just * Notthing
const toMaybe = a => a ? Just(a) : Nothing();

// saveFile :: String -> String -> Async Boolean Error
const saveFile = name => content => writeFile(name)(content)
  .fork(console.error, () => console.log('Archivo GUARDADO'));

// onEndRead ::  String -> Maybe -> Maybe
const onEndRead = name => maybe => maybe.matchWith({
  Just: compose(saveFile(name), getMaybeOreDefault({})),
  Nothing: ()=>  console.log('No hay nada que ver')
})



// proc :: String -> Async Nothing Just String
const proc = x => readdir(x)
  .map(x => x.filter(getFileByExtension('json')))
  .chain(getFromList('Select file: '))
  .map(prop('element'))
  .chain(readFile)
  .map(compose(stringify, prop('dependencies'), toJSON))
  .bimap(() => Maybe.Nothing(), toMaybe);

export const cliJSON = path => filename => proc(path).fork(onEndRead, onEndRead(filename));